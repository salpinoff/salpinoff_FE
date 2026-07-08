// ponytail: single switch for demo mock mode. Set NEXT_PUBLIC_USE_MOCK=true to
// serve the app entirely from fixtures (backend/domain are expired). Unset it and
// point NEXT_PUBLIC_API_DOMAIN_NAME at a real server to reconnect — no code changes.
// See docs/adr/0001-mock-demo-mode.md
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
