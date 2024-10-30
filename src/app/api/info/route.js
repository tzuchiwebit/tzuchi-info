import { NextResponse } from 'next/server';

export function GET() {
  const message = {
    'NEXT_PUBLIC_ENV_NAME': process.env.NEXT_PUBLIC_ENV_NAME,
    'NEXT_PUBLIC_URL': process.env.NEXT_PUBLIC_URL,
    'NEXT_PUBLIC_STAGING': process.env.NEXT_PUBLIC_STAGING,
    'NEXT_PUBLIC_CMS_URL': process.env.NEXT_PUBLIC_CMS_URL,
  };
  return NextResponse.json(message);
}
