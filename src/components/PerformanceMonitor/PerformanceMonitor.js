'use client';

import { useEffect } from 'react';
import { reportWebVitals } from '@/app/web-vitals';
import { measurePerformance, measureResourceTiming } from '@/utils/performance';

export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      reportWebVitals();
      measurePerformance();
      measureResourceTiming();
    }
  }, []);

  return null;
}