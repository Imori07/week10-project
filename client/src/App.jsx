import { fetchReviews } from './utils/api';
import { useQuery } from '@tanstack/react-query';
import './App.css';

function App() {
  const { data: reviews, isPending } = useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  });

  return (
    <div>
      {isPending && <p>Loading...</p>}
      <ul>
        {reviews?.map((review) => (
          <li key={review.id}>
            <p>{review.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
