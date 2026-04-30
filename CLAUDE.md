# CLAUDE.md

Claude Code가 이 저장소를 작업할 때 참고하는 컨텍스트 문서입니다.

## 프로젝트 개요

이 저장소는 같은 서버에 함께 배포되는 두 정적 사이트와, 사이트 운영을 위한 가이드 문서로 구성되어 있습니다.

| 서브 프로젝트 | 폴더 | 도메인 | 설명 |
|--------------|------|--------|------|
| **main-hub** | `main-hub/` | `dolgogae.cloud` | 포트폴리오 허브. 다른 사이트로 이동하는 카드 그리드. |
| **claude-guide** | `claude-guide/` | `claude.guide.dolgogae.cloud` | "Claude Code 완벽 정복" 강의 랜딩 페이지. |

빌드 도구 없이 정적 HTML/CSS/JS로 작성되었으며, rsync 한 번으로 서버에 즉시 반영됩니다.

## 폴더 구조

```
claude-code-mastery/
├── CLAUDE.md              # 이 파일 — 프로젝트 컨텍스트
├── DEPLOY.md              # 두 사이트 배포 절차 통합
├── GUIDE.md               # 두 사이트 가이드 통합 (강의 커리큘럼 + 카드 추가법)
│
├── main-hub/              # dolgogae.cloud
│   ├── index.html
│   ├── privacy-policy/    # /privacy-policy 경로로 서빙
│   │   ├── index.html
│   │   └── PRIVACY_POLICY.md
│   └── SSH_KeyPair-260429211709.pem
│
└── claude-guide/          # claude.guide.dolgogae.cloud
    ├── index.html
    ├── css/style.css
    ├── js/main.js
    ├── nginx.conf         # 로컬 참고용
    └── SSH_KeyPair-260429211709.pem
```

## 운영 서버 정보

| 항목 | 값 |
|------|-----|
| 클라우드 | 가비아 클라우드 |
| 서버 IP | `1.201.126.11` |
| OS | Ubuntu 24.04 LTS |
| 접속 유저 | `ubuntu` |
| SSL | Let's Encrypt (자동 갱신) |

### 사이트별 배포 위치

| 사이트 | 도메인 | 서버 경로 | nginx vhost |
|--------|--------|----------|-------------|
| main-hub | `dolgogae.cloud` | `/var/www/dolgogae-hub` | `/etc/nginx/sites-available/dolgogae-hub` |
| claude-guide | `claude.guide.dolgogae.cloud` | `/var/www/claude-code-mastery` | `/etc/nginx/sites-available/claude-code-mastery` |

## 서버 SSH 접속

```bash
chmod 600 SSH_KeyPair-260429211709.pem   # 최초 1회
ssh -i SSH_KeyPair-260429211709.pem ubuntu@1.201.126.11
```

## 코드 배포 (요약)

각 서브폴더에서 rsync 실행:

```bash
# main-hub 배포 (dolgogae.cloud)
cd main-hub
rsync -avz -e "ssh -i SSH_KeyPair-260429211709.pem" \
  --exclude="*.pem" --exclude="*.md" \
  ./ ubuntu@1.201.126.11:/var/www/dolgogae-hub/

# claude-guide 배포 (claude.guide.dolgogae.cloud)
cd claude-guide
rsync -avz -e "ssh -i SSH_KeyPair-260429211709.pem" \
  --exclude="*.pem" --exclude="nginx.conf" --exclude="*.md" \
  ./ ubuntu@1.201.126.11:/var/www/claude-code-mastery/
```

상세 절차(서버 최초 세팅, nginx 설정, SSL, 트러블슈팅)는 `DEPLOY.md` 참고.

## 주의사항

- PEM 파일(`SSH_KeyPair-260429211709.pem`)은 절대 커밋하지 않을 것
- nginx 설정 변경은 서버에서 직접 vhost 파일 수정
- 빌드 과정 없음 — 파일 수정 후 rsync로 바로 반영
- 메타 문서(`CLAUDE.md`, `DEPLOY.md`, `GUIDE.md`)는 rsync에서 제외되므로 서버에 올라가지 않음
