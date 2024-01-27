import React, { useEffect, useState } from "react";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Input, Modal } from "antd";
import TokenList from "../tokenList.json";
import axios from "axios";
import {useSendTransaction,useWaitForTransaction} from "wagmi"
const Swap = (props) => {
  const [tokenOneAmount, setTokenOneAmount] = useState(0);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(0);
  const changeAmount = (e) => {
    setTokenOneAmount(e.target.value);
    if (e.target.value && prices) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2));
    } else {
      setTokenTwoAmount(null);
    }
  };
  const {address,isConnected}=props
  const [tokenOne, setTokenOne] = useState(TokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(TokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);
  const [txDetails,setTxDetails]=useState({
    to:null,
    data:null,
    value:null
  })
  const {data,sendTransaction}=useSendTransaction({
    request:{
      from:address,
      to:String(txDetails.to),
      data:String(txDetails.data),
      value:String(txDetails.value)
    }
  })

  const switchTokens = () => {
    setPrices(null);
    setTokenOneAmount(0);
    setTokenTwoAmount(0);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenTwo(one);
    setTokenOne(two);
    fetchPrices(one.address, two.address);
  };
  const openModal = (asset) => {
    setChangeToken(asset);
    setIsOpen(true);
  };
  const modifyToken = (i) => {
    setPrices(null);
    setTokenOneAmount(0);
    setTokenTwoAmount(0);
    if (changeToken == 1) {
      setTokenOne(TokenList[i]);
      fetchPrices(TokenList[i].address, tokenTwo.address);
    } else {
      setTokenTwo(TokenList[i]);
    }
    setIsOpen(false);
  };
  const fetchPrices = async (one, two) => {
    const res = await axios.get("http://localhost:8000/tokenprices", {
      params: { addressOne: one, addressTwo: two },
    });
    console.log(res.data);
    setPrices(res.data);
  };

  const fetchSwap=async()=>{
    
  }

  useEffect(() => {
    fetchPrices(TokenList[0].address, TokenList[1].address);
  }, []);

  useEffect(()=>{
    if(txDetails.to && isConnected){
      sendTransaction()
    }
  },[txDetails])

  return (
    <>
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a Token"
      >
        <div className="modalContent">
          {TokenList?.map((token, i) => (
            <div
              className="tokenChoice"
              key={i}
              onClick={() => {
                modifyToken(i);
              }}
            >
              <img src={token.img} alt={token.ticker} className="tokenLogo" />
              <div className="tokenChoiceNames">
                <div className="tokenName">{token.name}</div>
                <div className="tokenTicker">{token.ticker}</div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <div className="bg-transparent flex flex-col justify-center items-center h-[calc(100%-10rem)] ">
        <div className="tradeBox">
          <div className="tradeBoxHeader my-2">
            <span className="font-medium text-white text-[18px]">Swap</span>
            <SettingOutlined className="cog" />
          </div>
          <div className="inputs">
            <Input
              placeholder={tokenOneAmount}
              onChange={changeAmount}
              className="my-1"
            />
            <Input
              placeholder={tokenTwoAmount}
              disabled={true}
              className="my-1"
            />
            <div className="switchButton" onClick={switchTokens}>
              <ArrowDownOutlined className="switchArrow" />
            </div>
            <div className="assetOne" onClick={() => openModal(1)}>
              <img src={tokenOne.img} alt="tokenOneimg" className="assetLogo" />
              {tokenOne.ticker}
              <DownOutlined />
            </div>
            <div className="assetTwo" onClick={() => openModal(2)}>
              <img src={tokenTwo.img} alt="tokenOneimg" className="assetLogo" />
              {tokenTwo.ticker}
              <DownOutlined />
            </div>
          </div>
          <div className="swapButton cursor-pointer" disabled={!tokenOneAmount || !isConnected}>
            Swap
          </div>
        </div>
      </div>
    </>
  );
};

export default Swap;
