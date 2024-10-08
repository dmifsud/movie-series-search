import { TitleSearchQuery } from '@api/models/omdb.schema';
import useSearchMoviesStore from '@store/search-movie.store';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import MultiRangeSlider, {
    MultiRangeSliderProps,
} from './ui/third-party/MultiRangeSlider/MultiRangeSlider';
import classNames from 'classnames';

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

function SearchMovieSlider(
    sliderProps: Omit<MultiRangeSliderProps, 'min' | 'max'>
) {
    const { min, max } = useSearchMoviesStore(
        useShallow((state) => {
            let min = 0;
            let max = 0;

            if (state.data && state.data.length > 0) {
                const years = state.data.map((movie) =>
                    Number.parseInt(movie.Year)
                );
                min = Math.min(...years);
                max = Math.max(...years);
            }

            return { min, max };
        })
    );

    return (
        <MultiRangeSlider
            min={min || new Date().getFullYear() - 100}
            max={max || new Date().getFullYear()}
            {...sliderProps}
        />
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
    const searchActions = useSearchMoviesStore(
        useShallow((state) => state.actions)
    );
    const [movieType, setMovieType] = useState<SearchMovieType>(
        propType ?? 'any'
    );
    const searchRef = useRef<HTMLInputElement>(null);

    const searchMovie = useCallback(searchActions.searchMovie, []);

    const triggerSearch = useCallback(() => {
        const searchValue = searchRef.current?.value || '';
        if (searchValue) {
            let type;
            if (movieType !== 'any') {
                type = movieType;
            }
            searchMovie({ s: searchValue, type }, true);
            return true;
        } else {
            return false;
        }
    }, [movieType, searchRef, searchMovie]);

    useEffect(() => {
        triggerSearch();
    }, [movieType]);

    // FUNCTION HANDLERS

    const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const triggered = triggerSearch();
        if (!triggered) {
            searchMovie({ s: '' }, true);
        }
    };

    const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovieType(e.target.value as SearchMovieType);
    };

    return (
        <form
            onSubmit={handleSearch}
            className="flex justify-between"
            data-testid="search-form"
        >
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
                        data-testid="default-search"
                        defaultValue={search}
                        onFocus={() => searchRef.current?.select()}
                        ref={searchRef}
                        className="block w-full py-4 px-[55px] text-xl bg-transparent text-white focus:ring-0 focus:border-transparent focus:ring-offset-0 focus:outline-none"
                        placeholder="Search Movies..."
                    />
                </div>
            </div>

            <div className="flex gap-10">
                <div>
                    <h5 className="uppercase">Year</h5>
                    <SearchMovieSlider
                        onChange={() => {}}
                        onChangeEnd={(changes) => {
                            alert(
                                'Feature not available! Coming soon once API has been updated.'
                            );
                            console.log(
                                'TODO: implement date range filter once API is updated: ',
                                changes
                            );
                        }}
                        disabledMessage="Coming soon. API feature still in development"
                    />
                </div>
                <div>
                    <h5 className="uppercase">Type</h5>
                    <div className="flex gap-5" data-testid="radio-types">
                        {[
                            ['any', 'Any'],
                            ['movie', 'Movie'],
                            ['series', 'Series'],
                            ['episodes', 'Episodes', 'disabled'],
                        ].map(([key, name, disabled]) => (
                            <div key={key} className="inline-flex items-center">
                                <label
                                    className={classNames(
                                        'relative flex items-center gap-2 cursor-pointer text-white',
                                        { 'cursor-not-allowed': disabled }
                                    )}
                                    htmlFor={key}
                                >
                                    <input
                                        name="inline-radio-group"
                                        type="radio"
                                        className="peer h-5 w-5 cursor-pointer disabled:cursor-not-allowed appearance-none rounded-full border-2 border-white checked:border-white transition-all disabled:border-primary-light disabled:opacity-50"
                                        id={key}
                                        data-testid={`radio-type-${key}`}
                                        value={key}
                                        onChange={onOptionChange}
                                        checked={movieType === key}
                                        disabled={!!disabled}
                                    />
                                    <span className="absolute left-[10px] bg-white w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed transition-opacity duration-200 top-1/2 transform -translate-x-1/2 -translate-y-1/2 peer-disabled:opacity-50"></span>
                                    {name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SearchMovie;
