import { MovieModel } from '@api/models/omdb.schema';
import { OmdbApi } from '@api/omdb.api';
import { CrudSlice, StateSlice } from "@store/store.types";
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { devtoolsConfig } from './store.utils';
import useMovieWishlistStore from './movie-wishlist.store';


export interface GetMovieStore extends CrudSlice<MovieModel> {
    inWishlist: boolean | null;
    setWishList: (id: string, inWishlist: boolean) => void;
}

export interface GetMovieActions {
    getMovieByImdbID: (imdbID: string) => void;
    
}

const initialState: Omit<GetMovieStore, 'setWishList'> = {
  loading: false,
  error: null,
  data: null,
  inWishlist: null,
};

const useGetMovieStore = create<
  StateSlice<GetMovieStore, GetMovieActions>
>()(
  devtools(
    (set, get) => ({
      ...initialState,
      setWishList: (id: string, inWishlist: boolean) => {
        const { data } = get();
        if (data?.imdbID === id) {
            set({ inWishlist }, false, 'GET_MOVIE_SET_WISHLIST');
        }
      },
      actions: {
        getMovieByImdbID: async (imdbID: string) => {
            set({ loading: true }, false, 'GET_MOVIE_BY_ID');
            try {
              const result = await OmdbApi.getId(imdbID);
              console.log('movies in wishlist', useMovieWishlistStore.getState().movies);
              const inWishlist = useMovieWishlistStore.getState().movies.some(movie => movie.id === imdbID);
              set({ loading: false, data: result, inWishlist }, false, 'GET_MOVIE_BY_ID_SUCCESS');
              
            } catch (error: any) {
              set({ loading: false, error: error.message }, false, 'GET_MOVIE_BY_ID_ERROR');
            }
          },
        },
    }),
    devtoolsConfig("GetMovieStore")
  )
);

export default useGetMovieStore;


