import Button from '@components/ui/Button';
import FallbackMessage from '@components/ui/FallbackMessage';
import MoviePosterCard from '@components/ui/MovieCard';
import Nav from '@components/ui/Nav';
import useMovieWatchlistStore from '@store/movie-watchlist.store';

function WatchListPage() {
    const { movies, actions } = useMovieWatchlistStore();

    return (
        <>
            <Nav>
                <h1 className="text-5xl">OMDb &mdash; Watchlist</h1>
            </Nav>
            {movies.length === 0 && (
                <FallbackMessage>No movies added to watchlist.</FallbackMessage>
            )}

            <section className="max-w-[1990px] my-0 mx-auto p-16">
                <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
                    {movies.map(({ id, movie, dateAdded }) => (
                        <div
                            key={id}
                            className="p-4 rounded shadow flex flex-col gap-4 justify-between"
                        >
                            <div className="flex flex-col gap-2">
                                <MoviePosterCard
                                    posterUrl={movie.Poster}
                                    title={movie.Title}
                                    boxartRatio
                                />

                                <h5 className="text-xl">{movie.Title}</h5>
                                <p className="text-primary text-sm">
                                    {movie.Year} &middot; {movie.Actors}
                                </p>
                                <small className="text-xs font-thin">
                                    Date added:{' '}
                                    {new Date(dateAdded).toDateString()}
                                </small>
                            </div>
                            <Button
                                onClick={() => {
                                    if (
                                        confirm(
                                            `Are you sure you want to remove ${movie.Title} from Watchlist?`
                                        )
                                    ) {
                                        actions.removeMovieFromWatchlist(id);
                                    }
                                }}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default WatchListPage;
