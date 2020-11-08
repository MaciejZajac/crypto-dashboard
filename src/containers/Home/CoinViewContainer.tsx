import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
let parse = require('html-react-parser');

interface ICoinRes {
  localization: string | boolean;
  tickers: boolean;
  market_data: boolean;
  community_data: boolean;
  developer_data: boolean;
  sparkline: boolean;
}
const defaultParams: ICoinRes = {
  localization: false,
  tickers: false,
  market_data: false,
  community_data: false,
  developer_data: false,
  sparkline: false,
};

interface IParams {
  coinId: string;
}

const CoinViewContainer = () => {
  const { coinId } = useParams<IParams>();
  const [coinDetails, setCoindDetails] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getCoinDetails();
  }, []);

  const getCoinDetails = () => {
    setLoading(true);
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId.toLowerCase()}`,
      {
        params: defaultParams,
      }
    )
      .then((response) => {
        setCoindDetails(response.data);
        setLoading(false);
        console.log('response', response);
      })
      .catch((err) => {
        setLoading(false);
        console.log('Error', err);
      });
  };
  const { description } = coinDetails;
  console.log('description?.en', description?.en);
  if (loading) return <div>Loading...</div>;
  return <div>{description && parse(description.en)}</div>;
};

export default CoinViewContainer;
