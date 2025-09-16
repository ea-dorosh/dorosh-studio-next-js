export function sendGaEvent(eventName, params = {}) {
  try {
    if (typeof window !== `undefined` && typeof window.gtag === `function`) {
      window.gtag(`event`, eventName, params);
    }
  } catch (_e) {
    // noop
  }
}


