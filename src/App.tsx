import { useCallback, useEffect, useRef } from 'react';
import './App.css';
import { OmdbApi } from './api/omdb.api';
import useSearchMoviesStore from '@store/search-movie.store';
import useGetMovieStore from '@store/get-movie.store';
import useMovieWishlistStore from '@store/movie-wishlist.store';

function TempMovie() {
  const { data, loading, inWishlist } = useGetMovieStore();
  const { actions } = useMovieWishlistStore.getState();

  console.log('render movie', data);

  const removeMovieFromWishlist = useCallback(actions.removeMovieFromWishlist, []);
  const setMovieToWishlist = useCallback(actions.setMovieToWishlist, []);


  return (
    <div>
      {loading && <span>Fetching Movie&hellip;</span>}
      {data && <>{JSON.stringify(data)}</>}
      {data && <><button onClick={() => inWishlist ? removeMovieFromWishlist(data.imdbID) : setMovieToWishlist(data)}>{inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}</button></>}
    </div>
  );
}

function TempMovies() {
  const { data, loading, totalResults } = useSearchMoviesStore();
  const { actions } = useGetMovieStore.getState();

  const getMovieByImdbID = useCallback(actions.getMovieByImdbID, []);

  console.log('render movies', { data, loading, totalResults, });
  return (
    <div>
      {loading && <span>Loading&hellip;</span>}
      {totalResults !== null && `${totalResults} RESULTS`}
      {data?.map(movie => <div onClick={() => getMovieByImdbID(movie.imdbID)} key={movie.imdbID}>{movie.Title}</div>)}
    </div>
  );
}

function SearchMovie() {
  const { actions } = useSearchMoviesStore.getState();
  const searchRef = useRef<HTMLInputElement>(null);

  const searchMovieByTitle = useCallback(actions.searchMovieByTitle, []);

  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = searchRef.current?.value || '';
    searchMovieByTitle(searchValue);
  };

  console.log('render search movie');

  return (
    <form onSubmit={handleSearch}>
      <input type="search" placeholder='Search Movie' ref={searchRef} />
    </form>
  );
}


function App() {

  const { actions } = useSearchMoviesStore.getState();

  useEffect(() => {
    // OmdbApi.getTitle('empire strikes back').then(result => {
    //   console.log(result);
    //   console.log(result.Ratings?.map(rating => rating.Value).join(', '));
    // });
    setTimeout(() => {
      actions.searchMovieByTitle('fight club');

    }, 1000);


  }, [actions]);

  console.log('render app');

  return (
    <>
      <h1 className="text-3xl font-bold underline bg-red-400">
        Hello world!
      </h1>
      <SearchMovie />
      <TempMovies />
      <TempMovie />
    </>
  );
}

export default App;
