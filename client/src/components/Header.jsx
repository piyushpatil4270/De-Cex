import React from 'react'
import Logo from "../assets/moralis-logo.svg"
import ETH from "../assets/eth.svg"
import { Link } from 'react-router-dom'


const Header = (props) => {
  const {address,isConnected,connect}=props
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
    <div className='text-[#03050a] text-[18px] font-semibold py-1 px-2 bg-[#5694f0e8] rounded-full flex justify-center items-center cursor-pointer'  onClick={connect}>
    {isConnected?address.slice(0,5)+"...":"Connect"} 
    </div>
    </div>
    </div>
  )
}

export default Header
