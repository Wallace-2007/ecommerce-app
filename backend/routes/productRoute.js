import express from 'express';
import { listProduct, addProduct, removeProduct, singleProduct, updateProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Rota para buscar um produto pelo ID
productRouter.get('/single/:id', singleProduct);

// Rota para adicionar um novo produto
productRouter.post('/add', adminAuth, upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]), addProduct);

// Rota para listar todos os produtos
productRouter.get('/list', listProduct);

// Rota para remover um produto pelo ID
productRouter.delete('/remove/:id', adminAuth, removeProduct);

// Rota para atualizar um produto
productRouter.put('/update/:id', adminAuth, upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]), updateProduct);

export default productRouter;
