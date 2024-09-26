import { MovieModel } from '@api/models/omdb.schema';
import { OmdbApi } from '@api/omdb.api';
import { CrudSlice, StateSlice } from "@store/store.types";
import { create } from 'zustand';
import useMovieWatchlistStore from './movie-watchlist.store';


export interface GetMovieStore extends CrudSlice<MovieModel> {
    inWatchlist: boolean | null;
    
}

export interface GetMovieActions {
    getMovieByImdbID: (imdbID: string) => void;
    setWatchList: (id: string, inWatchlist: boolean) => void;
}

const initialState: Omit<GetMovieStore, 'setWatchList'> = {
  loading: false,
  error: null,
  data: null,
  inWatchlist: null,
};

const useGetMovieStore = create<
  StateSlice<GetMovieStore, GetMovieActions>
>()(
    (set, get) => ({
        ...initialState,
        actions: {
          getMovieByImdbID: async (imdbID: string) => {
              set({ loading: true });
              try {
                const result = await OmdbApi.getId(imdbID);
                console.log('movies in watchlist', useMovieWatchlistStore.getState().movies);
                const inWatchlist = useMovieWatchlistStore.getState().movies.some(movie => movie.id === imdbID);
                set({ loading: false, data: result, inWatchlist });
                
              } catch (error: any) {
                set({ loading: false, error: error.message });
              }
            },
            setWatchList: (id: string, inWatchlist: boolean) => {
                const { data } = get();
                if (data?.imdbID === id) {
                    set({ inWatchlist });
                }
              }
          },
      })
);

export default useGetMovieStore;


