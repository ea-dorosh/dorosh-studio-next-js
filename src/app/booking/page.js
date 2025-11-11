import { headers as nextHeaders } from 'next/headers';
import BookingFormContainer from '@/components/BookingForm/BookingFormContainer';
import servicesService from '@/services/services.service';

// Force dynamic rendering to run server-side tracking on every request
export const dynamic = `force-dynamic`;

export const metadata = {
  title: `Online Termin buchen - MOOD BEAUTY München | Natalia Dorosh`,
  description: `Buchen Sie Ihren Termin für Permanent Make-Up, Nail Art und andere Schönheitsbehandlungen in München. Kostenlose Beratung verfügbar.`,
  keywords: `Termin buchen, Permanent Make-Up München, Nail Art München, Schönheitsbehandlung, Online Buchung, MOOD BEAUTY`,
};

async function trackQrScan(searchParams) {
  const source = searchParams?.source;

  const incoming = nextHeaders();
  const xff = incoming.get(`x-forwarded-for`);
  const xri = incoming.get(`x-real-ip`);
  const cfc = incoming.get(`cf-connecting-ip`);
  const ua = incoming.get(`user-agent`);
  const ref = incoming.get(`referer`);
  const proto = incoming.get(`x-forwarded-proto`) || `http`;
  const host = incoming.get(`host`);
  const origin = `${proto}://${host}`;
  const nextLocalOrigin = `http://127.0.0.1:3001`;

  // Track public QR code
  if (source === `public`) {
    try {
      try {
        await fetch(`${nextLocalOrigin}/api/qr-track`, {
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
            trackedAt: new Date().toISOString(),
            source: `server-side`,
          }),
          cache: `no-store`,
        });
      } catch (e) {
        await fetch(`${origin}/api/qr-track`, {
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
            trackedAt: new Date().toISOString(),
            source: `server-side`,
          }),
          cache: `no-store`,
        });
      }
    } catch (error) {
      console.error(`QR tracking error:`, error);
    }
  }

  // Track coupon QR code
  if (source === `coupon`) {
    try {
      try {
        await fetch(`${nextLocalOrigin}/api/coupon-qr-track`, {
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
            trackedAt: new Date().toISOString(),
            source: `server-side`,
          }),
          cache: `no-store`,
        });
      } catch (e) {
        await fetch(`${origin}/api/coupon-qr-track`, {
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
            trackedAt: new Date().toISOString(),
            source: `server-side`,
          }),
          cache: `no-store`,
        });
      }
    } catch (error) {
      console.error(`Coupon QR tracking error:`, error);
    }
  }

  // Track GA source
  if (source === `ga`) {
    try {
      try {
        await fetch(`${nextLocalOrigin}/api/ga-track`, {
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
            trackedAt: new Date().toISOString(),
            source: `server-side`,
          }),
          cache: `no-store`,
        });
      } catch (e) {
        await fetch(`${origin}/api/ga-track`, {
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
            trackedAt: new Date().toISOString(),
            source: `server-side`,
          }),
          cache: `no-store`,
        });
      }
    } catch (error) {
      console.error(`GA tracking error:`, error);
    }
  }

  // Track GA1 source
  if (source === `ga1`) {
    try {
      try {
        await fetch(`${nextLocalOrigin}/api/ga1-track`, {
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
            trackedAt: new Date().toISOString(),
            source: `server-side`,
          }),
          cache: `no-store`,
        });
      } catch (e) {
        await fetch(`${origin}/api/ga1-track`, {
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
            trackedAt: new Date().toISOString(),
            source: `server-side`,
          }),
          cache: `no-store`,
        });
      }
    } catch (error) {
      console.error(`GA1 tracking error:`, error);
    }
  }

  // Track GA2 source
  if (source === `ga2`) {
    try {
      try {
        await fetch(`${nextLocalOrigin}/api/ga2-track`, {
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
            trackedAt: new Date().toISOString(),
            source: `server-side`,
          }),
          cache: `no-store`,
        });
      } catch (e) {
        await fetch(`${origin}/api/ga2-track`, {
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
            trackedAt: new Date().toISOString(),
            source: `server-side`,
          }),
          cache: `no-store`,
        });
      }
    } catch (error) {
      console.error(`GA2 tracking error:`, error);
    }
  }
}

export default async function BookingPage({ searchParams }) {
  const categories = await servicesService.getServices();
  await trackQrScan(searchParams);

  return (
    <BookingFormContainer categories={categories} />
  );
}
