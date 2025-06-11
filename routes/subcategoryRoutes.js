const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const { check } = require('express-validator');
const {verifyToken}=require ('../middlewares/authJwt');
const {checkRole}=require('../middlewares/role');

//validaciones 
const validateSubcategory = [
    check('name').not().isEmpty().withMessage('El nombre es obligatorio'),
    check('descripcion').not().isEmpty().withMessage('La descripcion es obligatoria'),
    check('category').not().isEmpty().withMessage('La categotia es obligatoria')
];
//Rutas
router.post('/', 
    verifyToken,
    checkRole('admin','coordinador'),
    validateSubcategory, subcategoryController.createSubcategory);
router.get('/',
    verifyToken,
    checkRole('admnin','coordinador','auxiliar'), 
    subcategoryController.getSubcategories);
router.get('/:id', 
    verifyToken,
    checkRole('admin','coordinador','auxiliar'),
    subcategoryController.getSubcategoryById);
router.put('/:id', 
    verifyToken,
    checkRole('admin','coordinador'),
    validateSubcategory, subcategoryController.updateSubcategory);
router.delete('/:id',
    verifyToken,
    checkRole('admin'),
    subcategoryController.deleteSubcategory);

module.exports = router;