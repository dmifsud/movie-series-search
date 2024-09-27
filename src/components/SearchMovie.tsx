import { TitleSearchQuery } from '@api/models/omdb.schema';
import useSearchMoviesStore from '@store/search-movie.store';
import { useState, useRef, useCallback, useEffect } from 'react';

function SearchIcon() {
    return (
        <svg
            className="w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
        </svg>
    );
}

export type SearchMovieType = TitleSearchQuery['type'] | 'any';
function SearchMovie({
    search,
    type: propType,
}: {
    search?: string;
    type?: SearchMovieType;
}) {
    const { actions } = useSearchMoviesStore.getState();
    const [movieType, setMovieType] = useState<SearchMovieType>(
        propType ?? 'any'
    );
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
        setMovieType(e.target.value as SearchMovieType);
    };

    console.log('render search movie');

    return (
        <form onSubmit={handleSearch} className="flex justify-between">
            <div>
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        defaultValue={search}
                        ref={searchRef}
                        className="block w-full py-4 px-[55px] text-xl bg-transparent text-white focus:ring-0 focus:border-transparent focus:ring-offset-0 focus:outline-none"
                        placeholder="Search Movies..."
                    />
                </div>
            </div>

            {/* <MultiRangeSlider min={1950} max={2024} /> */}
            <div>
                <h5 className="uppercase">Type</h5>
                <div className="flex gap-5">
                    {[
                        ['any', 'Any'],
                        ['movie', 'Movie'],
                        ['series', 'Series'],
                        ['episodes', 'Episodes', 'disabled'],
                    ].map(([key, name, disabled]) => (
                        <div key={key} className="inline-flex items-center">
                            <label
                                className="relative flex items-center gap-2 cursor-pointer peer-disabled:cursor-default text-white"
                                htmlFor={key}
                            >
                                <input
                                    name="inline-radio-group"
                                    type="radio"
                                    className="peer h-5 w-5 cursor-pointer disabled:cursor-default appearance-none rounded-full border-2 border-white checked:border-white transition-all disabled:border-primary-light disabled:opacity-50"
                                    id={key}
                                    value={key}
                                    onChange={onOptionChange}
                                    checked={movieType === key}
                                    disabled={!!disabled}
                                />
                                <span className="absolute left-[10px] bg-white w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 transform -translate-x-1/2 -translate-y-1/2 peer-disabled:opacity-50"></span>
                                {name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </form>
    );
}

export default SearchMovie;
