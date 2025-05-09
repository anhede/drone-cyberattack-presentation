// graph.js

// Ensure Chart.js and Reveal.js are loaded before this script is run

// Keep track of which charts have been rendered by their canvas IDs
const renderedCharts = new Set();

// On each slide change, look for canvases with the "chart" class in the current slide
Reveal.on('slidechanged', function(event) {
  const currentSlide = event.currentSlide;
  const canvases = currentSlide.querySelectorAll('canvas.chart');

  canvases.forEach(canvas => {
    const id = canvas.id;
    // Only render if we have an ID, haven't already rendered it, and have config for it
    if (id && !renderedCharts.has(id) && window.chartConfigs && window.chartConfigs[id]) {
      const ctx = canvas.getContext('2d');
      const config = window.chartConfigs[id];
      new Chart(ctx, config);
      renderedCharts.add(id);
    }
  });
});
