import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/> 
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam quaerat sapiente at perferendis ea quibusdam libero iste, labore sint architecto exercitationem cupiditate! Ex reprehenderit maxime voluptatibus voluptas accusamus explicabo. Quod?</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque unde sed quos suscipit dolore alias error adipisci tenetur. Voluptate, quas! Quos rerum officiis libero exercitationem dignissimos numquam voluptas? Asperiores, ab!</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et iste inventore, laudantium esse vero commodi autem iure fugiat corporis, totam harum quibusdam nobis eveniet voluptas maxime illo sint consectetur cum.</p>
        </div>
      </div>
      
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
           <b>Quality Assurance:</b>
           <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, exercitationem facilis? Veritatis mollitia et soluta recusandae fuga, sunt iste ab fugit dolores harum obcaecati sed blanditiis inventore eos quidem vitae?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
           <b>Convenience:</b>
           <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, exercitationem facilis? Veritatis mollitia et soluta recusandae fuga, sunt iste ab fugit dolores harum obcaecati sed blanditiis inventore eos quidem vitae?</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
           <b>Exception Customer Service:</b>
           <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, exercitationem facilis? Veritatis mollitia et soluta recusandae fuga, sunt iste ab fugit dolores harum obcaecati sed blanditiis inventore eos quidem vitae?</p>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default About
