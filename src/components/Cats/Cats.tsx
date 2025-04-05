import { useEffect, useState } from 'react';
import { ICat } from '../../types/cats';
import { CatActions } from '../CatActions/CatActions';
import { fetchCat } from '../../api/config';
import { CatCard } from '../CatCard/CatCard';
import './Cats.scss';

export const Cats = () => {
  const [cat, setCat] = useState<ICat | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [isAutoRefresh, setIsAutoRefresh] = useState<boolean>(false);

  const getCatHandler = async () => {
    setCat(null);
    setError(null);
    setIsLoading(true);

    try {
      const cat = await fetchCat();
      setCat(cat);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isAutoRefresh && isEnabled) {
      interval = setInterval(() => {
        getCatHandler();
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoRefresh, isEnabled]);

  return (
    <section className="cats">
      <CatActions
        isEnabled={isEnabled}
        isAutoRefresh={isAutoRefresh}
        isLoading={isLoading}
        setIsEnabled={setIsEnabled}
        setIsAutoRefresh={setIsAutoRefresh}
        getCatHandler={getCatHandler}
      />

      {error && <p className="cats_error">{error}</p>}
      {isLoading ? <p className="cats_loading">Loading...</p> : cat && <CatCard url={cat.url} />}
    </section>
  );
};
