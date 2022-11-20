import React from 'react'
import axios from "axios";
import { useEffect,useState } from 'react';
import {server} from "../index";
import { Container, HStack, VStack,Text,Heading,Image } from '@chakra-ui/react';
import Loader  from './Loader';
import ErrorComponent from './ErrorComponent';

const Exchanges = () => {
  const [exchanges, setExchages] =useState([]);
  const [loading, setLoading]=useState(true);
  const [error,setError]=useState(false)

  useEffect(()=>{
  const fetchExchanges = async()=>{
  try{
    const {data} = await axios.get(`${server}/exchanges`)
  setExchages(data);
  setLoading(false);
  }
  catch(error){
    setError(true);
    setLoading(false);
  }
  };
  fetchExchanges();
  },[]);
  if(error) return <ErrorComponent message={"Error while the fetching Exchanges"} />
  return (
    <Container maxW={"container.xl"}>{loading? (<Loader />):
    (
      <>
      <HStack wrap={"wrap"}>
        {exchanges.map((i)=>(
          <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} />
        ))}
      </HStack>
      </>
    )}
    </Container>
  );
};

const ExchangeCard = ({name,img,rank,url})=>(
  <a href={url} target={"blank"}>
    <VStack w={"50"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3"} m={"4"}
    css={{
      "&:hover":{
        transform:"scale(1.1)"
      }
    }}
    >
      <Image src ={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1}>{rank}</Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  
  </a>
)

export default Exchanges