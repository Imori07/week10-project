import { fetchCryptos } from './utils/api';
import { useQuery } from '@tanstack/react-query';
import './App.css';

function App() {
  const {
    data: cryptos,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['cryptos'],
    queryFn: fetchCryptos,
    refetchInterval: 7000,
  });

  const coins = cryptos?.coins;
  console.log('refecthing', isFetching);

  return (
    <div>
      {isPending ? (
        <p>Loading cryptos...</p>
      ) : isFetching ? (
        <p>re-fetching crypto data...</p>
      ) : (
        ''
      )}
      {isError && <p>Error Fetching crypto data</p>}
      <div>
        {coins?.map((coin) => (
          <div className='coin' key={coin.item.id}>
            <p>{coin.item.name}</p>
            <img src={coin.item.thumb} alt={coin.item.name} />
            <p style={{ color: isFetching ? 'red' : '#ffffff' }}>
              {coin.item.data.price} <span>{coin.item.symbol}</span>
            </p>
            <p>{coin.item.data.price_btc} BTC</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
