import { MovieModel } from "@api/models/omdb.schema";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { devtoolsConfig } from "./store.utils";
import { StateSlice } from "./store.types";
import useGetMovieStore from "./get-movie.store";

export interface MovieWishlistStore {
    movies: { id: string; movie: MovieModel; dateAdded: string; }[]
}

export interface MovieWishlistStoreActions {
    setMovieToWishlist: (movie: MovieModel) => void;
    removeMovieFromWishlist: (id: string) => void;
}

const initialState: MovieWishlistStore = {
    movies: []
};

const useMovieWishlistStore = create<StateSlice<MovieWishlistStore, MovieWishlistStoreActions>>()(
    devtools(
        persist(
            (set, get) => ({
                ...initialState,
                actions: {
                    setMovieToWishlist: (movie: MovieModel) => {
                        console.log('todo: set movie', movie);
                        const { movies } = get();
                        if (movies.some(m => m.id === movie.imdbID)) {
                            console.warn('Warning! Movie already added in wishlist');
                        } else {
                            set({ movies: [...movies, { id: movie.imdbID, movie, dateAdded: new Date().toISOString() }]}, false, 'SET_MOVIE_TO_WISHLIST');
                            useGetMovieStore.getState().setWishList(movie.imdbID, true);
                        }
                    },
                    removeMovieFromWishlist: (id: string) => {
                        console.log('todo: remove movie from wishlist', id);
                        const { movies } = get();
                        set({ movies: movies.filter(m => m.id !== id)}, false, 'REMOVE_MOVIE_FROM_WISHLIST');
                        useGetMovieStore.getState().setWishList(id, false);
                    },
                }
            }),
            {
                name: 'wishlist-storage',
                partialize: (state) =>
                    {
                        return {
                            movies: state.movies
                        }
                    },
            }
        ),
        devtoolsConfig('MovieWishlistStore')
    )
);

export default useMovieWishlistStore;