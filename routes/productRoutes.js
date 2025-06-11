const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const {check} = require('express-validator');
const { verifyToken}=require ('../middlewares/authJwt');
const {checkRole}=require ('../middlewares/role');

const validateProduct = [
    check('name').not().isEmpty().withMessage('El nombre es obligatorio'),
    check('description').not().isEmpty().withMessage('La descripción es obligatoria'),
    check('price').isFloat({min:0}).withMessage('Precio invalido'),
    check('stock').isInt({ min:0}).withMessage('stock invalido'),
    check('category').not().isEmpty().withMessage('La categoria es obligatoria'),
    check('subcategory').not().isEmpty().withMessage('La subcategoria es obligatoria'),
];

router.post('/',
    verifyToken,
    checkRole('admin','coordinador'),
    validateProduct,productController.createProduct);
router.get('/',
    verifyToken,
    checkRole('admin','coordinador','auxiliar'),
    productController.getProducts);
router.get('/:id',
    verifyToken,
    checkRole('admin','coordinador','auxiliar'),
    productController.getProductById);
router.put('/:id',
    verifyToken,
    checkRole('admin','coordinador'),
    validateProduct, productController.updateProduct);
router.delete('/:id',
    verifyToken,
    checkRole('admin'),
    productController.deleteProduct);

module.exports = router;