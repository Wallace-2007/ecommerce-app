import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="" />
          <p className='w-full md:w-2/3 tetx-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo distinctio ab ipsum quis doloribus sequi aliquid dolore numquam qui recusandae accusantium unde, aliquam culpa praesentium sunt fuga porro eius facilis.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+55-12-97812-4430</li>
            <li>valasebd@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'> Copyright 2024@ valasebd.com - Todos os Direitos Reservados
        </p>
      </div>

    </div>
  )
}

export default Footer
