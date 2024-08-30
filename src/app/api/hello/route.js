import { NextResponse } from 'next/server';

export function GET() {
  const randomNumber = Math.floor(Math.random() * 1000);
  const message = { message: `Hello user: ${randomNumber}` };
  return NextResponse.json(message);
}
