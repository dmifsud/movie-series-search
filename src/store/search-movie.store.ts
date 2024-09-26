import { TitleSearchQuery, TitleSearchResponse } from '@api/models/omdb.schema';
import { OmdbApi } from '@api/omdb.api';
import { CrudSlice, StateSlice } from "@store/store.types";
import { create } from 'zustand';

type SearchFilter = Omit<TitleSearchQuery, 's' | 'r' | 'callback'>;

export interface SearchMoviesStore
  extends CrudSlice<TitleSearchResponse['Search']> {
    totalResults: number | null;
  }

export interface SearchMoviesActions {
  searchMovieByTitle: (title: string, filter?: SearchFilter) => void;
}

const initialState: SearchMoviesStore = {
  loading: false,
  error: null,
  data: null,
  totalResults: null,
};

const useSearchMoviesStore = create<
  StateSlice<SearchMoviesStore, SearchMoviesActions>
>()(
  (set) => ({
    ...initialState,
    actions: {
      searchMovieByTitle: async (title: string, filter?: SearchFilter) => {
        set({ loading: true });
        try {
          const result = await OmdbApi.titleSearch({ s: title, ...filter });
          set({ loading: false, data: result.Search, totalResults: +result.totalResults });
          
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },
    },
  })
);

export default useSearchMoviesStore;