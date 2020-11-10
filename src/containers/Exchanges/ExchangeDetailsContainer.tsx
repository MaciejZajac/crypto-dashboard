import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ExchangeDetailsContainer = () => {
  const { exchangeId } = useParams<any>();
  useEffect(() => {
    console.log('exchangeId', exchangeId);
  }, []);

  return <div>hello</div>;
};
export default ExchangeDetailsContainer;
