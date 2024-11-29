import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'SOBRE'} text2={'NÓS'}/> 
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Joyce Galvão Modas é a loja perfeita para quem busca estilo, qualidade e tendências em um só lugar. Com uma ampla variedade de roupas e acessórios, a loja oferece peças cuidadosamente selecionadas para atender a todos os gostos e ocasiões. Cada detalhe é pensado para garantir a satisfação dos clientes, desde o atendimento até a entrega de produtos modernos e exclusivos.</p>
          <p>Além disso, a Joyce Galvão Modas se destaca pela constante atualização em novas coleções e pelo compromisso com preços acessíveis. Seja para renovar o guarda-roupa ou encontrar o look ideal, a loja é referência em moda com personalidade e autenticidade. Escolha Joyce Galvão Modas e descubra o prazer de se vestir bem!</p>
          <b className='text-gray-800'>Nossa Missão</b>
          <p>Nossa missão é inspirar confiança e estilo, oferecendo roupas e acessórios que valorizam a individualidade de cada cliente. Trabalhamos com dedicação para proporcionar experiências de compra únicas, combinando qualidade, inovação e tendências do mundo da moda.</p>
        </div>
      </div>
      
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
           <b>Garantia de Qualidade:</b>
           <p className='text-gray-600'>Trabalhamos continuamente para garantir que todos os nossos produtos atendam aos mais altos padrões de qualidade. Cada peça é cuidadosamente verificada para oferecer durabilidade, conforto e satisfação aos nossos clientes.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
           <b>Conveniência:</b>
           <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, exercitationem facilis? Veritatis mollitia et soluta recusandae fuga, sunt iste ab fugit dolores harum obcaecati sed blanditiis inventore eos quidem vitae?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
           <b>Atendimento ao Cliente Excepcional:</b>
           <p className='text-gray-600'>Nosso compromisso é atender com excelência, colocando as necessidades dos clientes em primeiro lugar. Oferecemos suporte dedicado para garantir uma experiência de compra agradável e personalizada.</p>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default About
