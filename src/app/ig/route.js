import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const origin = `${url.protocol}//${url.host}`;

    // Call internal API to log click
    const apiUrl = `${origin}/api/link-track?channel=instagram-bio&target=/booking`;
    await fetch(apiUrl, {
      method: `POST`,
      cache: `no-store`,
    }).catch(() => {});

    const redirectUrl = new URL(`/booking`, origin);
    redirectUrl.searchParams.set(`utm_source`, `instagram`);
    redirectUrl.searchParams.set(`utm_medium`, `social`);
    redirectUrl.searchParams.set(`utm_campaign`, `bio`);
    redirectUrl.searchParams.set(`utm_content`, `profile_link`);
    redirectUrl.searchParams.set(`source`, `instagram`);

    return NextResponse.redirect(redirectUrl.toString(), { status: 302 });
  } catch (_e) {
    try {
      const fallbackUrl = new URL(request.url);
      const fallbackOrigin = `${fallbackUrl.protocol}//${fallbackUrl.host}`;
      return NextResponse.redirect(`${fallbackOrigin}/booking`, { status: 302 });
    } catch {
      return NextResponse.redirect(`https://moodbeauty.de/booking`, { status: 302 });
    }
  }
}


