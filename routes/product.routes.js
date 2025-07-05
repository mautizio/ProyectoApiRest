const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');

router.use(auth);

router.get('/', productCtrl.getAll);
router.get('/:id', productCtrl.getOne);
router.post('/', role('admin'), productCtrl.create);
router.put('/:id', role('admin'), productCtrl.update);
router.delete('/:id', role('admin'), productCtrl.delete);

module.exports = router;
