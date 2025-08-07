export const measurePerformance = () => {
  if (typeof window === `undefined`) return;

  window.addEventListener(`load`, () => {
    const navigationEntry = performance.getEntriesByType(`navigation`)[0];

    if (navigationEntry) {
      const loadTime = navigationEntry.loadEventEnd - navigationEntry.fetchStart;
      const domContentLoaded = navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart;

      console.group(`🚀 Performance Metrics`);
      console.log(`Page Load Time: ${Math.round(loadTime)}ms`);
      console.log(`DOM Content Loaded: ${Math.round(domContentLoaded)}ms`);
      console.groupEnd();
    }

    const paintEntries = performance.getEntriesByType(`paint`);
    const firstPaint = paintEntries.find(entry => entry.name === `first-paint`);
    const firstContentfulPaint = paintEntries.find(entry => entry.name === `first-contentful-paint`);

    if (firstPaint || firstContentfulPaint) {
      console.group(`🎨 Paint Metrics`);
      if (firstPaint) console.log(`First Paint: ${Math.round(firstPaint.startTime)}ms`);
      if (firstContentfulPaint) console.log(`First Contentful Paint: ${Math.round(firstContentfulPaint.startTime)}ms`);
      console.groupEnd();
    }
  });

  // LCP Observer
  if (`PerformanceObserver` in window) {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log(`🎯 Largest Contentful Paint: ${Math.round(lastEntry.startTime)}ms`);
    });
    lcpObserver.observe({ entryTypes: [`largest-contentful-paint`] });

    // CLS Observer
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries();

      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });

      if (clsValue > 0) {
        console.log(`📏 Cumulative Layout Shift: ${clsValue.toFixed(4)}`);
      }
    });
    clsObserver.observe({ entryTypes: [`layout-shift`] });

    const inpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const inputDelay = entry.processingStart - entry.startTime;
        const processingTime = entry.processingEnd - entry.processingStart;
        const presentationDelay = entry.startTime + entry.duration - entry.processingEnd;

        console.log(`⚡ Interaction to Next Paint (INP): ${Math.round(entry.duration)}ms`);
        console.log(`   Input delay: ${Math.round(inputDelay)}ms`);
        console.log(`   Processing time: ${Math.round(processingTime)}ms`);
        console.log(`   Presentation delay: ${Math.round(presentationDelay)}ms`);
      });
    });

    try {
      inpObserver.observe({ entryTypes: [`event`] });
    } catch (err) {
      console.log(`Event timing not supported in this browser`);
    }
  }
};

export const measureResourceTiming = () => {
  if (typeof window === `undefined`) return;

  window.addEventListener(`load`, () => {
    const resources = performance.getEntriesByType(`resource`);
    const slowResources = resources
      .filter(resource => resource.duration > 1000)
      .sort((a, b) => b.duration - a.duration);

    if (slowResources.length > 0) {
      console.group(`⚠️ Slow Resources (>1s)`);
      slowResources.forEach(resource => {
        console.log(`${resource.name}: ${Math.round(resource.duration)}ms`);
      });
      console.groupEnd();
    }
  });
};

export const reportBundle = () => {
  if (typeof window === `undefined` || process.env.NODE_ENV !== `development`) return;

  const scripts = Array.from(document.querySelectorAll(`script[src]`));
  const totalSize = scripts.reduce((total, script) => {
    const size = script.getAttribute(`data-size`) || 0;
    return total + parseInt(size, 10);
  }, 0);

  if (totalSize > 0) {
    console.log(`📦 Estimated Bundle Size: ${(totalSize / 1024).toFixed(2)}KB`);
  }
};