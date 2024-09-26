import { TitleSearchQuery, TitleSearchResponse } from '@api/models/omdb.schema';
import { OmdbApi } from '@api/omdb.api';
import { CrudSlice, StateSlice } from "@store/store.types";
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { devtoolsConfig } from './store.utils';

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
  devtools(
    (set) => ({
      ...initialState,
      actions: {
        searchMovieByTitle: async (title: string, filter?: SearchFilter) => {
          set({ loading: true }, false, 'SEARCH_MOVIE_BY_TITLE');
          try {
            const result = await OmdbApi.titleSearch({ s: title, ...filter });
            set({ loading: false, data: result.Search, totalResults: +result.totalResults }, false, 'SEARCH_MOVIE_BY_TITLE_SUCCESS');
            
          } catch (error: any) {
            set({ loading: false, error: error.message }, false, 'SEARCH_MOVIE_BY_TITLE_ERROR');
          }
        },
      },
    }),
    devtoolsConfig("SearchMoviesStore")
  )
);

export default useSearchMoviesStore;