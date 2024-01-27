import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { http, createConfig } from "wagmi";
import "./index.css";
import { mainnet } from "wagmi/chains";
import { WagmiProvider } from "wagmi";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import {metaMask} from "@wagmi/connectors";

const config = createConfig({
  chains: [mainnet],
  connectors:[
   metaMask()
  ],
  transports: {
    [mainnet.id]:http(),
  },
});
const queryClient=new QueryClient()
const client = ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
    <Router>
      <App />
    </Router>
    </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
