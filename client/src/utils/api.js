const BASE_URL = 'http://localhost:8080';

export const fetchReviews = async () => {
  const response = await fetch(`${BASE_URL}/reviews`);
  if (!response.ok) {
    throw new Error('failed to fetch reviews');
  }
  return await response.json();
};
