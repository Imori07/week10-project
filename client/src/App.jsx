import { fetchCryptos, fetchReviews } from './utils/api';
import { useQuery } from '@tanstack/react-query';
import './App.css';

function App() {
  const { data: cryptos, isPending } = useQuery({
    queryKey: ['cryptos'],
    queryFn: fetchCryptos,
  });
  const coins = cryptos?.coins;
  return (
    <div>
      {isPending && <p>Loading cryptos...</p>}
      <div>
        {coins?.map((coin) => (
          <div
            key={coin.item.id}
            style={{ margin: '20px', border: '1px solid red' }}
          >
            <p>{coin.item.name}</p>
            <img src={coin.item.thumb} alt={coin.item.name} />
            <p>{coin.item.data.price}</p>
            <p>{coin.item.data.price_btc} BTC</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
