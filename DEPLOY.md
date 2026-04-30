# 배포 가이드

이 저장소의 두 사이트(`main-hub`, `claude-guide`) 배포 전체 절차입니다.

## 인프라 구성 요약

```
브라우저
  └─ HTTP :80  → 301 HTTPS 리다이렉트
  └─ HTTPS :443 → nginx (vhost별 분기)
                    ├─ dolgogae.cloud              → /var/www/dolgogae-hub
                    └─ claude.guide.dolgogae.cloud → /var/www/claude-code-mastery
                          └─ SSL: Let's Encrypt (자동 갱신)

가비아 클라우드
  - 서버 IP: 1.201.126.11 (Ubuntu 24.04)
  - 도메인 (모두 A 레코드 → 1.201.126.11):
      dolgogae.cloud
      www.dolgogae.cloud
      claude.guide.dolgogae.cloud
  - 보안 그룹 인바운드:
      TCP 22   — SSH   (특정 IP/32만 허용)
      TCP 80   — HTTP  (0.0.0.0/0)
      TCP 443  — HTTPS (0.0.0.0/0)
```

---

## 서버 SSH 접속

```bash
chmod 600 SSH_KeyPair-260429211709.pem   # 최초 1회
ssh -i SSH_KeyPair-260429211709.pem ubuntu@1.201.126.11
```

---

## 사이트 1: main-hub (`dolgogae.cloud`)

### 코드 배포

```bash
# main-hub/ 디렉터리에서 실행
cd main-hub
rsync -avz \
  -e "ssh -i SSH_KeyPair-260429211709.pem" \
  --exclude="*.pem" \
  --exclude="*.md" \
  ./ ubuntu@1.201.126.11:/var/www/dolgogae-hub/
```

반영은 즉시. 서버 재시작 불필요.

### nginx 설정

- 설정 파일: `/etc/nginx/sites-available/dolgogae-hub`
- 서버 root: `/var/www/dolgogae-hub`
- vhost 내용:

```nginx
server {
    listen 80;
    server_name dolgogae.cloud www.dolgogae.cloud;
    root /var/www/dolgogae-hub;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/javascript application/json;
    gzip_min_length 1024;
}
```

> certbot 실행 후 SSL 블록이 자동으로 추가됩니다.

### URL 라우팅

nginx의 `try_files $uri $uri/` 설정으로 서브디렉터리가 자동 서빙됩니다.

| URL | 서빙 파일 |
|-----|----------|
| `dolgogae.cloud/` | `/var/www/dolgogae-hub/index.html` |
| `dolgogae.cloud/privacy-policy` | `/var/www/dolgogae-hub/privacy-policy/index.html` |

---

## 사이트 2: claude-guide (`claude.guide.dolgogae.cloud`)

### 코드 배포

```bash
# claude-guide/ 디렉터리에서 실행
cd claude-guide
rsync -avz \
  -e "ssh -i SSH_KeyPair-260429211709.pem" \
  --exclude="*.pem" \
  --exclude="nginx.conf" \
  --exclude="*.md" \
  ./ ubuntu@1.201.126.11:/var/www/claude-code-mastery/
```

반영은 즉시. 서버 재시작 불필요.

### nginx 설정

- 설정 파일: `/etc/nginx/sites-available/claude-code-mastery`
- 서버 root: `/var/www/claude-code-mastery`

설정 변경 후 반영:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## SSL 인증서 관리 (공통)

- 발급처: Let's Encrypt
- 인증서 위치:
  - `/etc/letsencrypt/live/dolgogae.cloud/`
  - `/etc/letsencrypt/live/claude.guide.dolgogae.cloud/`
- 만료일: 90일 (certbot 타이머가 자동 갱신)
- 갱신 상태 확인:

```bash
sudo systemctl status certbot.timer
sudo certbot renew --dry-run   # 갱신 테스트
```

---

## 최초 서버 세팅 (재구축 시 참고)

신규 서버에 처음부터 세팅해야 할 경우 순서:

```bash
# 1. nginx + certbot 설치
sudo apt-get update
sudo apt-get install -y nginx certbot python3-certbot-nginx

# 2. 사이트 디렉터리 생성
sudo mkdir -p /var/www/dolgogae-hub /var/www/claude-code-mastery
sudo chown ubuntu:ubuntu /var/www/dolgogae-hub /var/www/claude-code-mastery

# 3. 파일 업로드 (로컬에서 rsync 실행)

# 4. nginx vhost 작성 (각 사이트별)
sudo vi /etc/nginx/sites-available/dolgogae-hub
sudo vi /etc/nginx/sites-available/claude-code-mastery
sudo ln -s /etc/nginx/sites-available/dolgogae-hub /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/claude-code-mastery /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx

# 5. Let's Encrypt 인증서 발급 (도메인별)
sudo certbot --nginx -d dolgogae.cloud -d www.dolgogae.cloud \
  --non-interactive --agree-tos --email admin@dolgogae.cloud --redirect

sudo certbot --nginx -d claude.guide.dolgogae.cloud \
  --non-interactive --agree-tos --email admin@dolgogae.cloud --redirect

# 6. nginx 자동 시작 등록
sudo systemctl enable nginx
```

---

## 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| 브라우저 경고 "연결이 안전하지 않음" | 인증서 도메인 불일치 또는 만료 | `sudo certbot renew` 후 nginx reload |
| 사이트 접속 불가 (timeout) | 보안 그룹 포트 미오픈 | 가비아 콘솔 → 보안 그룹 80/443 확인 |
| SSH 접속 거부 | PEM 권한 문제 또는 보안 그룹 | `chmod 600 *.pem` / IP 허용 여부 확인 |
| nginx 500 에러 | 설정 오류 | `sudo nginx -t` 로 문법 확인 |
| `conflicting server name` 경고 | 같은 도메인을 두 vhost가 점유 | `sudo grep -rl '<도메인>' /etc/nginx/sites-enabled/` 로 중복 vhost 찾아 정리 |
| 배포했는데 변경이 안 보임 | 브라우저 캐시 | 강제 새로고침 (`Cmd+Shift+R` 또는 사파리는 `Cmd+Option+E` → `Cmd+R`) |
