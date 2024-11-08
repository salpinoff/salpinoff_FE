import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    cookies().set({
      path: '/',
      name: 'gbmon-init',
      value: new Date().toLocaleString(),
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 200 });
  }
}
