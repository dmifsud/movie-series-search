import Movie from '@components/Movie';
import MovieList from '@components/MovieList';
import SearchMovie, { SearchMovieType } from '@components/SearchMovie';
import BookmarkHeart from '@components/ui/icons/BookmarkHeart';
import Nav from '@components/ui/Nav';
import useQueryParams from '@hooks/useQueryParams';
import useMovieWatchlistStore from '@store/movie-watchlist.store';
import { Link } from 'wouter';

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

    return (
        <div className="flex fixed w-full h-full flex-col">
            <Nav>
                <SearchMovie
                    search={params['s']}
                    type={params['type'] as SearchMovieType}
                />
                <FixedWatchlistLink />
            </Nav>
            <section className="flex flex-grow justify-stretch overflow-hidden">
                <div className="box-border w-[30%] min-w-[300px] max-w-[600px] border-r-2 border-r-secondary border-solid custom-scrollbar">
                    <MovieList />
                </div>
                <div className="box-border flex-1 custom-scrollbar">
                    <Movie movieId={params['imdbid']} />
                </div>
            </section>
        </div>
    );
}

export default SearchPage;
