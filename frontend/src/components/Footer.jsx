import React from 'react';
import { FaInstagram } from 'react-icons/fa'; // Importa o ícone do Instagram
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="Logo da Joyce Galvão Modas" />
          <p className='w-full md:w-2/3 text-gray-600'>
            Comprometidos em oferecer moda de qualidade e um atendimento excepcional, a Joyce Galvão Modas é a escolha ideal para quem busca estilo e autenticidade. Descubra nossa coleção e sinta a diferença de se vestir bem.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANHIA</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>Sobre</li>
            <li>Delivery</li>
            <li>Políticas de privacidade</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>ENTRE EM CONTATO</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+55-12-97812-4430</li>
            <li>joycegalvao@gmail.com</li>
            
          </ul>
          <div className='mt-3'>
            <a 
              href="https://instagram.com/seu_perfil_loja" 
              target="_blank" 
              rel="noopener noreferrer"
              className='flex items-center gap-2 text-gray-600 hover:text-black'
            >
              <FaInstagram className='w-5 h-5' /> {/* Ícone do Instagram */}
              Siga-nos no Instagram
            </a>
          </div>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'> Copyright 2024@ joycegalvao.com - Todos os Direitos Reservados
        </p>
      </div>

    </div>
  );
}

export default Footer;
