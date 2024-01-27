import React from "react";
import ReactDOM from "react-dom/client";
import {WagmiConfig, configureChains, createClient, mainnet} from "wagmi"
import {publicProvider} from "wagmi/providers/public"
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

const {provider,webSocketProvider}=configureChains(
  [mainnet],
  [publicProvider()]
)
const wagmiClient=createClient({
  autoConnect:true,
  provider,
  webSocketProvider
})

const client = ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode>
   <WagmiConfig client={wagmiClient} >
    <Router>
      <App />
    </Router>
    </WagmiConfig>
  </React.StrictMode>
);
