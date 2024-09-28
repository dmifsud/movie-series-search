import useGetMovieStore from '@store/get-movie.store';
import useMovieWatchlistStore from '@store/movie-watchlist.store';
import Button from './ui/Button';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import { Fragment } from 'react/jsx-runtime';
import { MovieModel } from '@api/models/omdb.schema';
import { useShallow } from 'zustand/shallow';

function WatchlistButton({
    movie,
    className,
}: { movie: MovieModel } & React.ButtonHTMLAttributes<{}>) {
    const { inWatchlist } = useGetMovieStore();
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

function Movie() {
    const { movie, loading } = useGetMovieStore(
        useShallow((state) => ({ movie: state.data, loading: state.loading }))
    );

    console.log('render movie', movie);

    return (
        <div>
            {loading && <span>Fetching Movie&hellip;</span>}
            {movie && (
                <div className="flex flex-col p-8">
                    <div className="flex flex-row border-b-2 border-solid border-b-primary-light pb-8">
                        <div className="rounded-md overflow-hidden">
                            <img src={movie.Poster} alt={movie.Title} />
                        </div>
                        <div className="flex-grow flex justify-between align-middle flex-col">
                            <div className="relative">
                                <WatchlistButton
                                    movie={movie}
                                    className="absolute top-0 right-0 inline-flex gap-2 items-center z-50 bg-white text-2xl"
                                />
                            </div>
                            <div className="flex flex-col gap-4 min-h-[60%] px-8">
                                <h2 className="text-5xl font-bold">
                                    {movie.Title}
                                </h2>
                                <p className="text-primary text-2xl leading-loose">
                                    <span className="border-2 border-solid border-primary py-1 px-4 rounded-md mr-2">
                                        {movie.Rated}
                                    </span>
                                    {movie.Year}{' '}
                                    <span className="px-1">&middot;</span>{' '}
                                    {movie.Genre}
                                    <span className="px-1">&middot;</span>
                                    {movie.Runtime}
                                </p>
                                <p className="text-primary text-2xl">
                                    {movie.Actors}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="border-b-2 border-solid border-b-primary-light py-8">
                        <p className="text-2xl text-primary">{movie.Plot}</p>
                    </div>
                    <div className="py-8 flex flex-row justify-center gap-8">
                        {movie.Ratings &&
                            movie.Ratings.map((rating, i) => (
                                <Fragment key={i}>
                                    <div className="text-center text-primary">
                                        <div className="text-2xl mb-2">
                                            {rating.Value}
                                        </div>
                                        <div className="text-lg">
                                            {rating.Source}
                                        </div>
                                    </div>
                                    {i !==
                                        (movie?.Ratings?.length ?? 0) - 1 && (
                                        <div className="border-r-2 border-solid border-primary-light"></div>
                                    )}
                                </Fragment>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Movie;
