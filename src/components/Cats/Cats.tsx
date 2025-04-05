import { useState } from 'react';
import { ICat } from '../../types/cats';
import { CatActions } from '../CatActions/CatActions';
import { fetchCat } from '../../api/config';
import { CatCard } from '../CatCard/CatCard';
import './Cats.scss';

export const Cats = () => {
  const [cat, setCat] = useState<ICat | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [isAutoRefresh, setIsAutoRefresh] = useState<boolean>(false);

  const getCatHandler = async () => {
    try {
      const cat = await fetchCat();
      setCat(cat);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="cats">
      <CatActions
        isEnabled={isEnabled}
        isAutoRefresh={isAutoRefresh}
        setIsEnabled={setIsEnabled}
        setIsAutoRefresh={setIsAutoRefresh}
        getCatHandler={getCatHandler}
      />

      {cat && <CatCard {...cat} />}
    </section>
  );
};
