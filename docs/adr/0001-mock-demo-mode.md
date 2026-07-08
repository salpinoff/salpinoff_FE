# 0001. Mock demo mode (backend-less deploy)

- 상태: 채택(Accepted)
- 날짜: 2026-07-08

## 배경 (Context)

백엔드 서버와 도메인이 만료되어 모든 API 호출을 받아줄 서버가 없습니다. 프로젝트는
종료되었지만, 프론트엔드 데모는 계속 띄워두고 싶고, 나중에 실서버를 다시 붙일 때
아무것도 되돌리지 않아도 되게 하고 싶습니다.

정적 호스팅(GitHub Pages / `next export`)은 배제했습니다. 이 앱은 미들웨어 기반 인증
게이팅과 서버 route 핸들러(`/api/auth/[...auth]`, `/api/init`)에 의존하는데, 정적 export는
이를 금지합니다. 그리고 그 부분이야말로 재연결 시 그대로 살려야 할 통합 지점입니다. Next를
유지(자체 Vercel 계정)하면 이를 보존할 수 있습니다.

## 결정 (Decision)

단일 환경변수 `NEXT_PUBLIC_USE_MOCK` 를 도입해, 켜지면 앱이 전적으로 픽스처로 동작하도록
합니다.

- **`src/mocks/`** — `config.ts`(플래그), `fixtures.ts`(데모 유저·몬스터·메시지),
  `adapter.ts`(URL→픽스처 라우트 테이블을 가진 axios adapter).
- **`src/app/api/api.config.ts`** — 플래그가 켜지면 두 axios 인스턴스
  (`baseInstance`, `apiInstance`)가 `mockAdapter` 를 사용합니다. 이 한 곳에서 클라이언트·SSR의
  모든 데이터 트래픽(인증 세션, 몬스터, 메시지, 상호작용, 응원)을 가로채므로 개별 엔드포인트
  파일은 손대지 않습니다.
- **`src/middleware.ts`** — 플래그가 켜지면 미들웨어 체인 전체를 우회합니다
  (`NextResponse.next()`). 인증/몬스터 미들웨어는 토큰 갱신과 라우트 게이팅을 위해 백엔드를
  호출하는데(일부는 axios가 아닌 raw `fetch`), 체인을 건너뛰면 죽은 호출을 막고 모든 페이지가
  로그인된 데모 유저로 렌더됩니다.

쓰기 요청(몬스터 생성·수정, 메시지 전송·확인)은 성공 응답만 돌려주며 저장되지 않습니다. 배포
대상은 원 소유자의 Vercel이 아니라 자체 무료 Vercel 프로젝트입니다.

## 결과 (Consequences)

- 데모는 백엔드 없이, 실제 인증 없이 동작합니다. 읽기는 픽스처를 보여주고 쓰기는 no-op입니다.
- **실서버 재연결:** `NEXT_PUBLIC_USE_MOCK=false`(또는 삭제)로 두고
  `NEXT_PUBLIC_API_DOMAIN_NAME` / `NEXT_PUBLIC_DOMAIN_NAME` 를 실서버로 지정하면 됩니다.
  코드 변경은 없습니다 — 플래그가 꺼지면 adapter와 미들웨어 가드는 동작하지 않습니다.
- **mock 모드 완전 제거:** `src/mocks/` 삭제, `api.config.ts` 의 두 줄 가드, `src/middleware.ts`
  의 가드만 지우면 됩니다.
- 픽스처는 시간이 지나면 실제 API 형태와 어긋날 수 있습니다. 동일한 `@api` 인터페이스로
  타입을 맞춰 두어, 명백한 불일치는 빌드 시점에 잡히게 했습니다.

## 데모 배포에 필요한 환경변수

```
NEXT_PUBLIC_USE_MOCK=true
NEXT_PUBLIC_DOMAIN_NAME=<Vercel URL, 예: https://salpinoff-fe-henna.vercel.app>
NEXT_PUBLIC_API_DOMAIN_NAME=https://mock.invalid   # 어떤 값이든 무방, 실제로 호출되지 않음
AUTH_SECRET=<32자 이상 임의 문자열>                  # mock 모드에서는 미사용, 빌드용
```

전체 목록은 [`.env.example`](../../.env.example) 참고.
