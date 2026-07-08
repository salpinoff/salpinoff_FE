import type { AxiosAdapter, AxiosResponse } from 'axios';

import {
  DEMO_MESSAGES,
  DEMO_MONSTERS,
  DEMO_SESSION,
  DEMO_USER,
  findMonster,
} from './fixtures';

// Intercepts every request on both axios instances and answers from fixtures.
// Route table is matched top-to-bottom, so more specific paths come first.
// `config.url` is the path relative to the instance baseURL (e.g. "/monsters/my").

type Ctx = {
  match: RegExpExecArray | null;
  body: Record<string, unknown>;
};

type Route = {
  method: 'get' | 'post' | 'put' | 'delete' | 'all';
  test: RegExp;
  data: (ctx: Ctx) => unknown;
};

const routes: Route[] = [
  // --- baseInstance: Next auth / init route handlers ---
  { method: 'all', test: /^\/api\/auth\/session$/, data: () => DEMO_SESSION },
  {
    method: 'all',
    test: /^\/api\/auth\/csrf$/,
    data: () => ({ csrfToken: 'demo-csrf' }),
  },
  { method: 'all', test: /^\/api\/auth\/signout$/, data: () => ({}) },
  {
    method: 'all',
    test: /^\/api\/auth\/signin\/kakao$/,
    data: () => ({ url: `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/` }),
  },
  { method: 'all', test: /^\/api\/init$/, data: () => ({ status: 200 }) },

  // --- members ---
  { method: 'all', test: /^\/members\/my$/, data: () => ({}) },
  {
    method: 'all',
    test: /^\/members\/token\/refresh$/,
    data: () => ({ accessToken: DEMO_SESSION.accessToken }),
  },
  {
    method: 'all',
    test: /^\/members\/login\/kakao$/,
    data: () => ({
      memberId: DEMO_USER.memberId,
      accessToken: DEMO_SESSION.accessToken,
      refreshToken: 'demo-refresh-token',
      username: DEMO_USER.username,
      code: 102,
    }),
  },
  { method: 'all', test: /^\/members\/logout$/, data: () => ({}) },

  // --- monsters (specific paths before /monsters/:id) ---
  {
    method: 'get',
    test: /^\/monsters\/my\/rep$/,
    data: () => DEMO_MONSTERS[0],
  },
  {
    method: 'get',
    test: /^\/monsters\/my$/,
    data: () => ({
      page: 0,
      size: 10,
      content: DEMO_MONSTERS,
      totalElements: DEMO_MONSTERS.length,
    }),
  },
  {
    method: 'post',
    test: /^\/monsters$/,
    data: ({ body }) => ({
      ...DEMO_MONSTERS[0],
      ...body,
      monsterId: '1',
      ownerName: DEMO_USER.username,
      interactionCount: 10,
      currentInteractionCount: 0,
      monsterDecorations: (
        (body.monsterDecorations as unknown[] | undefined) ?? []
      ).map((d, i) => ({ decorationId: i + 1, ...(d as object) })),
    }),
  },
  // confirm message (POST /monsters/:id/messages/:messageId)
  {
    method: 'post',
    test: /^\/monsters\/[^/]+\/messages\/[^/]+$/,
    data: () => ({}),
  },
  {
    method: 'get',
    test: /^\/monsters\/[^/]+\/messages$/,
    data: () => DEMO_MESSAGES,
  },
  {
    method: 'post',
    test: /^\/monsters\/([^/]+)\/interactions$/,
    data: ({ match, body }) => ({
      monsterId: match?.[1] ?? '1',
      currentInteractionCount: String(body.interactionCount ?? 0),
    }),
  },
  {
    method: 'all',
    test: /^\/monsters\/[^/]+\/encouragement$/,
    data: () => ({}),
  },
  {
    method: 'get',
    test: /^\/monsters\/([^/]+)$/,
    data: ({ match }) => findMonster(match?.[1]),
  },
  { method: 'put', test: /^\/monsters\/[^/]+$/, data: () => ({}) },
  { method: 'delete', test: /^\/monsters\/[^/]+$/, data: () => ({}) },
];

const parseBody = (raw: unknown): Record<string, unknown> => {
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  return (raw as Record<string, unknown>) ?? {};
};

const mockAdapter: AxiosAdapter = async (config) => {
  const method = (config.method ?? 'get').toLowerCase();
  const path = (config.url ?? '').split('?')[0];
  const body = parseBody(config.data);

  const route = routes.find(
    (r) => (r.method === 'all' || r.method === method) && r.test.test(path),
  );

  if (!route && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(`[mock] unmatched ${method.toUpperCase()} ${path} -> {}`);
  }

  return {
    data: route ? route.data({ match: route.test.exec(path), body }) : {},
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  } as AxiosResponse;
};

export default mockAdapter;
