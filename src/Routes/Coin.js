import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Chart from "../Components/Chart";
import Details from "../Components/Details";

import '../scss/Routes/Coin.scss';

const Coin = ({match}) => {
  const {params:{coin}} = match;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); //코인 정보
  const [dates, setDates] = useState(1); //1일 7일 1년 정하기 위한 수
  const [chartDate, setChartDate] = useState([]); // 불러온 차트 데이터의 날짜 데이터 배열
  const [chartPrice, setChartPrice] = useState([]); // 불러온 차트 데이터의 가격 데이터 배열

  const getCoin = useCallback(async () => {
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`);
    setData(result.data);
  },[coin])

  const getCoinChartData = useCallback(async () => {
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=krw&days=${dates}`);
    //console.log(result.data.prices);
    const dateArr = [];
    const priceArr = [];
    result.data.prices.map(price => {
      const date = new Date(price[0]);
      //console.log(date.getFullYear(), date.getMonth() + 1, date.getDate());
      dateArr.push(`${date.getYear()}/${date.getMonth() + 1}/${date.getDate()}`);
      priceArr.push(price[1].toFixed(0).toLocaleString());
      return null;
    });
    setChartDate(dateArr);
    setChartPrice(priceArr);
  },[coin, dates])

  //console.log(`chartDate ->`, chartDate);
  //console.log(`charPrice ->`, chartPrice);

  useEffect(() => {
    setLoading(true);
    getCoin();
    getCoinChartData();
    setLoading(false);
  },[getCoin, getCoinChartData])

  return <div className="coin-route__wrapper">
    <div className="coin-title">{coin}</div>
    {
      loading ? <h1>Loading...</h1> : <>
        <select onChange={e => setDates(e.target.value)}>
          <option value="1">1Day</option>
          <option value="7">7Day</option>
          <option value="14">14Day</option>
          <option value="30">1Month</option>
          <option value="90">3Month</option>
          <option value="180">6Month</option>
          <option value="365">1Year</option>
          <option value="1095">3Year</option>
        </select>
        <Chart chartDate={chartDate} chartPrice={chartPrice} coin={coin} />
        <Details data={data} />
        {
          data?.description?.ko ? 
          <p>{data.description.ko}</p> : 
          data?.description?.ko === "" ? 
          <h1>No description about {data.id}</h1> : 
          <h1>Loading...</h1>
        }
      </>
    }
  </div>
}

export default Coin;