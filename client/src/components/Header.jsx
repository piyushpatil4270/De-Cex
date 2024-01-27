import React from 'react'
import Logo from "../assets/moralis-logo.svg"
import ETH from "../assets/eth.svg"
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <div className='flex justify-between items-center gap-[40px] px-10 h-[70px] w-full py-5 z-0'>
      <div className='flex justify-center items-center gap-[30px]'>
    <img src={Logo} alt="Logo.img" className='bg-transparent w-[40px] h-[40px]' />
    <Link to="/tokens">
    <span className='text-[18px] text-white '>Token</span>
    </Link>
    <Link to="/">
    <span className='text-[18px] text-white'>Swap</span>
    </Link>
    </div>
    <div className='flex justify-center items-center gap-[30px]'>
    <div className='flex justify-start items-center gap-2'>
    <img src={ETH} alt="" className='w-[20px] h-[20px]' />
    <span className='text-[18px] text-white '>Ethereum</span>
    </div>
    <div className='text-[#1a264a] text-[18px] font-semibold py-1 px-2 bg-[#a4c8ff94] rounded-full flex justify-center items-center'>
    Connect   
    </div>
    </div>
    </div>
  )
}

export default Header
