import useGetMovieStore from '@store/get-movie.store';
import useSearchMoviesStore from '@store/search-movie.store';
import { useCallback } from 'react';
import MovieListItem from './MovieListItem';
import VisibleElement from './utils/VisibleElement';
import { useShallow } from 'zustand/shallow';
import FallbackMessage from './ui/FallbackMessage';

function MovieList() {
    const {
        movieList,
        loading,
        totalResults,
        searchActions,
        canLoadMore,
        initialLoading,
    } = useSearchMoviesStore(
        useShallow((state) => ({
            movieList: state.data,
            loading: state.loading,
            totalResults: state.totalResults,
            searchActions: state.actions,
            canLoadMore: state.canLoadMore,
            initialLoading: state.initialLoading,
        }))
    );
    const { actions } = useGetMovieStore.getState();

    const getMovieByImdbID = useCallback(actions.getMovieByImdbID, []);
    const searchMore = useCallback(searchActions.searchMore, []);

    return (
        <>
            {!movieList && !initialLoading ? (
                <FallbackMessage>
                    Search movie or series from the Nav bar above
                </FallbackMessage>
            ) : (
                <div>
                    {initialLoading ? (
                        <ul>
                            {Array(10)
                                .fill(null)
                                .map((_, i) => (
                                    <li key={`skeleton-movie-list-item-${i}`}>
                                        <MovieListItem showSkeleton />
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <>
                            {totalResults !== null && (
                                <div className="p-8 uppercase sticky top-0 bg-white z-20">
                                    {isNaN(totalResults) ? 0 : totalResults}{' '}
                                    Results
                                </div>
                            )}
                            <ul>
                                {movieList?.map((movie) => (
                                    <li key={movie.imdbID}>
                                        <MovieListItem
                                            movie={movie}
                                            onClick={() =>
                                                getMovieByImdbID(movie.imdbID)
                                            }
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
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default MovieList;
