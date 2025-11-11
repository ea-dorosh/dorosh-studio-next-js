"use client";

import { useEffect } from 'react';
import { trackPhoneClick } from '@/lib/gtm';

/**
 * Глобальный обработчик кликов по телефонным ссылкам
 * Отслеживает все клики на ссылки с href="tel:" без изменения Server Components
 */
export default function PhoneTrackingHandler() {
  useEffect(() => {
    const handlePhoneClick = (event) => {
      const target = event.target.closest(`a[href^="tel:"]`);

      if (target) {
        // Отслеживаем клик на телефонную ссылку
        trackPhoneClick();
      }
    };

    // Добавляем обработчик на document для всех кликов
    document.addEventListener(`click`, handlePhoneClick);

    // Очищаем обработчик при размонтировании
    return () => {
      document.removeEventListener(`click`, handlePhoneClick);
    };
  }, []);

  // Компонент не рендерит ничего видимого
  return null;
}
