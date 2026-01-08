/**
 * Google Analytics 4 Event Tracking
 *
 * Booking Funnel Steps:
 * 1. booking_opened - форма бронирования открыта
 * 2. booking_service_selected - сервис выбран
 * 3. booking_employee_selected - работник выбран (если шаг показан)
 * 4. booking_date_selected - дата выбрана
 * 5. booking_timeslot_selected - время выбрано
 * 6. booking_customer_form_shown - форма клиента показана
 * 7. booking_submitted - форма отправлена
 * 8. booking_completed - бронирование успешно
 * 9. booking_error - ошибка бронирования
 */

const PRODUCTION_HOSTNAME = `moodbeauty.de`;

/**
 * Checks if the current environment is production
 */
function isProduction() {
  if (typeof window === `undefined`) return false;
  const hostname = window.location.hostname;
  return hostname === PRODUCTION_HOSTNAME || hostname === `www.${PRODUCTION_HOSTNAME}`;
}

export function sendGaEvent(eventName, params = {}) {
  try {
    // Only send events on production
    if (!isProduction()) {
      // eslint-disable-next-line no-console
      console.log(`[GA4 Debug] Event: ${eventName}`, params);
      return;
    }

    if (typeof window !== `undefined` && typeof window.gtag === `function`) {
      window.gtag(`event`, eventName, params);
    }
  } catch (_error) {
    // noop
  }
}

// ==================== BOOKING FUNNEL EVENTS ====================

/**
 * Tracking: форма бронирования открыта
 */
export function trackBookingOpened() {
  sendGaEvent(`booking_opened`, {
    event_category: `booking_funnel`,
    funnel_step: 1,
  });
}

/**
 * Tracking: сервис выбран
 */
export function trackServiceSelected(serviceData) {
  sendGaEvent(`booking_service_selected`, {
    event_category: `booking_funnel`,
    funnel_step: 2,
    service_name: serviceData.serviceName || `unknown`,
    service_id: serviceData.serviceId || `unknown`,
    service_count: serviceData.serviceCount || 1,
  });
}

/**
 * Tracking: работник выбран
 */
export function trackEmployeeSelected(employeeData) {
  sendGaEvent(`booking_employee_selected`, {
    event_category: `booking_funnel`,
    funnel_step: 3,
    selection_type: employeeData.selectionType || `unknown`, // any, specific, multiple
    employee_count: employeeData.employeeCount || 0,
  });
}

/**
 * Tracking: дата выбрана
 */
export function trackDateSelected(dateData) {
  sendGaEvent(`booking_date_selected`, {
    event_category: `booking_funnel`,
    funnel_step: 4,
    selected_date: dateData.date || `unknown`,
    days_from_today: dateData.daysFromToday || 0,
  });
}

/**
 * Tracking: время выбрано
 */
export function trackTimeslotSelected(timeslotData) {
  sendGaEvent(`booking_timeslot_selected`, {
    event_category: `booking_funnel`,
    funnel_step: 5,
    selected_time: timeslotData.time || `unknown`,
  });
}

/**
 * Tracking: форма клиента показана
 */
export function trackCustomerFormShown() {
  sendGaEvent(`booking_customer_form_shown`, {
    event_category: `booking_funnel`,
    funnel_step: 6,
  });
}

/**
 * Tracking: форма отправлена
 */
export function trackBookingSubmitted(bookingData) {
  sendGaEvent(`booking_submitted`, {
    event_category: `booking_funnel`,
    funnel_step: 7,
    service_name: bookingData.serviceName || `unknown`,
    service_count: bookingData.serviceCount || 1,
  });
}

/**
 * Tracking: бронирование успешно
 */
export function trackBookingSuccess(bookingData) {
  sendGaEvent(`booking_completed`, {
    event_category: `booking_funnel`,
    funnel_step: 8,
    booking_id: bookingData.bookingId || `unknown`,
    service_name: bookingData.serviceName || `unknown`,
    total_price: bookingData.totalPrice || 0,
  });
}

/**
 * Tracking: ошибка бронирования
 */
export function trackBookingError(errorData) {
  sendGaEvent(`booking_error`, {
    event_category: `booking_funnel`,
    funnel_step: 9,
    error_message: errorData.errorMessage || `unknown`,
    error_step: errorData.errorStep || `unknown`,
  });
}

/**
 * Tracking: пользователь вернулся назад
 */
export function trackBookingBackStep(stepData) {
  sendGaEvent(`booking_back_step`, {
    event_category: `booking_funnel`,
    from_step: stepData.fromStep || `unknown`,
    to_step: stepData.toStep || `unknown`,
  });
}

/**
 * Tracking: пользователь покинул форму (beforeunload)
 */
export function trackBookingAbandoned(abandonData) {
  sendGaEvent(`booking_abandoned`, {
    event_category: `booking_funnel`,
    last_step: abandonData.lastStep || `unknown`,
    service_selected: abandonData.serviceSelected || false,
  });
}
