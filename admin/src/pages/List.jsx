import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  // Função para buscar a lista de produtos
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Função para remover produto
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Recarrega a lista de produtos
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Função para redirecionar para a página de edição
  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Redireciona para a página de edição com o ID do produto
  };

  useEffect(() => {
    fetchList(); // Carrega a lista de produtos assim que o componente for montado
  }, []);

  return (
    <>
      <p className="mb-2">Lista de produtos</p>
      <div className="flex flex-col gap-2">
        {/* Cabeçalho da tabela */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Imagem</b>
          <b>Nome</b>
          <b>Categoria</b>
          <b>Preço</b>
          <b className="text-center">Ação</b>
        </div>

        {/* Lista de produtos */}
        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <img className="w-12" src={item.image[0]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <div className="text-right md:text-center">
              
              <button
                onClick={() => removeProduct(item._id)} // Remover produto
                className="text-red-500"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
