const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const { productsCreatedCounter } = require('../utils/metrics');

router.post('/', auth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    
    // DevOps Metric: Track successful product creations
    productsCreatedCounter.inc({ category: product.category });
    
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;