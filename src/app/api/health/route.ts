import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'online',
    service: 'Somuchaura Haute Vaults API (Next.js & Node.js)',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
}
