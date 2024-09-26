import useMovieWatchlistStore from '@store/movie-watchlist.store'

function WatchListPage() {
    const { movies, actions } = useMovieWatchlistStore()

    return (
        <>
            <div className="underline">Watchlist</div>
            {movies.length === 0 && <p>No movies added to watchlist.</p>}
            {movies.map((movie) => (
                <p key={movie.id}>
                    {movie.movie.Title}

                    <button
                        onClick={() =>
                            actions.removeMovieFromWatchlist(movie.id)
                        }
                    >
                        Remove from watchlist
                    </button>
                </p>
            ))}
        </>
    )
}

export default WatchListPage
