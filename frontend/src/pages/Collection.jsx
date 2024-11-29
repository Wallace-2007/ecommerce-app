import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(products); // Inicializa com todos os produtos
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Função para alternar categoria
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Função para alternar subcategoria
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Função para aplicar filtros
  const applyFilters = () => {
    let filteredProducts = [...products]; // Cria uma cópia dos produtos

    // Filtragem por pesquisa
    if (showSearch && search) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtragem por categoria
    if (category.length > 0) {
      filteredProducts = filteredProducts.filter((item) => category.includes(item.category));
    }

    // Filtragem por subcategoria
    if (subCategory.length > 0) {
      filteredProducts = filteredProducts.filter((item) => subCategory.includes(item.subCategory));
    }

    // Ordenação
    if (sortType === 'low-high') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filteredProducts); // Atualiza os produtos filtrados
  };

  // useEffect para aplicar filtros e ordenação
  useEffect(() => {
    applyFilters();
  }, [category, subCategory, search, showSearch, products, sortType]); // Dependências atualizadas

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filtros */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTROS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Filtro de Categoria */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIAS</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value='Men' onChange={toggleCategory} />Homem
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value='Women' onChange={toggleCategory} />Mulher
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value='Kids' onChange={toggleCategory} />Infantil
            </p>
          </div>
        </div>
        {/* Filtro de SubCategoria */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TIPOS</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value='Topwear' onChange={toggleSubCategory} />Roupas de cima
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value='Bottomwear' onChange={toggleSubCategory} />Roupas de baixo
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value='Winterwear' onChange={toggleSubCategory} />Roupas de inverno
            </p>
          </div>
        </div>
      </div>

      {/* Produtos */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1='NOSSAS' text2='COLEÇÕES' />
          {/* Ordenação */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value='relevant'>Ordenar por: Relevância</option>
            <option value='low-high'>Ordenar por: Do menor ao maior preço</option>
            <option value='high-low'>Ordenar por: Do maior ao menor preço</option>
          </select>
        </div>

        {/* Renderização dos Produtos Filtrados */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          ) : (
            <p className='text-center'>Produtos não encontrados.</p> // Mensagem se não houver produtos
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
