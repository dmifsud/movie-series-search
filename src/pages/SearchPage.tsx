import MovieList from '@components/MovieList';
import SearchMovie, { SearchMovieType } from '@components/SearchMovie';
import Button from '@components/ui/Button';
import BookmarkHeart from '@components/ui/icons/BookmarkHeart';
import BookmarkIcon from '@components/ui/icons/BookmarkIcon';
import useIntersection from '@hooks/useIntersection';
import useQueryParams from '@hooks/useQueryParams';
import useGetMovieStore from '@store/get-movie.store';
import useMovieWatchlistStore from '@store/movie-watchlist.store';
import { useEffect, useRef } from 'react';
import { Link } from 'wouter';

function TempMovie() {
    const { data, loading, inWatchlist } = useGetMovieStore();
    const { actions } = useMovieWatchlistStore.getState();

    console.log('render movie', data);

    return (
        <div>
            {loading && <span>Fetching Movie&hellip;</span>}
            {data && <>{JSON.stringify(data)}</>}
            {data && (
                <>
                    <Button
                        className="inline-flex gap-2 items-center"
                        onClick={() =>
                            inWatchlist
                                ? actions.removeMovieFromWatchlist(data.imdbID)
                                : actions.setMovieToWatchlist(data)
                        }
                    >
                        <BookmarkIcon checked={!!inWatchlist} />
                        Watchlist
                    </Button>
                </>
            )}
        </div>
    );
}

export const DummyElement = ({ isVisible }: { isVisible: () => void }) => {
    const triggerRef = useRef(document.createElement('span'));
    const visible = useIntersection(triggerRef, '0px');

    useEffect(() => {
        if (visible) {
            isVisible();
        }
    }, [isVisible, visible]);

    return <span ref={triggerRef}></span>;
};

function FixedWatchlistLink() {
    const { movies } = useMovieWatchlistStore();
    return (
        <>
            {movies.length > 0 && (
                <Link
                    to="/watchlist"
                    title="Watchlist Page"
                    className="fixed top-[-8px] right-10"
                >
                    <BookmarkHeart className="hover:fill-primary-light" />
                </Link>
            )}
        </>
    );
}

function SearchPage() {
    const params = useQueryParams();

    console.log('render search');

    return (
        <div className="flex fixed w-full h-full flex-col">
            <nav className="p-6 bg-primary text-white">
                <SearchMovie
                    search={params['s']}
                    type={params['type'] as SearchMovieType}
                />
                <FixedWatchlistLink />
            </nav>
            <section className="flex flex-grow justify-stretch overflow-hidden">
                <div className="box-border w-[30%] min-w-[300px] max-w-[600px] border-r-2 border-r-secondary border-solid custom-scrollbar">
                    {/* <div className="h-[3000px] border-4 border-solid border-red-500">
                        movies
                    </div> */}
                    <MovieList />
                </div>
                <div className="box-border flex-1">
                    <TempMovie />
                </div>
            </section>
        </div>
    );
}

export default SearchPage;
