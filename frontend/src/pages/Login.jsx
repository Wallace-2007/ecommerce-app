import React, { useContext, useEffect, useState } from 'react'; 
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });

        if (response.data && response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Cadastro realizado com sucesso!');
        } else {
          // Tratamento para mensagens de erro específicas
          if (response.data && response.data.message) {
            if (response.data.message.includes('already exists')) {
              toast.error('Este email já está cadastrado. Por favor, faça login.');
            } else {
              toast.error(response.data.message || 'Erro ao cadastrar usuário.');
            }
          } else {
            toast.error('Erro desconhecido ao cadastrar usuário.');
          }
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });

        if (response.data && response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Login realizado com sucesso!');
        } else {
          toast.error(response.data.message || 'Credenciais inválidas.');
        }
      }
    } catch (error) {
      console.error('Erro no processamento:', error);
      const backendErrorMessage = error.response?.data?.message;
      const statusCode = error.response?.status;

      if (backendErrorMessage) {
        toast.error(`Erro: ${backendErrorMessage}`);
      } else if (statusCode) {
        toast.error(`Erro no servidor: Código ${statusCode}`);
      } else {
        toast.error('Erro ao processar a solicitação. Verifique sua conexão.');
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Nome' required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Senha' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Esqueceu sua senha?</p>
        {
          currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Criar conta</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Faça login</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Faça seu login' : 'Cadastre-se'}</button>
    </form>
  );
};

export default Login;
