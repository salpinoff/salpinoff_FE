import { type NextMiddleware, NextResponse } from 'next/server';

type MiddleWareFactory = (middleware: NextMiddleware) => NextMiddleware;

const chain = (middlewares: MiddleWareFactory[], index = 0): NextMiddleware => {
  const current = middlewares[index];

  if (current) {
    const next = chain(middlewares, index + 1);
    return current(next);
  }

  return () => NextResponse.next();
};

export default chain;
