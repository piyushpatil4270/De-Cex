const express =require("express")
const Moralis=require("moralis").default

const App=express()
const port=8000
const cors=require("cors")

App.use(cors())
App.use(express.json())

App.get("/tokenprices",async(req,res)=>{
 const {query}=req
 const responseOne=await Moralis.EvmApi.token.getTokenPrice({
    address:query.addressOne
 })
 const responseTwo=await Moralis.EvmApi.token.getTokenPrice({
    address:query.addressTwo
 })

 const usdPrice={
   tokenOne:responseOne.raw.usdPrice,
   tokenTwo:responseTwo.raw.usdPrice,
   ratio:responseOne.raw.usdPrice/responseTwo.raw.usdPrice
 }
 res.status(202).json(usdPrice)
})


Moralis.start({
    apiKey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjRiZTMxZmE1LTY3YjMtNGJjNS1hNTJiLTFiMDU5NDBlYTE3NiIsIm9yZ0lkIjoiMzczMzQxIiwidXNlcklkIjoiMzgzNjg0IiwidHlwZUlkIjoiZmUzZWEzNDEtOTVmYS00MzEyLTkyZTktZjI1MzM3MGY5NTJiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDU3NTAwMzksImV4cCI6NDg2MTUxMDAzOX0.YrOLHlvJ0GKrfnCYMFw2o2PeWJXSKogvFvrGKTwscXw"
}).then(()=>{
    App.listen(port,()=>console.log(`Server started on port ${port}`))
})
