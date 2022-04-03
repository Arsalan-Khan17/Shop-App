const path = require('path');

const express = require('express');

const AdminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', AdminController.getAddProduct);
router.get('/products', AdminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', AdminController.postAddProduct);

module.exports = router;
