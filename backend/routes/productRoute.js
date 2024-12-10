import express from 'express';
import {
  listProduct,
  addProduct,
  removeProduct,
  singleProduct,
  updateProduct, // Nova função
} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Rota para adicionar produto
productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);

// Rota para remover produto
productRouter.post('/remove', adminAuth, removeProduct);

// Rota para buscar um único produto (para edição)
productRouter.get('/single/:id', singleProduct); // Alterado para receber o ID da URL

// Rota para listar produtos
productRouter.get('/list', listProduct);

// Rota para atualizar produto
productRouter.post('/update', adminAuth, updateProduct);

export default productRouter;
