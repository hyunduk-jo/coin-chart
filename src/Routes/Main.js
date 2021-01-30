import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../scss/Routes/Main.scss';
import Coin from '../Components/Coin';
import { Link } from 'react-router-dom';

function Main() {
  const [coins, setCoins] = useState([]);
  const pageRef = useRef(1);

  const getApi = async () => {
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=20&page=${pageRef.current}&sparkline=false`);
    setCoins(result.data);
  }

  useEffect(() => {
    const interval = setInterval( () => getApi(), 1000 );
    return () => clearInterval(interval);
  },[pageRef])

  const [searchState, setSearchState] = useState(false);
  const [searchedCoin, setSearchedCoin] = useState([]);
  const [searched, setSearched] = useState('');

  const onClick = async (e) => {
    e.preventDefault();
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&ids=${searched}`);
    setSearchedCoin(result.data);
    setSearchState(true);
    //console.log(result.data);
  }
  //if(coins[0] !== undefined)console.log(coins[0].current_price)
  //console.log(coins)
  return (
    <>
    <span className="title">Coin Chart</span>
    <div className="container">
      <form>
        <input placeholder="Search Coin" onChange={e => setSearched(e.target.value)} />
        <button onClick={onClick}>Search</button>
      </form>
      {
        searchState === false ? null : searchedCoin[0] === undefined ? 
          <h1>Coin Not Found</h1> : 
          <span className="searched">
            <Link to={`/${searched}`}>
              click here to see {searchedCoin[0].id}
            </Link>
          </span>
      }
      {
        coins[0] === undefined ? (
          <h1>Loading...</h1>
        ) : (
          <div className="coin-table">
            <button onClick={() => {pageRef.current === 1 ? pageRef.current = 1 : pageRef.current -= 1}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
            </button>
            <Coin coins={coins} />
            <button onClick={() => pageRef.current += 1}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
            </button>
          </div>
        )
      }
      
    </div>
    </>
  );
}

export default Main;
