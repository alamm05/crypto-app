import { Container,Box,Text, RadioGroup, HStack, Radio, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect} from 'react';
import Loader from './Loader';
import {useParams} from "react-router-dom";
import axios from 'axios';
import { server } from '../index';
import ErrorComponent from './ErrorComponent';


const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading,setLoading] = useState(true);
  const [error,setError] =useState(false);
  const [currency, setCurrency] = useState("inr");

  const params = useParams();

  useEffect(()=>{
    const fetchCoin = async()=>{
      
    try{
      const {data} = await axios.get(`${server}/coins/${params.id}`)
    
      setCoin(data);
  
    setLoading(false);
    }
    catch(error){
      setError(true);
      setLoading(false);
    }
    };
    fetchCoin();
    },[params.id]);
    if (error) return <ErrorComponent message={"Error while Fetching coin"} />
  return (
    <Container maxW={"container.xl"}>
    {
      loading ? (
        <Loader />
      ):(
        <>
        <Box width={"full"} borderWidth={1}>
          astha

        </Box>
        <RadioGroup value={currency} onChange={setCurrency}>
        <HStack spacing={"4"}>
          <Radio value={"inr"}>₹</Radio>
          <Radio value={"usd"}>$</Radio>
          <Radio value={"eur"}>€</Radio>
        </HStack>
      </RadioGroup>

      <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
        <Text fontSize={"small"} alignSelf="center" opacity={"0.7"}>
          Last Update On {Date().split("G")[0]}
        </Text>

      </VStack>
        </>
      )
    }
    </Container>
  );
};

export default CoinDetails