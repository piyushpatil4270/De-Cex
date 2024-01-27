import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Swap from "./components/Swap"
import Token from "./components/Token"
import "./App.css"
import {useConnect,useAccount} from "wagmi"
import {metaMask} from "@wagmi/connectors"

function App() {
  const {address,isConnected}=useAccount()
  const {}=useConnect({
   
  })


  return (
    <div className='gradient-bg-footer w-full h-dvh'>
      <Header/>
      <Routes>
        <Route path="/" Component={Swap}/>
        <Route path="/tokens" Component={Token} />
      </Routes>
    </div>
  )
}

export default App
