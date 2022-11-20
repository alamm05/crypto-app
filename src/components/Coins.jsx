
import React from 'react'
import axios from "axios";
import { useEffect,useState } from 'react';
import {server} from "../index";
import { Button, Container, HStack } from '@chakra-ui/react';
import Loader  from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coins = () => {
  const [coins, setCoins] =useState([]);
  const [loading, setLoading]=useState(true);
  const [error,setError]=useState(false)
  const [page,setPage]=useState(1)
  const [currency,setCurrency]=useState("inr")



  const currencySymbol = currency==="inr"?"₹":currency==="eur"?"€":"$s"

  const changePage = (page)=>{
    setPage(page);
    setLoading(true);
  }


  useEffect(()=>{
  const fetchCoins = async()=>{
    
  try{
    const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
  setCoins(data);

  setLoading(false);
  }
  catch(error){
    setError(true);
    setLoading(false);
  }
  };
  fetchCoins();
  },[currency,page]);
  if(error) return <ErrorComponent message={"Error while the fetching Coins"} />
  return (
    <Container maxW={"container.xl"}>{loading? (<Loader />):
    (
      <>
      <HStack wrap={"wrap"}>
        {coins.map((i)=>(
          <CoinCard id={i.id} key={i.id} name={i.name}
          price={i.current_price} img={i.image} symbol={i.symbol} currencySymbol={currencySymbol} />
        ))}
      </HStack>

      <HStack>
        <Button bgColor={"blackAlpha.900"} color={"white"} onClick={()=>changePage(2)}>
        2
        </Button>
      </HStack>
      </>
    )}
    </Container>
  );
};



export default Coins