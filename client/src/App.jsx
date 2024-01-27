import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Swap from "./components/Swap"
import Token from "./components/Token"
import "./App.css"
import {useConnect,useAccount} from "wagmi"
import {metaMask} from "@wagmi/connectors"

function App() {
  const {address,isConnected}=useAccount()
  const {connectors,connect}=useConnect()


  return (
    <div className='gradient-bg-footer w-full h-dvh'>
      <Header connect={connect} isConnected={isConnected} address={address}  />
      <Routes>
        <Route path="/" element={<Swap isConnected={isConnected} address={address} />}/>
        <Route path="/tokens" element={<Token />} />
      </Routes>
    </div>
  )
}

export default App
