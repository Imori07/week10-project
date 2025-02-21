import { useEffect, useState } from 'react';
import { fetchCryptos } from '../utils/api';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const coins = await fetchCryptos();
      setData(coins);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {loading && <p>Loading cryptos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {data?.coins?.map((coin) => (
          <div className='coin' key={coin.item.id}>
            <p>{coin.item.name}</p>
            <img src={coin.item.thumb} alt={coin.item.name} />
            <p style={{ color: loading ? 'red' : '#ffffff' }}>
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
