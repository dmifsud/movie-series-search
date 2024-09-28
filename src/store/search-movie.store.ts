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
}

export interface SearchMoviesActions {
    searchMovie: (filter: TitleSearchQuery) => void;
    searchMovieByTitle: (
        title: string,
        filter?: SearchFilter,
        updateQueryString?: boolean
    ) => void;
    searchMore: () => void;
}

const initialState: SearchMoviesStore = {
    loading: false,
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
                    // TODO: keep this DRY
                    const nextPage = page + 1;
                    const result = await OmdbApi.titleSearch({
                        ...query,
                        page: nextPage,
                    });
                    const total = +result.totalResults;
                    const totalPages = total / pageCount;
                    console.log(nextPage, totalPages, nextPage < totalPages);
                    set({
                        loading: false,
                        data: [...(data ?? []), ...result.Search],
                        totalResults: total,
                        canLoadMore: nextPage < totalPages,
                        page: nextPage,
                    });
                } catch (error: any) {
                    set({ loading: false, error: error.message });
                }
            } else {
                console.error('Could not load more!');
            }
        },
        searchMovie: async (filter: TitleSearchQuery) => {
            set({ ...initialState, loading: true });
            try {
                const result = await OmdbApi.titleSearch(filter);
                const total = +result.totalResults;
                set({
                    loading: false,
                    data: result.Search,
                    totalResults: total,
                    canLoadMore: result.Search.length < total,
                    query: filter,
                });
            } catch (error: any) {
                set({ loading: false, error: error.message });
            }
        },
        searchMovieByTitle: async (
            title: string,
            filter?: SearchFilter,
            updateQueryString?: boolean
        ) => {
            set({ ...initialState, loading: true });
            try {
                const query = { s: title, ...filter };
                const result = await OmdbApi.titleSearch(query);
                const total = +result.totalResults;
                set({
                    loading: false,
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
                set({ loading: false, error: error.message });
            }
        },
    },
}));

export default useSearchMoviesStore;
