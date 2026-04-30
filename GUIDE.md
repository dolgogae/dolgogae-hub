# 가이드

이 저장소의 두 사이트에 관한 가이드 문서입니다.

- **Part 1. claude-guide — 강의 커리큘럼 설계서**: `claude-guide/` 사이트의 콘텐츠 기반이 되는 강의 커리큘럼.
- **Part 2. main-hub — 사이트 카드 추가법**: `main-hub/` 페이지에 새 사이트 카드를 추가하는 방법.

---
---

# Part 1. claude-guide — Claude Code 활용법의 모든것

> **이 문서는 웹페이지 제작을 위한 커리큘럼 설계서입니다.**
> 입문자부터 전문가까지, "Claude Code를 제대로 쓰는 법"을 단계별로 익힐 수 있도록 구성했습니다.

---

## 커리큘럼 전체 구조

```
SECTION 0  빠른 시작           → 설치하고 바로 써보기
    ↓
SECTION 1  핵심 기능 마스터     → Claude Code의 도구 하나씩 이해하기
    ↓
SECTION 2  실행 모드 마스터     → Claude가 일하는 방식 이해하기
    ↓
SECTION 3  실전 워크플로우      → 배운 도구를 실제 개발에 적용하기
    ↓
SECTION 4  전문가 패턴          → 상위 1%처럼 Claude Code 다루기
```

**학습 원칙**: 각 섹션은 순서대로 학습하도록 설계되었습니다.
SECTION 3의 워크플로우는 SECTION 1~2의 기능 이해를 전제로 합니다.

---

## SECTION 0: 빠른 시작 🟢

> **목표**: 설치부터 첫 대화까지. 10분 안에 Claude Code를 실행한다.

### Chapter 0. Quick Start

**이 챕터에서 배우는 것**
- Claude Code를 설치하고 처음 실행하는 방법
- 대화를 시작하는 기본 방법
- 반드시 알아야 할 핵심 명령어 3가지

**학습 내용**

| 항목 | 내용 |
|------|------|
| 설치 | `npm install -g @anthropic-ai/claude-code` |
| 인증 | `ANTHROPIC_API_KEY` 환경변수 설정 |
| 첫 실행 | 프로젝트 폴더에서 `claude` 입력 |

**반드시 알아야 할 명령어 3가지**
- `/help` — 사용 가능한 명령어 목록 보기
- `/clear` — 현재 대화 컨텍스트 초기화
- `/compact` — 대화가 길어졌을 때 요약해서 압축하기

**핵심 단축키**
- `Esc` — 현재 작업 중단
- `Shift+Tab` — 실행 모드 전환 (Auto Mode 토글)
- `Shift+Tab+Tab` — Plan Mode 진입

**다음 챕터 예고**
> Claude Code를 제대로 활용하려면 먼저 6가지 핵심 도구를 이해해야 합니다.
> 이 도구들이 SECTION 3 워크플로우의 재료가 됩니다.

---

## SECTION 1: 핵심 기능 마스터 🟢~🟡

> **목표**: Claude Code가 제공하는 6가지 핵심 기능을 각각 독립적으로 이해한다.
> 각 챕터 구성: **개념** → **설정 방법** → **실전 예제** → **흔한 실수**

---

### Chapter 1. CLAUDE.md & Rules — AI의 행동 헌법 🟢

**왜 중요한가?**
CLAUDE.md는 Claude에게 "이 프로젝트에서는 이렇게 행동하라"고 알려주는 영구 지침서입니다.
매번 같은 설명을 반복하지 않아도 되고, 팀 전체가 동일한 규칙으로 Claude를 사용할 수 있습니다.

**CLAUDE.md가 없을 때 생기는 문제**
- Claude가 프로젝트의 기술 스택을 모르고 엉뚱한 라이브러리를 추천함
- 팀 컨벤션을 무시한 코드를 생성함
- 매번 "우리는 TypeScript 씁니다", "테스트는 Jest입니다" 같은 설명을 반복해야 함

**파일 위치 및 우선순위**
```
~/.claude/CLAUDE.md          ← 전역 (모든 프로젝트에 적용)
프로젝트폴더/CLAUDE.md        ← 프로젝트 전용 (전역보다 우선)
프로젝트폴더/src/CLAUDE.md    ← 특정 폴더 전용 (더 좁은 범위)
```

**CLAUDE.md 필수 포함 항목**
```markdown
# 프로젝트 개요
[한 줄 설명]

# 기술 스택
- 언어: TypeScript 5.x
- 프레임워크: Next.js 14
- 테스트: Vitest

# 아키텍처 원칙
- 레이어 구조: Controller → Service → Repository
- 상태 관리: Zustand (전역), useState (로컬)

# 코딩 컨벤션
- 함수명: camelCase
- 컴포넌트: PascalCase
- 파일명: kebab-case

# 금지 행동
- `console.log` 프로덕션 코드에 절대 사용 금지
- `any` 타입 사용 금지
- 직접 DOM 조작 금지 (React만 사용)
```

**잘 쓴 CLAUDE.md vs 못 쓴 CLAUDE.md**

| 못 쓴 예 | 잘 쓴 예 |
|---------|---------|
| "좋은 코드 작성해" | "함수는 단일 책임 원칙을 따르고 20줄을 넘지 않도록 해" |
| "테스트 작성해" | "Vitest로 단위 테스트 작성, 커버리지 80% 이상 유지" |
| "타입스크립트 써" | "`any` 금지, `unknown`으로 대체하고 타입 가드 작성" |

**흔한 실수**
- CLAUDE.md를 너무 길게 써서 Claude가 중요한 부분을 놓침 (500자 이내 권장)
- 프로젝트마다 CLAUDE.md를 새로 쓰지 않고 전역 CLAUDE.md만 사용

---

### Chapter 2. Skills (Custom Slash Commands) — 나만의 명령어 만들기 🟢

**왜 중요한가?**
반복적으로 사용하는 프롬프트를 `/커맨드` 형태로 저장해두면, 긴 설명 없이 한 줄로 복잡한 작업을 실행할 수 있습니다.

**Skills가 없을 때**
- 매번 "커밋 메시지를 Conventional Commits 형식으로, 변경 내용을 요약해서, 영어로 작성해줘" 라고 입력
- 팀원마다 다른 방식으로 Claude를 사용

**Skills가 있을 때**
- `/commit` 한 번으로 동일한 결과

**파일 위치**
```
~/.claude/commands/         ← 개인 스킬 (모든 프로젝트에서 사용)
.claude/commands/           ← 프로젝트 스킬 (팀과 공유)
```

**스킬 파일 구조** (`.md` 파일)
```markdown
---
name: commit
description: Conventional Commits 형식으로 커밋 메시지 생성 후 커밋
---

현재 스테이징된 변경사항을 분석하고 Conventional Commits 형식으로
커밋 메시지를 작성해서 커밋해줘.

형식: type(scope): description

- feat: 새 기능
- fix: 버그 수정
- refactor: 리팩토링
- docs: 문서

Co-Authored-By: Claude <noreply@anthropic.com>
```

**내장 스킬 (기본 제공)**
- `/commit` — 변경 사항 분석 후 커밋
- `/review-pr` — PR 코드 리뷰
- `/simplify` — 코드 단순화

**직접 만들 수 있는 스킬 예시**
- `/standup` — 오늘 작업 내용 요약해서 스탠드업 메시지 생성
- `/changelog` — 최근 커밋들로 CHANGELOG 항목 생성
- `/security-review` — 보안 관점에서 코드 검토

**인자 전달하기**
```markdown
# /review 스킬 예시
$ARGUMENTS 파일을 코드 리뷰해줘. 보안 관점에서만 검토해.
```
→ `/review src/auth.ts` 로 실행

**흔한 실수**
- 스킬 하나에 너무 많은 역할 부여 (하나의 스킬 = 하나의 목적)
- 팀 스킬을 `.claude/commands/`가 아닌 `~/.claude/commands/`에 저장해서 공유 안 됨

---

### Chapter 3. Memory — 대화를 넘어 지속되는 기억 🟢

**왜 중요한가?**
Claude는 세션이 끝나면 대화 내용을 기억하지 못합니다. Memory 시스템을 사용하면 중요한 정보를 파일에 저장해서 다음 대화에서도 활용할 수 있습니다.

**Memory vs CLAUDE.md 차이**

| 구분 | CLAUDE.md | Memory |
|------|-----------|--------|
| 용도 | 프로젝트 규칙·구조 | 학습된 선호도·맥락 |
| 변경 빈도 | 드물게 (팀이 관리) | 자주 (대화 중 자동 저장) |
| 대상 | 모든 팀원에게 공통 | 개인별 or 프로젝트별 |

**메모리 4가지 타입**

| 타입 | 저장하는 내용 | 예시 |
|------|-------------|------|
| `user` | 사용자 선호도·역할·배경 | "TypeScript 10년차, React는 처음" |
| `feedback` | 피드백 (하지 말아야 할 것, 잘된 것) | "응답 마지막에 요약 붙이지 말 것" |
| `project` | 진행 중인 작업·결정사항·마감 | "인증 모듈 리팩토링 중, 2월 배포 예정" |
| `reference` | 외부 시스템 위치 정보 | "버그 트래킹은 Linear PROJ 프로젝트" |

**메모리 파일 구조**
```
~/.claude/projects/[프로젝트명]/memory/
  ├── MEMORY.md          ← 인덱스 (목차)
  ├── user_profile.md    ← 사용자 정보
  ├── feedback_style.md  ← 피드백 메모
  └── project_auth.md    ← 프로젝트 맥락
```

**Claude에게 기억시키는 법**
- "이거 기억해줘: 우리 팀은 PR 하나에 500줄 이상 변경 금지야"
- "앞으로 코드 설명할 때 주석보다 예제 코드 중심으로 해줘"

**흔한 실수**
- 메모리에 코드 패턴이나 파일 경로를 저장 (git 히스토리나 코드로 확인하면 됨)
- 오래된 메모리를 방치해서 틀린 정보를 Claude가 참조하게 됨

---

### Chapter 4. MCP 서버 — 외부 세계와 연결하기 🟡

**왜 중요한가?**
기본 Claude Code는 로컬 파일만 다룹니다. MCP(Model Context Protocol) 서버를 연결하면 GitHub, Google Drive, Slack 등 외부 시스템을 Claude가 직접 조작할 수 있게 됩니다.

**MCP 없이 할 수 있는 것 vs MCP 있을 때**

| MCP 없이 | MCP 있을 때 |
|---------|------------|
| "이 코드를 GitHub PR로 올려줘" → 직접 해야 함 | Claude가 PR 생성, 코멘트 작성까지 자동 처리 |
| "Linear 이슈 확인해줘" → Claude가 접근 불가 | Claude가 이슈 읽고 분석해서 답변 |

**주요 MCP 서버 목록**
- **GitHub MCP** — 이슈, PR, 코드 리뷰, 브랜치 관리
- **Google Drive MCP** — 문서 읽기/쓰기
- **Gmail MCP** — 이메일 읽기/발송
- **Filesystem MCP** — 지정 폴더 파일 접근
- **Slack MCP** — 메시지 읽기/보내기

**MCP 서버 설정 방법** (`~/.claude/settings.json`)
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxx"
      }
    }
  }
}
```

**개인 설정 vs 팀 공유 설정**
- 개인 토큰이 포함된 설정 → `~/.claude/settings.json` (git에 올리면 안 됨)
- 팀 공통 MCP 설정 → `.claude/settings.json` (토큰 없이 구조만, git 공유 가능)

**흔한 실수**
- MCP 토큰을 프로젝트 `settings.json`에 넣고 git push해버림
- 모든 MCP를 한번에 다 연결해서 필요 없는 권한까지 부여

---

### Chapter 5. Hooks — 이벤트 기반 자동화 🟡

**왜 중요한가?**
CLAUDE.md는 "권고"입니다. Claude가 무시할 수 있습니다. Hooks는 "강제"입니다. 특정 이벤트가 발생하면 반드시 지정한 스크립트가 실행됩니다.

**CLAUDE.md vs Hooks 차이**

| 구분 | CLAUDE.md | Hooks |
|------|-----------|-------|
| 성격 | 권고 (Claude가 따르도록 요청) | 강제 (시스템이 직접 실행) |
| 용도 | 코딩 스타일, 접근 방식 안내 | 위험 명령 차단, 자동 포맷, 로그 |
| 무시 가능? | 가능 (Claude가 놓칠 수 있음) | 불가능 |

**4가지 훅 이벤트**

| 이벤트 | 실행 시점 | 주요 용도 |
|--------|---------|---------|
| `PreToolUse` | Claude가 도구 실행 직전 | 위험 명령 차단 |
| `PostToolUse` | Claude가 도구 실행 직후 | 자동 포맷, 린트 실행 |
| `UserPromptSubmit` | 사용자가 프롬프트 입력 시 | 컨텍스트 자동 주입 |
| `PostResponse` | Claude 응답 완료 후 | 로그 저장, 알림 발송 |

**실전 예제 1: 위험 명령 차단**
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "echo '${tool_input}' | grep -E 'rm -rf|git push --force' && echo 'BLOCKED' || echo 'OK'"
      }]
    }]
  }
}
```

**실전 예제 2: 파일 저장 후 자동 포맷**
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "prettier --write ${tool_result.path}"
      }]
    }]
  }
}
```

**실전 예제 3: HTTP Hook으로 Slack 알림**
```json
{
  "hooks": {
    "PostResponse": [{
      "hooks": [{
        "type": "http",
        "url": "https://hooks.slack.com/your-webhook-url",
        "method": "POST"
      }]
    }]
  }
}
```

**흔한 실수**
- 훅 스크립트에 버그가 있어서 Claude의 모든 작업이 막힘 (반드시 먼저 스크립트 단독 테스트)
- PostToolUse 훅이 너무 느려서 매 파일 저장마다 10초씩 대기

---

### Chapter 6. Settings & 환경설정 — Claude를 내 방식대로 🟡

**왜 중요한가?**
Settings를 통해 Claude의 동작 방식, 퍼미션, 사용할 모델, 자동 승인 범위를 세밀하게 제어할 수 있습니다.

**설정 파일 위치 및 우선순위** (아래로 갈수록 높음)
```
~/.claude/settings.json          ← 전역 기본값
.claude/settings.json            ← 프로젝트 설정 (전역 덮어씀)
환경변수 (ANTHROPIC_MODEL 등)     ← 최우선 적용
```

**주요 설정 항목**
```json
{
  "model": "claude-opus-4-6",
  "permissions": {
    "allow": [
      "Bash(git *)",
      "Bash(npm *)",
      "Read(**)",
      "Write(src/**)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force)"
    ]
  },
  "autoApprove": {
    "tools": ["Read", "Glob", "Grep"]
  }
}
```

**퍼미션 설계 원칙**
- 최소 권한 원칙: 필요한 것만 허용
- 읽기는 넓게, 쓰기는 좁게
- 위험한 명령(`rm`, `force push`)은 명시적으로 차단

**IDE 통합 설정**
- **VS Code**: Claude Code 확장 설치 → 인라인 제안, 사이드패널 대화
- **JetBrains**: Claude Code 플러그인 → 동일 기능

---

## SECTION 2: 실행 모드 마스터 🟡~🔴

> **목표**: Claude가 어떤 방식으로 작업을 수행하는지 이해하고, 상황에 맞는 모드를 선택한다.
> 모드를 잘못 선택하면 비효율적이거나 위험할 수 있습니다.

---

### Chapter 7. Plan Mode — 실행 전 설계 🟡

**왜 중요한가?**
복잡한 작업을 Plan Mode 없이 바로 실행하면 Claude가 잘못된 방향으로 수십 개 파일을 수정할 수 있습니다. Plan Mode는 "먼저 계획하고, 사람이 승인하면 실행한다"는 안전장치입니다.

**Plan Mode가 필요한 상황**
- 처음 보는 코드베이스에서 큰 변경 작업
- 여러 파일에 걸친 리팩토링
- 아키텍처 수준의 설계 변경
- 결과를 예측하기 어려운 복잡한 버그 수정

**Plan Mode 진입 방법**
- `Shift+Tab+Tab` 으로 토글
- 또는 프롬프트에 "plan mode로 먼저 계획만 세워줘" 라고 명시

**Plan Mode에서 사용하는 Sub-agent 타입**

| Sub-agent | 역할 | 언제 쓰나 |
|-----------|------|---------|
| `Explore` | 코드베이스 조사 전문 | 낯선 코드 이해, 파일 탐색 |
| `Plan` | 구현 전략 설계 | 접근 방법 결정, 트레이드오프 분석 |
| `general-purpose` | 범용 작업 | 특정 전문화가 필요 없는 작업 |

**Plan Mode 작업 흐름**
```
1. Plan Mode 진입
2. Explore sub-agent가 코드베이스 조사
3. Plan sub-agent가 구현 전략 설계
4. 계획 파일 생성 (검토 가능한 형태)
5. 사람이 계획 검토 & 승인
6. Plan Mode 종료 → 실행
```

**흔한 실수**
- 간단한 한 줄 수정에도 Plan Mode를 써서 시간 낭비
- Plan을 승인 없이 바로 실행해버림 (Plan Mode의 의미가 없어짐)

---

### Chapter 8. Sub-agents & Agent Teams — 병렬 지능 🔴

**왜 중요한가?**
혼자 순서대로 작업하는 것보다, 여러 에이전트가 동시에 다른 부분을 작업하면 훨씬 빠릅니다. 하지만 잘못 설계하면 파일 충돌이 발생합니다.

**Sub-agents vs Agent Teams 차이**

| 구분 | Sub-agents | Agent Teams |
|------|-----------|------------|
| 실행 위치 | 현재 세션 내부 | 독립된 별도 세션 |
| 조율 방식 | 직접 결과 반환 | 공유 태스크 파일로 소통 |
| 적합한 작업 | 빠른 조사, 단순 위임 | 장기 병렬 개발 작업 |
| 복잡도 | 낮음 | 높음 |

**Sub-agents 사용 패턴**
```
메인 Claude
  ├── Explore agent → "src/auth 폴더 구조 파악해서 보고해"
  ├── Explore agent → "테스트 파일들에서 패턴 찾아서 보고해"
  └── (결과 취합 후 직접 구현)
```

**Agent Teams 사용 패턴 (공유 태스크 리스트 방식)**
```
리드 에이전트 → tasks.md 파일에 작업 목록 작성
  ├── 에이전트 A → tasks.md 에서 "auth 모듈" 태스크 가져가서 작업
  ├── 에이전트 B → tasks.md 에서 "user 모듈" 태스크 가져가서 작업
  └── 에이전트 C → tasks.md 에서 "테스트 작성" 태스크 가져가서 작업
```

**파일 충돌 방지 전략**
- 에이전트별 담당 파일 영역 명확히 분리
- 공유 파일 수정이 필요하면 리드 에이전트만 담당
- 태스크 파일에 "작업 중" 상태 표시

**흔한 실수**
- 에이전트 팀을 쓰는데 작업 영역 분리 없이 같은 파일을 여러 에이전트가 수정

---

### Chapter 9. Auto Mode & Headless 실행 — 완전 자율 실행 🔴

**왜 중요한가?**
Auto Mode와 Headless 실행을 사용하면 사람이 없어도 Claude가 작업을 완수합니다. CI/CD 파이프라인, 야간 자동화, 예약 작업에 활용됩니다.

**Auto Mode란?**
`Shift+Tab`으로 진입. 퍼미션 요청 없이 설정된 범위 내에서 자동으로 작업을 진행합니다.

**Headless 실행이란?**
터미널 UI 없이 스크립트처럼 실행하는 방식입니다.
```bash
# 기본 Headless 실행
claude -p "src/ 폴더의 모든 TypeScript 파일에서 console.log 제거해줘"

# 결과를 파일로 저장
claude -p "보안 취약점 스캔해줘" --output report.md
```

**Routines: 반복 실행 설정**
- 시간 기반: "매일 오전 9시에 이슈 레이블 정리"
- 트리거 기반: "PR이 생성될 때마다 코드 리뷰"

**Remote Trigger**
API 호출로 Claude 세션을 원격으로 시작합니다.
```bash
# GitHub Actions에서 Claude 실행
curl -X POST https://api.claude.ai/trigger \
  -H "Authorization: Bearer $CLAUDE_API_KEY" \
  -d '{"prompt": "CI 실패 원인 분석하고 수정 제안해줘"}'
```

**안전 설계 원칙** (자율 실행 시 반드시 고려)
1. **최소 권한**: 작업에 필요한 퍼미션만 허용
2. **가역적 액션**: 삭제보다 이동, force push 금지
3. **중단 조건 명시**: "에러가 3번 이상 발생하면 중단"
4. **사람 검토 게이트**: 중요 단계에서 승인 요청

**흔한 실수**
- Auto Mode를 켠 채로 위험한 작업 시작 (권한 체크 없이 진행됨)
- Headless 실행에서 중단 조건 없이 무한 루프 발생

---

## SECTION 3: 실전 워크플로우 🟡~🔴

> **목표**: SECTION 1~2에서 배운 기능들을 조합해 실제 개발 작업을 처리한다.
> 각 워크플로우는 "어떤 기능을 어떻게 조합하는가"를 보여줍니다.

---

### Chapter 10. Git 기반 태스크 워크플로우 — 모든 작업의 기본 단위 🟡

**왜 이게 모든 워크플로우의 기반인가?**
Claude의 작업은 되돌리기 어렵습니다. Branch → Commit → PR 패턴을 지키면, 작업이 잘못되어도 브랜치를 삭제하면 그만입니다. 이 패턴 없이는 Claude가 만든 변경사항을 추적하기 어렵습니다.

**황금 패턴**
```
1. git checkout -b feature/add-user-auth
2. Claude에게 작업 위임
3. 중간 체크포인트마다 /commit
4. gh pr create
5. 코드 리뷰 후 Squash merge
```

**CLAUDE.md에 Git 규칙 명시 예시**
```markdown
# Git 워크플로우
- 모든 작업은 feature 브랜치에서 시작
- 브랜치명: feature/[이슈번호]-[짧은-설명]
- 커밋: Conventional Commits 형식 (feat, fix, refactor, docs)
- PR은 500줄 이하로 유지
- main 직접 push 절대 금지
```

**워크플로우 상세 단계**

```
1단계: 브랜치 생성
  git checkout -b feature/123-add-oauth

2단계: 작업 위임
  "OAuth 로그인 기능 추가해줘. GitHub와 Google을 지원해야 해."

3단계: 중간 커밋 (의미 있는 단위마다)
  /commit
  → "feat(auth): add OAuth provider configuration"

4단계: 작업 완료 후 PR 생성
  "PR 생성해줘. 변경 내용 요약하고 테스트 방법도 포함해."
  → gh pr create --title "feat: add OAuth login" --body "..."

5단계: 리뷰 반영 후 Merge
  Squash merge로 깔끔한 히스토리 유지
```

**긴급 버그 인터럽트 패턴**
```bash
# 현재 작업 임시 저장
git stash push -m "WIP: OAuth 작업 중"

# 긴급 버그 수정
git checkout -b hotfix/critical-login-bug
# ... 수정 ...
git checkout main && git merge hotfix/...

# 원래 작업으로 복귀
git checkout feature/123-add-oauth
git stash pop
```

---

### Chapter 11. TDD 워크플로우 🟡

**문제 인식**
Claude는 자연스럽게 구현 코드를 먼저 작성하고, 테스트를 나중에 붙이려 합니다. TDD를 제대로 하려면 이 본능을 명시적으로 제어해야 합니다.

**CLAUDE.md에 TDD 규칙 강제하기**
```markdown
# 테스트 원칙
- 구현 전 반드시 실패하는 테스트 먼저 작성
- 테스트 없이 구현 코드 작성 금지
- 테스트가 green이 된 후에만 리팩토링 가능
```

**TDD 워크플로우**
```
1. 테스트 파일 먼저 생성
   "loginUser 함수의 단위 테스트를 먼저 작성해줘.
    아직 구현은 하지 마. 실패하는 테스트만."

2. 테스트 실행 & Red 확인
   npm test → 실패 확인

3. 최소 구현으로 Green 만들기
   "테스트를 통과시키는 최소한의 구현만 작성해줘."

4. Refactor
   "테스트는 유지하면서 구현 코드를 개선해줘."

5. 커밋
   /commit → "test: add loginUser unit tests"
              "feat: implement loginUser"
```

**버그 수정 시 회귀 테스트 패턴**
```
1. 버그를 재현하는 실패 테스트 먼저 작성
   "이 버그를 재현하는 테스트 케이스 작성해줘."

2. 버그 수정
3. 테스트가 Green이 되는지 확인
4. 이후 같은 버그 재발 방지됨
```

---

### Chapter 12. 코드 리뷰 워크플로우 🟡

**핵심 전략: 좁은 브리핑 (Narrow Brief)**
Claude에게 "전체 리뷰해줘"라고 하면 피상적인 리뷰가 나옵니다. 관점 하나씩 집중해서 요청할 때 깊이 있는 리뷰가 나옵니다.

**3단계 리뷰 워크플로우**
```
1라운드: 보안 리뷰
  "이 PR에서 보안 취약점만 집중해서 찾아줘.
   인증, 인가, 입력 검증, SQL 인젝션 중심으로."

2라운드: 로직 리뷰
  "이제 비즈니스 로직 버그 가능성만 검토해줘.
   엣지 케이스와 에러 처리 중심으로."

3라운드: 성능 리뷰
  "마지막으로 성능 문제 가능성을 검토해줘.
   N+1 쿼리, 불필요한 연산 중심으로."
```

**GitHub PR 인라인 코멘트 자동화 (GitHub MCP 활용)**
```
"PR #123의 각 파일에 리뷰 코멘트를 직접 달아줘.
 각 이슈마다 구체적인 수정 제안도 포함해."
```
→ Claude가 GitHub API를 통해 직접 PR에 인라인 코멘트 게시

**토큰 예산 관리**
- 리뷰 작업: 컨텍스트 20K 이내로 제한 (관련 파일만 로딩)
- 수정 작업: 최대 60K까지 허용 (전체 맥락 필요)

---

### Chapter 13. 리팩토링 워크플로우 🟡

**안전한 대규모 리팩토링의 핵심**
한 번에 모든 걸 바꾸면 무엇이 문제인지 알기 어렵습니다. 작은 단계씩, 커밋하면서 진행합니다.

**리팩토링 워크플로우**
```
1. 현재 상태 테스트 확인
   "현재 테스트 커버리지 확인하고 보고해줘."

2. 첫 번째 리팩토링 단계 (작은 단위)
   "UserService의 중복 코드를 Extract Method로 정리해줘.
    다른 파일은 건드리지 말고 이 파일만."

3. 테스트 통과 확인
   npm test → 모두 Green

4. 커밋
   /commit → "refactor: extract duplicate validation logic"

5. 다음 단계로 이동
   (반복)
```

**단일 파일 vs 멀티 파일 리팩토링**

| 구분 | 전략 |
|------|------|
| 단일 파일 | 한 번에 진행, 중간 저장 |
| 멀티 파일 | 파일별로 순차 처리, 파일마다 커밋 |
| 인터페이스 변경 | Plan Mode로 전체 영향 범위 먼저 파악 |

---

### Chapter 14. 코드베이스 탐색 워크플로우 🟡

**상황**: 처음 보는 프로젝트에 투입되었을 때

**단계별 탐색 워크플로우**
```
1단계: 전체 구조 파악 (5분)
  "이 프로젝트의 폴더 구조를 분석하고
   각 폴더의 역할을 설명해줘."

2단계: 의존성 파악 (5분)
  "package.json 분석해서 주요 의존성과
   각각의 역할을 정리해줘."

3단계: 핵심 데이터 흐름 추적 (15분)
  "사용자 로그인 요청이 들어왔을 때
   어떤 파일들을 거치는지 추적해줘."

4단계: 아키텍처 문서화
  "분석한 내용을 ARCHITECTURE.md로 작성해줘."
```

**Explore Sub-agent로 병렬 탐색**
```
"이 프로젝트를 동시에 분석해줘:
 - Explore agent 1: auth 관련 모든 파일 분석
 - Explore agent 2: API 엔드포인트 목록 정리
 - Explore agent 3: 테스트 커버리지 현황 파악
결과를 취합해서 보고해."
```

**의존성 감사**
```
"사용하지 않는 npm 패키지 찾아줘."
"순환 의존성이 있는지 확인해줘."
"보안 취약점이 있는 패키지 스캔해줘."
```

---

### Chapter 15. DevOps & CI/CD 워크플로우 🔴

**2-레이어 품질 게이트 구조**
```
레이어 1: 로컬 Hooks (커밋 전)
  - Pre-commit: 린트, 타입 체크, 단위 테스트
  - 문제 발견 시 커밋 차단

레이어 2: GitHub Actions (PR 시)
  - 통합 테스트, E2E 테스트
  - 코드 커버리지 체크
  - 보안 스캔
```

**GitHub Actions와 Claude 통합**

**패턴 1: PR 자동 리뷰**
```yaml
# .github/workflows/claude-review.yml
on:
  pull_request:
    types: [opened]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - name: Claude Code Review
        run: |
          claude -p "PR #${{ github.event.number }} 코드 리뷰하고
                     GitHub에 인라인 코멘트 달아줘"
```

**패턴 2: CI 실패 시 자동 분석**
```yaml
on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]
    conclusion: failure

jobs:
  analyze:
    steps:
      - run: |
          claude -p "CI 로그 분석해서 실패 원인과 수정 방법 제안해줘"
```

**패턴 3: 릴리즈 자동화**
```yaml
on:
  push:
    tags: ['v*']

jobs:
  release:
    steps:
      - run: |
          claude -p "최근 커밋들 분석해서 CHANGELOG.md 업데이트하고
                     GitHub Release 초안 작성해줘"
```

**야간 자동화 (Routines)**
- 매일 새벽: 이슈 레이블 정리, 스테일 이슈 처리
- 매주 월요일: 지난 주 PR 리뷰 요약 Slack 발송
- 매월 1일: 의존성 업데이트 체크 PR 생성

---

### Chapter 16. 멀티 에이전트 워크플로우 🔴

**어떤 작업이 병렬화에 적합한가?**

| 적합 | 부적합 |
|------|--------|
| 독립적인 모듈 개발 | 순서가 중요한 순차 작업 |
| 여러 파일의 동시 분석 | 한 파일을 반복 수정하는 작업 |
| 경쟁적 가설 테스트 | 결과물이 서로 의존하는 작업 |

**패턴 1: 리드 에이전트 + 병렬 팀**
```
리드 에이전트:
  "다음 모듈들을 병렬로 개발해줘:
   - Agent A: 사용자 인증 모듈 (auth/)
   - Agent B: 결제 모듈 (payment/)
   - Agent C: 알림 모듈 (notification/)
   각자 담당 폴더만 수정할 것."
```

**패턴 2: 경쟁적 디버깅**
```
"이 버그의 원인이 두 가지 가설이 있어:
 - Agent A: 가설1 (캐시 문제) 검증해줘
 - Agent B: 가설2 (타임존 이슈) 검증해줘
 더 빨리 재현하는 쪽의 가설이 맞을 가능성 높아."
```

**공유 태스크 리스트 예시** (`tasks.md`)
```markdown
## 태스크 목록

- [ ] [AGENT-A] auth 모듈 JWT 구현
- [진행중] [AGENT-B] payment 모듈 Stripe 연동
- [완료] [AGENT-C] notification 모듈 이메일 발송
```

---

## SECTION 4: 전문가 패턴 🔴

> **목표**: 모든 기능과 워크플로우를 꿰뚫는 상위 레벨 전략을 익힌다.

---

### Chapter 17. Claude Code 마스터 사용법

**전문가와 일반 사용자의 차이**
일반 사용자는 Claude에게 막연하게 부탁합니다. 전문가는 Claude가 최선의 결과를 내도록 환경을 설계합니다.

---

#### 레버 1: CLAUDE.md 완성도가 모든 것을 결정한다

Claude의 출력 품질 = CLAUDE.md 품질 × 프롬프트 품질

아무리 좋은 프롬프트를 써도 CLAUDE.md가 없으면 매번 같은 실수를 반복합니다.

**CLAUDE.md 품질 체크리스트**
- [ ] 기술 스택이 명시되어 있는가?
- [ ] 금지 행동이 구체적으로 나열되어 있는가?
- [ ] 코딩 컨벤션 예시가 있는가?
- [ ] 테스트 방침이 있는가?
- [ ] 아키텍처 원칙이 있는가?

---

#### 레버 2: 컨텍스트 관리

Claude의 컨텍스트 창은 유한합니다. 잘못 관리하면 중요한 정보가 밀려나거나 비용이 급증합니다.

**`/compact` 사용 타이밍**
- 대화가 30분 이상 진행되었을 때
- 한 작업이 끝나고 다음 작업 시작 전
- Claude가 이전 내용을 잊는 것 같을 때

**세션 분리 기준**
- 완전히 다른 기능 작업 시작 → 새 세션
- 같은 기능의 연속 작업 → 같은 세션 유지

**핵심 파일만 로딩**
```
"src/auth/ 폴더만 읽고 작업해줘. 다른 폴더는 필요할 때만 읽어."
```

---

#### 레버 3: 프롬프트 설계 원칙

**원칙 1: 중단 조건 명시**
```
나쁜 예: "로그인 기능 구현해줘"
좋은 예: "로그인 기능 구현해줘. 단, 데이터베이스 스키마는
         절대 변경하지 말고, 기존 테스트가 깨지면 중단해."
```

**원칙 2: 가역적 액션만 허용**
```
나쁜 예: "불필요한 파일 정리해줘" (삭제될 수 있음)
좋은 예: "불필요해 보이는 파일 목록 보여줘. 삭제는 내가 확인 후 직접 할게."
```

**원칙 3: 좁고 명확하게**
```
나쁜 예: "이 코드 좋게 만들어줘"
좋은 예: "loginUser 함수의 에러 처리 부분만 개선해줘.
         성능이나 다른 부분은 건드리지 마."
```

---

#### 레버 4: 점진적 신뢰 구축

처음부터 Auto Mode로 큰 작업을 맡기지 마세요.

```
1주차: 파일 읽기, 분석, 제안만 (실행 없음)
2주차: 단일 파일 수정 (검토 후 적용)
3주차: 멀티 파일 수정 (Plan Mode 필수)
4주차: Auto Mode 활용 (검증된 범위에서만)
```

---

#### 레버 5: 잘못된 방향 빠른 감지 & 리셋

Claude가 잘못된 방향으로 가고 있는 신호:
- 관련 없는 파일을 수정하기 시작할 때
- 요청하지 않은 기능을 추가할 때
- 같은 에러로 3번 이상 실패할 때

**즉시 리셋하는 법**
```
"잠깐, 방향이 잘못된 것 같아. 지금까지 한 변경사항 취소하고
 다시 계획부터 세워줘. Plan Mode로."
```

---

#### 레버 6: Claude가 잘 못하는 것들

솔직히 인정하는 것이 더 효율적입니다.

| Claude가 약한 것 | 대안 |
|----------------|------|
| 완전히 새로운 아키텍처 설계 | 사람이 설계하고 Claude에게 구현 위임 |
| 프로덕션 배포 결정 | 항상 사람이 최종 판단 |
| 외부 서비스 장애 디버깅 | 실제 로그와 모니터링 도구 활용 |
| 오래된 레거시 코드 이해 | 원저자와 직접 소통 후 맥락 제공 |
| UI/UX 디자인 판단 | 디자이너와 협업 |

---

## 부록: 난이도별 학습 경로

### 입문자 경로 🟢
Chapter 0 → 1 → 2 → 10 → 11

### 중급자 경로 🟡
Chapter 3 → 4 → 5 → 7 → 12 → 13 → 14

### 고급자 경로 🔴
Chapter 6 → 8 → 9 → 15 → 16 → 17

---

## 부록: 기능-워크플로우 연결 지도

| 워크플로우 | 주로 사용하는 기능 |
|-----------|-----------------|
| Git 기반 태스크 | Skills(`/commit`), CLAUDE.md |
| TDD | CLAUDE.md(규칙 강제), Hooks(테스트 자동 실행) |
| 코드 리뷰 | MCP(GitHub), Sub-agents(병렬 리뷰) |
| 리팩토링 | Plan Mode, Skills(`/commit`) |
| 코드베이스 탐색 | Sub-agents(Explore), Memory |
| DevOps/CI-CD | Hooks, Auto Mode, Headless 실행 |
| 멀티 에이전트 | Agent Teams, 공유 태스크 리스트 |

---
---

# Part 2. main-hub — 사이트 카드 추가법

main-hub는 내가 만든 사이트들을 한 곳에서 볼 수 있는 허브 페이지입니다.
새 사이트가 생길 때마다 `main-hub/index.html` 파일 한 곳만 수정하면 카드가 자동으로 추가됩니다.

---

## 새 사이트 추가하기

`main-hub/index.html` 파일을 열고, `<main>` 안의 카드 그리드 섹션을 찾습니다.
기존 카드 블록을 복사해서 붙여넣은 뒤 `href` / 이모지 / 제목 / 설명 / 태그를 수정합니다.

```html
<!-- CARD: 새 사이트 -->
<a href="https://example.com"
   target="_blank" rel="noopener noreferrer"
   class="glass-card rounded-2xl p-6 flex flex-col gap-4 cursor-pointer group">
  <div class="flex items-start justify-between">
    <span class="text-4xl leading-none">🚀</span>
    <span class="tag-pill">App</span>
  </div>
  <div class="flex-1">
    <h2 class="card-title font-bold text-base text-white mb-1.5 transition-colors">My App</h2>
    <p class="text-sm text-white/45 leading-relaxed">앱에 대한 간단한 설명을 입력하세요.</p>
  </div>
  <div class="card-footer flex items-center gap-1.5 text-xs text-white/25 transition-colors font-medium">
    <span>example.com</span>
    <svg class="arrow-icon w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  </div>
</a>
<!-- /CARD -->
```

---

## 카드 필드 설명

| 필드 | 위치 | 설명 |
|------|------|------|
| 링크 | `<a href="...">` | 카드 클릭 시 이동할 URL (`https://`로 시작) |
| 이모지 | 첫 번째 `<span class="text-4xl">` | 카드 좌측 상단에 표시 |
| 태그 | `<span class="tag-pill">` | 우측 상단 라벨 (예: App, Tool, Game, Guide) |
| 제목 | `<h2 class="card-title">` | 카드에 표시될 사이트 이름 |
| 설명 | 제목 아래 `<p>` | 한두 줄 설명 |
| 도메인 | footer `<span>` | 카드 하단 표시용 도메인 (링크와 같지 않아도 됨) |

---

## 페이지 미리보기

별도 서버 없이 브라우저에서 바로 열 수 있습니다.

```
main-hub/index.html 파일을 더블클릭
또는
브라우저 주소창에 file:// 경로 입력
```

배포는 `DEPLOY.md` 의 main-hub 섹션 참고.

---

## 푸터: 개인정보처리방침 링크

main-hub 하단에는 `/privacy-policy`로 이동하는 푸터 링크가 있습니다.
페이지 자체는 `main-hub/privacy-policy/index.html` 에 있고, nginx의 `try_files` 설정으로 `dolgogae.cloud/privacy-policy` 경로에서 자동 서빙됩니다.

내용 변경 시 `main-hub/privacy-policy/index.html`을 수정하고 main-hub를 다시 배포하면 즉시 반영됩니다.
