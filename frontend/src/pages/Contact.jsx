import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  const handleWhatsAppClick = () => {
    const phone = "5512978124430"; // Número com código do país
    const message = encodeURIComponent("Olá, tudo bem? Gostaria de saber sobre uma roupa em específico!");
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;

    window.open(whatsappLink, '_blank'); // Abre o WhatsApp em uma nova aba
  };

  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'NOSSO'} text2={'CONTATO'} />
      </div>
      
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Nossa loja</p>
          <p className='text-gray-500'>Av. Monumental Papa João Paulo II <br/> Aparecida 174, São Paulo, BRA</p>
          <p className='text-gray-500'>Tel: (12) 3125-4622 <br/> Email: joycegalvao@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Tem alguma sugestão?</p>
          <p className='text-gray-500'>Clique abaixo e fale sobre!</p>
          <button 
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'
            onClick={handleWhatsAppClick}
          >
            Contate-nos
          </button>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  );
};

export default Contact;