import useGetMovieStore from '@store/get-movie.store';
import useSearchMoviesStore from '@store/search-movie.store';
import { useCallback } from 'react';
import MovieListItem from './MovieListItem';
import VisibleElement from './utils/VisibleElement';

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
                <div className="p-8 uppercase sticky top-0 bg-white z-20">
                    {isNaN(totalResults) ? 0 : totalResults} Results
                </div>
            )}
            <ul>
                {data?.map((movie) => (
                    <li key={movie.imdbID}>
                        <MovieListItem
                            movie={movie}
                            onClick={() => getMovieByImdbID(movie.imdbID)}
                        />
                    </li>
                ))}
            </ul>

            {canLoadMore && !loading && (
                <div>
                    <VisibleElement isVisible={searchMore} />
                    Loading&hellip;
                </div>
            )}
        </div>
    );
}

export default MovieList;
