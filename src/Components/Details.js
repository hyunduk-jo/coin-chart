import '../scss/Components/Details.scss';

const Details = ({data}) => {
  //console.log(data);
  return <div className="details-container">
    {
      data?.id ? <>
        <img src={data.image.small} alt={data.id} />
        <div style={{fontWeight: 'bold'}}>{data.id.toUpperCase()}</div>
        <div style={{fontWeight: 'bold'}}>{data.symbol.toUpperCase()}</div>
        <div>Rank {data.coingecko_rank}</div>
        <div>Mkt Cap Rank: {data.market_cap_rank}</div>
        <div>{data.genesis_date}</div>
      </> : <h1>Loading...</h1>
    }
  </div>
}

export default Details;