import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const channel = searchParams.get(`channel`) || `unknown`;
    const target = searchParams.get(`target`) || `/booking`;

    const headersIn = request.headers;
    const xff = headersIn.get(`x-forwarded-for`);
    const xri = headersIn.get(`x-real-ip`);
    const cfc = headersIn.get(`cf-connecting-ip`);
    const ua = headersIn.get(`user-agent`);
    const ref = headersIn.get(`referer`);

    // Prefer local backend to avoid external proxy issues in dev
    const base = process.env.NODE_ENV === `production`
      ? (process.env.SERVER_API_URL || `https://api.moodbeauty.de/`)
      : `http://127.0.0.1:3500/`;

    const targetUrl = `${base.replace(/\/$/, ``)}/api/public/tracking/link-click`;

    const res = await fetch(targetUrl, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
        ...(ua ? { 'user-agent': ua } : {}),
        ...(ref ? { referer: ref } : {}),
        ...(xff ? { 'x-forwarded-for': xff } : {}),
        ...(xri ? { 'x-real-ip': xri } : {}),
        ...(cfc ? { 'cf-connecting-ip': cfc } : {}),
      },
      body: JSON.stringify({
        linkedAt: new Date().toISOString(),
        channel,
        target,
      }),
      cache: `no-store`,
    });

    if (!res.ok) {
      return NextResponse.json({
        error: `Upstream error`,
        upstreamStatus: res.status,
      }, { status: 502 });
    }

    return NextResponse.json({ message: `link click logged` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Proxy failed` }, { status: 500 });
  }
}


