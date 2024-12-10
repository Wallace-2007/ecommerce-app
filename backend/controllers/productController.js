import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// Função para adicionar um produto
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const images = [
            req.files.image1 && req.files.image1[0],
            req.files.image2 && req.files.image2[0],
            req.files.image3 && req.files.image3[0],
            req.files.image4 && req.files.image4[0]
        ].filter(item => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        };

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Produto Adicionado" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Função para listar produtos
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Função para remover um produto
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Produto não encontrado" });
        }

        res.json({ success: true, message: "Produto Removido" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Função para buscar um produto pelo ID
const singleProduct = async (req, res) => {
    try {
        const { id } = req.params; // Captura o ID diretamente da URL
        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Produto não encontrado" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Função para atualizar um produto
const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Lida com o envio de arquivos, se fornecidos
        const images = [
            req.files.image1 && req.files.image1[0],
            req.files.image2 && req.files.image2[0],
            req.files.image3 && req.files.image3[0],
            req.files.image4 && req.files.image4[0]
        ].filter(item => item !== undefined);

        let imagesUrl = [];
        if (images.length > 0) {
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    return result.secure_url;
                })
            );
        }

        // Encontra e atualiza o produto
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            {
                name,
                description,
                category,
                price: Number(price),
                subCategory,
                bestseller: bestseller === "true" ? true : false,
                sizes: JSON.parse(sizes),
                image: imagesUrl.length > 0 ? imagesUrl : undefined,
                date: Date.now()
            },
            { new: true } // Retorna o documento atualizado
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Produto não encontrado" });
        }

        res.json({ success: true, message: "Produto atualizado", product: updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { listProduct, addProduct, removeProduct, singleProduct, updateProduct };
