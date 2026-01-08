// Google Ads Conversion Tracking
// Работает с вашим существующим Google Analytics 4 (G-95J0ZJ44WD)
//
// ВАЖНО: После создания Conversion Actions в Google Ads:
// 1. Замените AW-XXXXXXXXX/XXXXXXXXXXX на реальные Conversion IDs (строки 22 и 41)
// 2. Добавьте Google Ads script в src/app/layout.js (см. GOOGLE_ADS_STATUS.md → Шаг 4)

const PRODUCTION_HOSTNAME = `moodbeauty.de`;

/**
 * Checks if the current environment is production
 */
function isProduction() {
  if (typeof window === `undefined`) return false;
  const hostname = window.location.hostname;
  return hostname === PRODUCTION_HOSTNAME || hostname === `www.${PRODUCTION_HOSTNAME}`;
}

// Бронирование завершено - ГЛАВНАЯ КОНВЕРСИЯ ДЛЯ GOOGLE ADS
export const trackBookingComplete = (data) => {
  // Only send events on production
  if (!isProduction()) {
    // eslint-disable-next-line no-console
    console.log(`[GTM Debug] trackBookingComplete:`, data);
    return;
  }

  if (typeof window !== `undefined` && window.gtag) {
    // 1. Google Analytics 4 событие (уже работает)
    window.gtag(`event`, `purchase`, {
      transaction_id: data.bookingId || Date.now().toString(),
      value: data.price || 350,
      currency: `EUR`,
      items: [{
        item_name: data.serviceName,
        item_category: data.category || `Beauty`,
        price: data.price || 350,
      }],
    });

    // 2. Google Ads Conversion - Бронирование завершено
    window.gtag(`event`, `conversion`, {
      send_to: `AW-11025863414/yj9bCIWyoLobEPalxYkp`,
      value: data.price || 350,
      currency: `EUR`,
      transaction_id: data.bookingId || Date.now().toString(),
    });
  }
};

// Клик на телефон - только для Google Analytics (не отслеживаем в Google Ads)
export const trackPhoneClick = () => {
  // Only send events on production
  if (!isProduction()) {
    // eslint-disable-next-line no-console
    console.log(`[GTM Debug] trackPhoneClick`);
    return;
  }

  if (typeof window !== `undefined` && window.gtag) {
    // Google Analytics событие (для аналитики)
    window.gtag(`event`, `phone_call_click`, {
      event_category: `contact`,
      event_label: `phone_button`,
    });
    // Google Ads conversion для звонков не используется
  }
};

// Начало бронирования - для аналитики
export const trackBookingStart = (serviceName) => {
  // Only send events on production
  if (!isProduction()) {
    // eslint-disable-next-line no-console
    console.log(`[GTM Debug] trackBookingStart:`, serviceName);
    return;
  }

  if (typeof window !== `undefined` && window.gtag) {
    window.gtag(`event`, `begin_checkout`, {
      service_name: serviceName,
      value: 350,
      currency: `EUR`,
    });
  }
};
