const client = require('prom-client');
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Custom Metric: Gauge for total products in stock
const totalProductsGauge = new client.Gauge({
  name: 'total_products_count',
  help: 'Current number of products in the catalog',
  registers: [register],
});

module.exports = { register, totalProductsGauge };