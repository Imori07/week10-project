import { useEffect, useState } from 'react';
import './App.css';
import { fetchReviews } from './utils/api';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const reviews = await fetchReviews();
      console.log(reviews);
    };
    fetchData();
  }, []);

  return <></>;
}

export default App;
