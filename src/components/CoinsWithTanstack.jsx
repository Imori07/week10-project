import { fetchCryptos } from '../utils/api';
import { useQuery } from '@tanstack/react-query';

function CoinsWithTanstack() {
  const {
    data: cryptos,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['cryptos'],
    queryFn: fetchCryptos,
    refetchInterval: 5000,
  });

  const coins = cryptos?.coins;

  console.log('Re-fetching:', isFetching);

  if (isPending) return <p>Loading cryptos...</p>;
  if (isError) return <p>Error fetching crypto data.</p>;

  return (
    <div>
      {isFetching && <p>Re-fetching crypto data...</p>}

      <div>
        {coins?.map(({ item }) => (
          <div className='coin' key={item.id}>
            <p>{item.name}</p>
            <img src={item.thumb} alt={item.name} />
            <p style={{ color: isFetching ? 'red' : '#ffffff' }}>
              {item.data.price} <span>{item.symbol}</span>
            </p>
            <p>{item.data.price_btc} BTC</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoinsWithTanstack;
