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

    const redirectUrl = `${origin}/booking?utm_source=instagram&utm_medium=social&utm_campaign=bio&utm_content=profile_link&source=instagram`;
    return NextResponse.redirect(redirectUrl, { status: 302 });
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


