// Google Ads Conversion Tracking
// Работает с вашим существующим Google Analytics 4 (G-95J0ZJ44WD)

// Бронирование завершено - ГЛАВНАЯ КОНВЕРСИЯ ДЛЯ GOOGLE ADS
export const trackBookingComplete = (data) => {
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

    // 2. Google Ads Conversion (ДОБАВЬТЕ ID ПОСЛЕ СОЗДАНИЯ CONVERSION)
    // Инструкция: GOOGLE_ADS_SETUP.md → ШАГ 2.3
    window.gtag(`event`, `conversion`, {
      send_to: `AW-XXXXXXXXX/XXXXXXXXXXX`, // ← ЗАМЕНИТЕ на ваш Conversion ID/Label
      value: data.price || 350,
      currency: `EUR`,
      transaction_id: data.bookingId || Date.now().toString(),
    });
  }
};

// Клик на телефон - КОНВЕРСИЯ ДЛЯ ЗВОНКОВ
export const trackPhoneClick = () => {
  if (typeof window !== `undefined` && window.gtag) {
    // 1. Google Analytics событие
    window.gtag(`event`, `phone_call_click`, {
      event_category: `contact`,
      event_label: `phone_button`,
    });

    // 2. Google Ads Phone Call Conversion
    window.gtag(`event`, `conversion`, {
      send_to: `AW-XXXXXXXXX/XXXXXXXXXXX`, // ← ЗАМЕНИТЕ на ДРУГОЙ ID для звонков
    });
  }
};

// Начало бронирования - для аналитики
export const trackBookingStart = (serviceName) => {
  if (typeof window !== `undefined` && window.gtag) {
    window.gtag(`event`, `begin_checkout`, {
      service_name: serviceName,
      value: 350,
      currency: `EUR`,
    });
  }
};

