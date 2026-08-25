import React from 'react'
import Camera from '../assets/jeremy-yap-J39X2xX_8CQ-unsplash.jpg'
import SalaCine from '../assets/krists-luhaers-AtPWnYNDJnM-unsplash.jpg'
const Hero = () => {
  return (
    <div>
      <div className="absolute w-screen z-10 h-screen bg-radial-[at_50%_75%] from-transparent to-indigo-900 to-90%"></div>
      <img className='w-screen h-screen z-0' src={SalaCine} alt="" />
      
    </div>
  )
}

export default Hero