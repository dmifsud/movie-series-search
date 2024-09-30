import { TitleSearchQuery, TitleSearchResponse } from '@api/models/omdb.schema';
import { OmdbApi } from '@api/omdb.api';
import { CrudSlice, StateSlice } from '@store/store.types';
import updateQueryStringHelper from '@utils/updateQueryString';
import { create } from 'zustand';
type SearchFilter = Omit<TitleSearchQuery, 'r' | 'callback'>;

const pageCount = 10;

export interface SearchMoviesStore
    extends CrudSlice<TitleSearchResponse['Search']> {
    totalResults: number | null;
    canLoadMore: boolean;
    page: number;
    query: SearchFilter | null;
    initialLoading: boolean;
}

export interface SearchMoviesActions {
    searchMovie: (
        filter: TitleSearchQuery,
        updateQueryString?: boolean
    ) => void;
    searchMore: () => void;
}

const initialState: SearchMoviesStore = {
    loading: false,
    initialLoading: false,
    error: null,
    data: null,
    totalResults: null,
    canLoadMore: false,
    page: 1,
    query: null,
};

const useSearchMoviesStore = create<
    StateSlice<SearchMoviesStore, SearchMoviesActions>
>()((set, get) => ({
    ...initialState,
    actions: {
        searchMore: async () => {
            const { page, query, canLoadMore, data } = get();
            if (query && canLoadMore) {
                set({ loading: true });
                try {
                    const nextPage = page + 1;
                    const result = await OmdbApi.titleSearch({
                        ...query,
                        page: nextPage,
                    });
                    if (result.Response === 'False') {
                        throw Error(result.Error);
                    }
                    const total = +result.totalResults;
                    const totalPages = total / pageCount;
                    set({
                        loading: false,
                        data: [...(data ?? []), ...result.Search],
                        totalResults: total,
                        canLoadMore: nextPage < totalPages,
                        page: nextPage,
                    });
                } catch (error: any) {
                    set({ ...initialState, error: error.message });
                }
            } else {
                console.error('Could not load more!');
            }
        },
        searchMovie: async (
            query: TitleSearchQuery,
            updateQueryString?: boolean
        ) => {
            if (query.s) {
                set({ ...initialState, initialLoading: true });
                try {
                    const result = await OmdbApi.titleSearch(query);
                    if (result.Response === 'False') {
                        throw Error(result.Error);
                    }
                    const total = +result.totalResults;
                    set({
                        initialLoading: false,
                        data: result.Search,
                        totalResults: total,
                        canLoadMore: result.Search.length < total,
                        query,
                    });
                    if (updateQueryString) {
                        updateQueryStringHelper(
                            query as any as Record<string, string>
                        );
                    }
                } catch (error: any) {
                    set({ ...initialState, error: error.message });
                }
            } else {
                set({ ...initialState });
            }
        },
    },
}));

export default useSearchMoviesStore;
