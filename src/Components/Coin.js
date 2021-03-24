import { Link } from 'react-router-dom';
import '../scss/Components/Coin.scss';

const Coin = ({ coins }) => {
  //console.log(coins)
  return <div className="wrapper">
    {coins.map((coin, i) => <div className={`coin-container ${(i + 2) % 2 === 0 ? "even" : "odd"}`} key={coin.name}>
      <Link to={`/coin/${coin.id}`} className="s"><img src={coin.image} alt={coin.id} /></Link>
      <Link to={`/coin/${coin.id}`} className="s"><span className="coin-id">{coin.id}</span></Link>
      <Link to={`/coin/${coin.id}`} className="s">
        <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
      </Link>
      <span>{coin.current_price.toLocaleString()} KRW</span>
      <span className={coin.price_change_percentage_24h === null ? 'black' : coin.price_change_percentage_24h > 0 ? 'green' : 'red'}>{coin?.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : 0}%</span>
      <span className="mkt-cap">Mkt Cap:<br />₩{coin.market_cap.toLocaleString()}</span>
    </div>
    )}
  </div>
}

export default Coin;