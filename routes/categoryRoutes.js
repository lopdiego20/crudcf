const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const {verifyToken} = require ('../middlewares/authJwt');
const {checkRole} = require ('../middlewares/role');



router.post('/',
    verifyToken,
    checkRole('adrmin','coordinador'),
    categoryController.createCategory);
router.get('/',
    verifyToken,
    checkRole('admin','coordinador','auxiliar'),
    categoryController.getCategories);
router.get('/:id', 
    verifyToken,
    checkRole('admin','coordinador','auxiliar'),
    categoryController.getCategoryById);
router.put('/:id', 
    verifyToken,
    checkRole ('admin','coordiandor'),
    categoryController.updateCategory);
router.delete('/:id',
    verifyToken,
    checkRole('admin'),
    categoryController.deleteCategory);

module.exports = router;