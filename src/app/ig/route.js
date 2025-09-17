import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const origin = `${url.protocol}//${url.host}`;

    console.log(`[IG] Processing Instagram redirect from: ${origin}`);

    // Call internal API to log click
    const apiUrl = `${origin}/api/link-track?channel=instagram-bio&target=/booking`;
    console.log(`[IG] Calling tracking API: ${apiUrl}`);

    try {
      const trackingResponse = await fetch(apiUrl, {
        method: `POST`,
        cache: `no-store`,
        headers: {
          'User-Agent': request.headers.get(`user-agent`) || `Instagram-Bot`,
        },
      });
      console.log(`[IG] Tracking API response: ${trackingResponse.status} ${trackingResponse.ok}`);
    } catch (error) {
      console.error(`[IG] Tracking API failed:`, error.message);
    }

    const redirectUrl = `${origin}/booking?utm_source=instagram&utm_medium=social&utm_campaign=bio&utm_content=profile_link&source=instagram`;
    console.log(`[IG] Redirecting to: ${redirectUrl}`);

    // Create redirect response with no-cache headers
    const response = NextResponse.redirect(redirectUrl, { status: 302 });

    // Add headers to prevent caching
    response.headers.set(`Cache-Control`, `no-cache, no-store, must-revalidate, max-age=0`);
    response.headers.set(`Pragma`, `no-cache`);
    response.headers.set(`Expires`, `0`);
    response.headers.set(`CDN-Cache-Control`, `no-cache`);
    response.headers.set(`Cloudflare-CDN-Cache-Control`, `no-cache`);

    return response;
  } catch (error) {
    console.error(`[IG] Unexpected error:`, error.message);

    try {
      const fallbackUrl = new URL(request.url);
      const fallbackOrigin = `${fallbackUrl.protocol}//${fallbackUrl.host}`;
      const fallbackResponse = NextResponse.redirect(`${fallbackOrigin}/booking`, { status: 302 });

      // Add no-cache headers to fallback too
      fallbackResponse.headers.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
      fallbackResponse.headers.set(`Pragma`, `no-cache`);
      fallbackResponse.headers.set(`Expires`, `0`);

      return fallbackResponse;
    } catch {
      const hardcodedResponse = NextResponse.redirect(`https://moodbeauty.de/booking`, { status: 302 });
      hardcodedResponse.headers.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
      return hardcodedResponse;
    }
  }
}
