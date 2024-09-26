import { TitleSearchQuery } from "@api/models/omdb.schema";
import useQueryParams from "@hooks/useQueryParams";
import useGetMovieStore from "@store/get-movie.store";
import useMovieWatchlistStore from "@store/movie-watchlist.store";
import useSearchMoviesStore from "@store/search-movie.store";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "wouter";

function TempMovie() {
    const { data, loading, inWatchlist } = useGetMovieStore();
    const { actions } = useMovieWatchlistStore.getState();

    console.log('render movie', data);


    return (
        <div>
            {loading && <span>Fetching Movie&hellip;</span>}
            {data && <>{JSON.stringify(data)}</>}
            {data && <><button onClick={() => inWatchlist ? actions.removeMovieFromWatchlist(data.imdbID) : actions.setMovieToWatchlist(data)}>{inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}</button></>}
        </div>
    );
}

function TempMovies() {
    const { data, loading, totalResults, actions: searchActions, canLoadMore } = useSearchMoviesStore();
    const { actions } = useGetMovieStore.getState();

    const getMovieByImdbID = useCallback(actions.getMovieByImdbID, []);
    const searchMore = useCallback(searchActions.searchMore, []);

    console.log('render movies', { data, loading, totalResults, });
    return (
        <div>
            {totalResults !== null && `${totalResults} RESULTS`}
            {data?.map(movie => <div onClick={() => getMovieByImdbID(movie.imdbID)} key={movie.imdbID}>{movie.Title}</div>)}
            {loading && <span>Loading&hellip;</span>}
            {canLoadMore && <button onClick={() => searchMore()} className="mt-10 mb-10 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Load more</button>}
        </div>
    );
}


type MovieType = TitleSearchQuery['type'] | 'any';
function SearchMovie({ search, type: propType }: { search?: string, type?: MovieType }) {
    const { actions } = useSearchMoviesStore.getState();
    const [movieType, setMovieType] = useState<MovieType>(propType ?? 'any');
    const searchRef = useRef<HTMLInputElement>(null);

    const searchMovieByTitle = useCallback(actions.searchMovieByTitle, []);

    const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchValue = searchRef.current?.value || '';
        searchMovieByTitle(searchValue, {}, true);
    };

    useEffect(() => {
        const searchValue = searchRef.current?.value || '';
        if (searchValue) {
            let type;
            if (movieType !== 'any') {
                type = movieType;
            }
            searchMovieByTitle(searchValue, { type }, true);
        }
    }, [movieType]);

    const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovieType(e.target.value as MovieType)
    }
    

    console.log('render search movie');

    return (
        <form onSubmit={handleSearch}>
            <input type="search" placeholder='Search Movie' defaultValue={search} ref={searchRef} />
            {/* <MultiRangeSlider min={1950} max={2024} /> */}
            <div className="flex">
                <div className="flex items-center me-4">
                    <input id="inline-radio" onChange={onOptionChange} checked={movieType === 'any'} type="radio" value="any" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="inline-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Any</label>
                </div>
                <div className="flex items-center me-4">
                    <input id="inline-2-radio" onChange={onOptionChange} checked={movieType === 'movie'} type="radio" value="movie" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Movies</label>
                </div>
                <div className="flex items-center me-4">
                    <input id="inline-checked-radio" onChange={onOptionChange} checked={movieType === 'series'} type="radio" value="series" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="inline-checked-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Series</label>
                </div>
                <div className="flex items-center">
                    <input disabled id="inline-disabled-radio" checked={movieType === 'episode'} onChange={onOptionChange} type="radio" value="episode" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="inline-disabled-radio" className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">Episodes</label>
                </div>
            </div>
        </form>
    );
}



function SearchPage() {

    const params = useQueryParams();
    // const { actions } = useSearchMoviesStore.getState();

    // useEffect(() => {
    //     const { s, ...rest } = params;
    //     const optionalEntries = Object.entries(rest).filter(([key]) => ['y', 'type', 'page'].includes(key));
    //     if (s) {
            
    //         const query: TitleSearchQuery = {
    //             s,
    //             ...Object.fromEntries(optionalEntries)
    //         };
    //         console.log('call search with', query);
    //         actions.searchMovie(query)
    //     }
    // }, [params, actions]);

    console.log('render search');


    return (
        <>
            <div className="text-right">
                <Link to="/watchlist" className="mt-20 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Watchlist</Link>
            </div>
            <h1 className="text-3xl font-bold underline bg-red-400">
                Hello world!
            </h1>
            <SearchMovie search={params['s']} type={params['type'] as MovieType}/>
            <TempMovies />
            <TempMovie />
        </>
    );
}

export default SearchPage;