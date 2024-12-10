import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Edit = ({ token }) => {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // Função para buscar os dados do produto
  const fetchProduct = async () => {
    try {
      if (!id) {
        toast.error('ID do produto não encontrado!');
        return;
      }

      const response = await axios.get(`${backendUrl}/api/product/single/${id}`, {
        headers: { token },
      });
    
      if (response.data.success) {
        const product = response.data.product;
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setSubCategory(product.subCategory);
        setBestseller(product.bestseller);
        setSizes(product.sizes);
    
        setImage1(product.image[0] || null);
        setImage2(product.image[1] || null);
        setImage3(product.image[2] || null);
        setImage4(product.image[3] || null);
      } else {
        toast.error(response.data.message || 'Erro ao buscar produto');
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      toast.error('Erro ao buscar produto');
    } finally {
      setIsLoading(false);
    }
  };

  // Função de envio dos dados
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
formData.append('name', name);
formData.append('description', description);
formData.append('price', price);
formData.append('category', category);
formData.append('subCategory', subCategory);
formData.append('bestseller', bestseller);
formData.append('sizes', JSON.stringify(sizes)); // Enviar como string JSON

// Adicionando imagens
if (image1) formData.append('image1', image1);
if (image2) formData.append('image2', image2);
if (image3) formData.append('image3', image3);
if (image4) formData.append('image4', image4);

try {
  const response = await axios.post(
    `${backendUrl}/api/product/update/${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        token, // Enviar token no cabeçalho
      },
    }
  );

  if (response.data.success) {
    toast.success('Produto atualizado com sucesso!');
    navigate('/list');
  } else {
    toast.error(response.data.message || 'Erro ao atualizar produto');
  }
} catch (error) {
  console.error('Erro ao enviar dados:', error);
  toast.error(error.response?.data?.message || 'Erro ao atualizar produto');
}
  };
  
  
  
  

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <p>Carregando produto...</p>;
  }

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Editar Produto</h1>
      <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
        <div>
          <p className="mb-2">Upload de Imagens</p>
          <div className="flex gap-2">
            <label htmlFor="image1">
              <img
                className="w-20"
                src={image1 ? (image1 instanceof Blob ? URL.createObjectURL(image1) : image1) : assets.upload_area}
                alt="Imagem 1"
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2">
              <img
                className="w-20"
                src={image2 ? (image2 instanceof Blob ? URL.createObjectURL(image2) : image2) : assets.upload_area}
                alt="Imagem 2"
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>
            <label htmlFor="image3">
              <img
                className="w-20"
                src={image3 ? (image3 instanceof Blob ? URL.createObjectURL(image3) : image3) : assets.upload_area}
                alt="Imagem 3"
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>
            <label htmlFor="image4">
              <img
                className="w-20"
                src={image4 ? (image4 instanceof Blob ? URL.createObjectURL(image4) : image4) : assets.upload_area}
                alt="Imagem 4"
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
        </div>

        <div className="w-full">
          <p className="mb-2">Nome do produto</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Digite aqui"
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-2">Descrição do produto</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full max-w-[500px] px-3 py-2"
            placeholder="Escreva a descrição aqui"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Categoria do Produto</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2"
              value={category}
            >
              <option value="Men">Homem</option>
              <option value="Women">Mulher</option>
              <option value="Kids">Infantil</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Subcategoria</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3 py-2"
              value={subCategory}
            >
              <option value="Topwear">Roupas de Cima</option>
              <option value="Bottomwear">Roupas de Baixo</option>
              <option value="Winterwear">Roupa de Inverno</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Preço do produto</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="number"
              placeholder="25"
            />
          </div>
        </div>

        <div>
          <p className="mb-2">Tamanhos do produto</p>
          <div className="flex gap-3">
            <div onClick={() => setSizes((prev) => prev.includes('S') ? prev.filter((item) => item !== 'S') : [...prev, 'S'])}>
              <p className={`${sizes.includes('S') ? 'bg-pink-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>P</p>
            </div>
            <div onClick={() => setSizes((prev) => prev.includes('M') ? prev.filter((item) => item !== 'M') : [...prev, 'M'])}>
              <p className={`${sizes.includes('M') ? 'bg-pink-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
            </div>
            <div onClick={() => setSizes((prev) => prev.includes('L') ? prev.filter((item) => item !== 'L') : [...prev, 'L'])}>
              <p className={`${sizes.includes('L') ? 'bg-pink-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>G</p>
            </div>
            <div onClick={() => setSizes((prev) => prev.includes('XL') ? prev.filter((item) => item !== 'XL') : [...prev, 'XL'])}>
              <p className={`${sizes.includes('XL') ? 'bg-pink-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XG</p>
            </div>
            <div onClick={() => setSizes((prev) => prev.includes('XXL') ? prev.filter((item) => item !== 'XXL') : [...prev, 'XXL'])}>
              <p className={`${sizes.includes('XXL') ? 'bg-pink-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XXG</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
          <label className="cursor-pointer" htmlFor="bestseller">Adicionar ao Bestseller</label>
        </div>

        <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default Edit;


