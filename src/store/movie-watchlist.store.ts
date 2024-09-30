import { MovieModel } from '@api/models/omdb.schema';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StateSlice } from './store.types';
import useGetMovieStore from './get-movie.store';

export interface MovieWatchlistStore {
    movies: { id: string; movie: MovieModel; dateAdded: string }[];
}

export interface MovieWatchlistStoreActions {
    setMovieToWatchlist: (movie: MovieModel) => void;
    removeMovieFromWatchlist: (id: string) => void;
}

const initialState: MovieWatchlistStore = {
    movies: [],
};

const useMovieWatchlistStore = create<
    StateSlice<MovieWatchlistStore, MovieWatchlistStoreActions>
>()(
    persist(
        (set, get) => ({
            ...initialState,
            actions: {
                setMovieToWatchlist: (movie: MovieModel) => {
                    const { movies } = get();
                    if (movies.some((m) => m.id === movie.imdbID)) {
                        console.warn(
                            'Warning! Movie already added in watchlist'
                        );
                    } else {
                        set({
                            movies: [
                                ...movies,
                                {
                                    id: movie.imdbID,
                                    movie,
                                    dateAdded: new Date().toISOString(),
                                },
                            ],
                        });
                        useGetMovieStore
                            .getState()
                            .actions.setWatchList(movie.imdbID, true);
                    }
                },
                removeMovieFromWatchlist: (id: string) => {
                    console.log('todo: remove movie from watchlist', id);
                    const { movies } = get();
                    set({ movies: movies.filter((m) => m.id !== id) }, false);
                    useGetMovieStore.getState().actions.setWatchList(id, false);
                },
            },
        }),
        {
            name: 'watchlist-storage',
            partialize: (state) => {
                return {
                    movies: state.movies,
                };
            },
        }
    )
);

export default useMovieWatchlistStore;
