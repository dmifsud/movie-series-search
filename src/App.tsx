import { useEffect } from 'react';
import './App.css';
import { OmdbApi } from './api/omdb.api';

function App() {

  useEffect(() => {
    OmdbApi.getTitle('empire strikes back').then(result => {
      console.log(result);
      console.log(result.Ratings?.map(rating => rating.Value).join(', '));
    });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline bg-red-400">
        Hello world!
      </h1>
    </>
  );
}

export default App;
