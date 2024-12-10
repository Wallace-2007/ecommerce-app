import Product from '../models/productModel.js'; // Importando o modelo Product
import fs from 'fs';
import path from 'path';

// Função para listar todos os produtos
export const listProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ success: false, message: 'Erro interno ao listar produtos.', error: error.message });
  }
};

// Função para adicionar um novo produto
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, bestseller, sizes } = req.body;

    // Verificar se todos os campos obrigatórios foram enviados
    if (!name || !description || !price || !category || !subCategory) {
      return res.status(400).json({ success: false, message: 'Campos obrigatórios não fornecidos.' });
    }

    // Criando o novo produto
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      subCategory,
      bestseller: bestseller || false,
      sizes: sizes || [],
      image: [
        req.files.image1 ? req.files.image1[0].path : null,
        req.files.image2 ? req.files.image2[0].path : null,
        req.files.image3 ? req.files.image3[0].path : null,
        req.files.image4 ? req.files.image4[0].path : null,
      ],
    });

    // Salvando o produto no banco de dados
    await newProduct.save();

    res.status(201).json({ success: true, message: 'Produto adicionado com sucesso.' });
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    res.status(500).json({ success: false, message: 'Erro interno ao adicionar produto.', error: error.message });
  }
};

// Função para remover um produto
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    // Verificar se o ID foi fornecido
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID do produto não fornecido.' });
    }

    // Verificar se o produto existe
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
    }

    // Remover as imagens do servidor
    product.image.forEach((imagePath) => {
      if (imagePath) {
        fs.unlinkSync(path.resolve(imagePath)); // Remover as imagens do servidor
      }
    });

    // Remover o produto do banco de dados
    await Product.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Produto removido com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover produto:', error);
    res.status(500).json({ success: false, message: 'Erro interno ao remover produto.', error: error.message });
  }
};

// Função para buscar um único produto (para edição)
export const singleProduct = async (req, res) => {
  try {
    const { id } = req.params; // Pegando o ID da URL

    // Verificar se o ID foi fornecido
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID do produto não fornecido.' });
    }

    // Verificar se o ID é um formato válido (se você estiver usando MongoDB)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: 'ID de produto inválido.' });
    }

    // Buscar o produto pelo ID no banco de dados
    const product = await Product.findById(id);
    
    // Verificar se o produto foi encontrado
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
    }

    // Retornar a resposta com sucesso
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Erro ao buscar produto:', error); // Log de erro detalhado
    res.status(500).json({ success: false, message: 'Erro interno ao buscar produto.', error: error.message });
  }
};

// Função para atualizar um produto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const { name, description, price, category, subCategory, bestseller, sizes } = req.body;

    // Verificar se o ID do produto foi fornecido
    if (!id) {
      return res.status(400).json({ success: false, message: 'ID do produto não fornecido.' });
    }

    // Buscar o produto pelo ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
    }

    // Atualizar os campos
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;
    product.bestseller = bestseller !== undefined ? bestseller : product.bestseller;
    product.sizes = sizes || product.sizes;

    // Atualizar imagens (caso novas imagens tenham sido enviadas)
    if (req.files.image1) product.image[0] = req.files.image1[0].path;
    if (req.files.image2) product.image[1] = req.files.image2[0].path;
    if (req.files.image3) product.image[2] = req.files.image3[0].path;
    if (req.files.image4) product.image[3] = req.files.image4[0].path;

    // Salvar as alterações no banco de dados
    await product.save();

    res.status(200).json({ success: true, message: 'Produto atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ success: false, message: 'Erro interno ao atualizar produto.', error: error.message });
  }
};
