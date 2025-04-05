import { ICat } from '../types/cats';

const VITE_CATS_API_KEY = import.meta.env.VITE_CATS_API_KEY;
const CATS_URL =
  'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1';

export const fetchCat = async (): Promise<ICat> => {
  try {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': VITE_CATS_API_KEY,
      },
      redirect: 'follow',
    };

    const response = await fetch(CATS_URL, requestOptions);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const result: ICat[] = await response.json();
    if (result.length === 0) throw new Error('No cat found');

    return result[0];
  } catch (error) {
    throw new Error(
      `Error fetching cat: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
