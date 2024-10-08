import useGetMovieStore from '@store/get-movie.store';
import useMovieWatchlistStore from '@store/movie-watchlist.store';
import Button from './ui/Button';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import { Fragment } from 'react/jsx-runtime';
import { MovieModel } from '@api/models/omdb.schema';
import { useShallow } from 'zustand/shallow';
import { useEffect } from 'react';
import MovieCard from './ui/MovieCard';
import useIsCurrentMovieInWatchlistSelector from '@store/selectors/useIsCurrentMovieInWatchlistSelector';
import FallbackMessage from './ui/FallbackMessage';
import Skeleton from 'react-loading-skeleton';

function WatchlistButton({
    movie,
    className,
}: { movie: MovieModel } & React.ButtonHTMLAttributes<{}>) {
    const inWatchlist = useIsCurrentMovieInWatchlistSelector();
    const { actions } = useMovieWatchlistStore.getState();
    return (
        <Button
            className={className}
            onClick={() =>
                inWatchlist
                    ? actions.removeMovieFromWatchlist(movie.imdbID)
                    : actions.setMovieToWatchlist(movie)
            }
        >
            <BookmarkIcon checked={!!inWatchlist} />
            Watchlist
        </Button>
    );
}

function Movie({ movieId }: { movieId?: string }) {
    const { movie, loading, getMovieById, errorMsg } = useGetMovieStore(
        useShallow((state) => ({
            movie: state.data,
            loading: state.loading,
            getMovieById: state.actions.getMovieByImdbID,
            errorMsg: state.error,
        }))
    );

    useEffect(() => {
        if (movieId) {
            getMovieById(movieId);
        }
    }, [movieId, getMovieById]);

    const showMovie = movie && !loading;
    return (
        <>
            {(!movie || errorMsg) && !loading ? (
                <FallbackMessage>
                    {errorMsg ? (
                        errorMsg
                    ) : (
                        <>Select a movie or a series from the left menu</>
                    )}
                </FallbackMessage>
            ) : (
                <div>
                    <div className="flex flex-col p-8">
                        <div className="flex flex-row border-b-2 border-solid border-b-secondary pb-8">
                            <div className="w-[30%] sm:max-w-[180px] md:max-w-[200px] xl:max-w-[320px]">
                                {showMovie && (
                                    <MovieCard
                                        posterUrl={movie.Poster}
                                        title={movie.Title}
                                        boxartRatio
                                    />
                                )}
                                {loading && <Skeleton height="100%" />}
                            </div>

                            <div className="flex-grow flex justify-between align-middle flex-col">
                                <div className="relative">
                                    {showMovie && (
                                        <WatchlistButton
                                            movie={movie}
                                            className="absolute top-0 right-0 inline-flex gap-2 items-center z-50 bg-white text-2xl"
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col gap-4 min-h-[60%] px-8">
                                    <h2 className="sm:text-2xl lg:text-5xl font-bold">
                                        {movie && !loading && movie.Title}
                                        {loading && (
                                            <Skeleton width="50%" height={40} />
                                        )}
                                    </h2>
                                    {showMovie && (
                                        <p className="text-primary sm:text-lg lg:text-2xl leading-loose">
                                            <span className="border-2 border-solid border-primary py-1 px-4 rounded-md mr-2">
                                                {movie.Rated}
                                            </span>
                                            {movie.Year}{' '}
                                            <span className="px-1">
                                                &middot;
                                            </span>{' '}
                                            {movie.Genre}
                                            <span className="px-1">
                                                &middot;
                                            </span>
                                            {movie.Runtime}
                                        </p>
                                    )}
                                    {loading && (
                                        <p className="h-[450px]">
                                            <Skeleton count={4} />
                                        </p>
                                    )}
                                    <p className="text-primary sm:text-lg lg:text-2xl">
                                        {showMovie && movie.Actors}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="border-b-2 border-solid border-b-secondary py-8">
                            <p className="sm:text-lg lg:text-2xl text-primary">
                                {showMovie && movie.Plot}
                                {loading && <Skeleton count={4} />}
                            </p>
                        </div>
                        <div className="py-8 flex flex-row justify-center gap-8">
                            {showMovie &&
                                movie.Ratings &&
                                movie.Ratings.map((rating, i) => (
                                    <Fragment key={i}>
                                        <div className="text-center text-primary">
                                            <div className="sm:text-lg lg:text-2xl mb-2">
                                                {rating.Value}
                                            </div>
                                            <div className="text-lg">
                                                {rating.Source}
                                            </div>
                                        </div>
                                        {i !==
                                            (movie?.Ratings?.length ?? 0) -
                                                1 && (
                                            <div className="border-r-2 border-solid border-secondary"></div>
                                        )}
                                    </Fragment>
                                ))}
                            {loading &&
                                Array(3)
                                    .fill(null)
                                    .map((_, i) => (
                                        <Fragment key={`skeleton-rating-${i}`}>
                                            <div>
                                                <Skeleton
                                                    width={130}
                                                    count={2}
                                                />
                                            </div>
                                            {i !== 2 && (
                                                <div className="border-r-2 border-solid border-primary-light"></div>
                                            )}
                                        </Fragment>
                                    ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Movie;
