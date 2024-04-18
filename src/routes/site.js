const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
router.get('/xac-nhan-dat-hang', siteController.getOrder);
router.post('/dat-hang', siteController.order);
router.put('/admin/quan-ly-don-hang/:id', siteController.updateOrder);
router.delete('/admin/quan-ly-don-hang/:id', siteController.deleteOrder);
router.get('/admin/quan-ly-don-hang', siteController.getListOrder);
router.get('/', siteController.home);

module.exports = router;
