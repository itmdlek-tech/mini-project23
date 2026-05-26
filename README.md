# 도서관리시스템

> KT AIVLE School 4차 미니프로젝트 — AI 도서 표지 생성 서비스

별도 백엔드 없이 React SPA가 `json-server`(Mock API)와 OpenAI Images API를 직접 호출하여 도서를 관리하는 시스템. 도서 등록 시 입력한 제목·내용을 프롬프트로 AI 표지를 생성한다.

---

## 조 정보

- **조 이름**: AI 23조
- **팀원**: 
  - 편진솔 — PM·기획
  - 유정환 — UI·레이아웃·스타일링·QA
  - 이제혁 — CRUD 연동
  - 이소은 — OpenAI 연동
  - 김주형 — 발표·문서

---

## 미션 개요

| 일자 | 단계 | 핵심 작업 |
|---|---|---|
| 1일차 | M1·M2 | 기획·설계, Vite 프로젝트 세팅, Mock UI |
| 2일차 | M3·M4 | json-server CRUD 연동, 폼 유효성 |
| 3일차 | M5·M6 | OpenAI 표지 생성, 발표 자료 |

---

## 기술 스택

| 영역 | 기술 |
|---|---|
| 프론트엔드 | React 19 + Vite |
| 라우팅 | react-router-dom v7 |
| Mock 백엔드 | json-server v0.17.4 |
| AI | OpenAI Images API (`gpt-image-2`) |
| 상태 관리 | useState + useEffect (외부 라이브러리 X) |
| HTTP | 브라우저 fetch API (axios X) |
| 스타일링 | 일반 CSS (Tailwind/CSS Modules X) |

---

## 1일차 진행 상황

### 완료
- [x] M1: 기획·설계
  - 데이터 모델(Book) 정의
  - API 엔드포인트 명세
  - 폴더 구조 설계
  - UI 스케치 (4개 페이지)
- [x] Vite + React 프로젝트 생성 (`my-app/`)
- [x] `react-router-dom` 설치 및 라우팅 구성
- [x] 4개 페이지 Mock UI 작성
  - 도서 목록 / 상세 / 등록 / 수정
- [x] 공통 헤더 컴포넌트 (`Header.jsx`)
- [x] `db.json` 시드 데이터 (도서 5권)
- [x] 전체 스타일 (`App.css`)
- [x] `.gitignore` 확인 (`node_modules/`, `.env`, `*.key` 포함)

### 2일차 예정 (M3·M4)
- [ ] `src/api/books.js` — fetch 기반 CRUD 함수 작성
- [ ] 목록·상세에 `useEffect` + fetch 적용
- [ ] 등록(POST) · 수정(PATCH) · 삭제(DELETE) 구현
- [ ] 폼 유효성 검증
- [ ] 로딩·에러 상태 표시

### 3일차 예정 (M5·M6)
- [ ] `src/api/openai.js` — OpenAI Images API 호출 함수
- [ ] AI 표지 생성 → `b64_json` → Data URL → PATCH 저장
- [ ] 퀄리티 토글 (LOW / MEDIUM / HIGH)
- [ ] API Key 입력 UI (state로만 관리, 저장 X)
- [ ] 에러 처리 (401 / 429 등)
- [ ] 발표 자료(PPT) 정리

---

## 실행 방법

### 첫 세팅 (한 번만)
```bash
cd my-app
npm install
```

### 개발 서버 (터미널 2개)

```bash
# 터미널 1 — json-server (Mock API)
cd my-app
npx json-server@0.17.4 --watch db.json --port 3000
# 확인: http://localhost:3000/books

# 터미널 2 — Vite (React)
cd my-app
npm run dev
# 확인: http://localhost:5173
```

### 빌드
```bash
npm run build       # 결과물: dist/
npm run preview     # 빌드 결과 미리보기
```

---

## 라우팅

| 경로 | 컴포넌트 | 용도 |
|---|---|---|
| `/` | `BookListPage` | 도서 목록 |
| `/books/:id` | `BookDetailPage` | 도서 상세 |
| `/books/new` | `BookCreatePage` | 신규 등록 |
| `/books/:id/edit` | `BookEditPage` | 수정 |

---

## 데이터 모델

### Book 객체

```js
{
  id: 1,                                    // number (json-server 자동 증가)
  title: '별빛 아래의 서점',                // string, 필수
  author: '홍길동',                         // string, 필수
  content: '...',                           // string, 필수, AI 프롬프트 활용
  coverImageUrl: '',                        // string, 빈 값 가능, AI 생성 시 Data URL
  createdAt: '2026-05-10T09:00:00.000Z',    // ISO 8601
  updatedAt: '2026-05-10T09:00:00.000Z'     // ISO 8601
}
```

### `db.json`
- 시드 도서 (`/books`)

---

## API 엔드포인트

### json-server (`http://localhost:3000`)

| 메서드 | URL | 용도 |
|---|---|---|
| GET | `/books` | 목록 조회 |
| GET | `/books/:id` | 상세 조회 |
| POST | `/books` | 신규 등록 |
| PATCH | `/books/:id` | 부분 수정 |
| DELETE | `/books/:id` | 삭제 |

## 폴더 구조

```
my-app/
├── db.json                       # json-server 시드 데이터
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx                   # 라우팅 설정
    ├── App.css                   # 전체 스타일
    ├── index.css
    ├── api/                      # (2일차) CRUD 함수
    │   ├── books.js
    │   └── openai.js             # (3일차) OpenAI 호출 함수
    ├── components/
    │   └── Header.jsx
    └── pages/
        ├── BookListPage.jsx
        ├── BookDetailPage.jsx
        ├── BookCreatePage.jsx
        └── BookEditPage.jsx
```