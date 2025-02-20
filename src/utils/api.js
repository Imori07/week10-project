const BASE_URL = 'http://localhost:8080';

const delay = (ms) => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

export const fetchReviews = async () => {
  await delay(2000);
  const response = await fetch(`${BASE_URL}/reviews`);
  if (!response.ok) {
    throw new Error('failed to fetch reviews');
  }
  const data = await response.json();
  return data;
};

export const fetchCryptos = async () => {
  await delay(2000);

  const res = await fetch(
    'https://api.coingecko.com/api/v3/search/trending?key=CG-cZ3STLhRzpH8KiixUVPUausw'
  );
  return await res.json();
};
