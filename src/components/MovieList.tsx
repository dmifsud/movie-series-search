import { DummyElement } from '@pages/SearchPage';
import useGetMovieStore from '@store/get-movie.store';
import useSearchMoviesStore from '@store/search-movie.store';
import { useCallback } from 'react';
import MovieListItem from './MovieListItem';

function MovieList() {
    const {
        data,
        loading,
        totalResults,
        actions: searchActions,
        canLoadMore,
    } = useSearchMoviesStore();
    const { actions } = useGetMovieStore.getState();

    const getMovieByImdbID = useCallback(actions.getMovieByImdbID, []);
    const searchMore = useCallback(searchActions.searchMore, []);

    console.log('render movies', { data, loading, totalResults });
    return (
        <div>
            {totalResults !== null && (
                <div className="px-6 py-8 uppercase sticky top-0 bg-white z-20">
                    {isNaN(totalResults) ? 0 : totalResults} Results
                </div>
            )}
            {data?.map((movie) => (
                <MovieListItem
                    movie={movie}
                    onClick={() => getMovieByImdbID(movie.imdbID)}
                    key={movie.imdbID}
                />
            ))}
            {loading && <span>Loading&hellip;</span>}
            {canLoadMore && !loading && <DummyElement isVisible={searchMore} />}
        </div>
    );
}

export default MovieList;
