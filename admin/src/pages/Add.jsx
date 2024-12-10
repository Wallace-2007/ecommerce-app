import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleImageChange = (index, file) => {
    setImages(prev => {
      const newImages = [...prev];
      newImages[index] = file;
      return newImages;
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((image, index) => {
        if (image) formData.append(`image${index + 1}`, image);
      });

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setPrice('');
        setImages([null, null, null, null]);
        setBestseller(false);
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload de Imagem</p>
        <div className='flex gap-2'>
          {images.map((image, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img className='w-20' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
              <input
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Nome do produto</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='w-full max-w-[500px] px-3 py-2'
          type="text"
          placeholder='Nome do Produto'
          required
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Descrição do produto</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='w-full max-w-[500px] px-3 py-2'
          placeholder='Descrição do produto'
          required
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Categoria do Produto</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className='w-full px-3 py-2'
          >
            <option value="Men">Homem</option>
            <option value="Women">Mulher</option>
            <option value="Kids">Infantil</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub categoria</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className='w-full px-3 py-2'
          >
            <option value="Topwear">Roupas de cima</option>
            <option value="Bottomwear">Roupas de baixo</option>
            <option value="Winterwear">Roupa de inverno</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Preço do produto</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className='w-full px-3 py-2 sm:w-[120px]'
            type="number"
            placeholder='25'
          />
        </div>
      </div>

      <div>
        <p className='mb-2'>Tamanhos do produto</p>
        <div className='flex gap-3'>
          {['P', 'M', 'G', 'XG', 'XXG'].map((size) => (
            <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
              <p className={`${sizes.includes(size) ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input
          onChange={() => setBestseller(prev => !prev)}
          checked={bestseller}
          type="checkbox"
          id='bestseller'
        />
        <label className='cursor-pointer' htmlFor="bestseller">Adicionar ao Bestseller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>Adicionar</button>
    </form>
  );
};

export default Add;
