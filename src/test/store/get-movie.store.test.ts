import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import useGetMovieStore from '@store/get-movie.store';
import { OmdbApi } from '@api/omdb.api';
import movieMock from '../mocks/movie.mock.json';
import { MovieModel } from '@api/models/omdb.schema';

describe('GetMovieStore', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear mocks before each test
    });

    afterEach(() => {
        const { result } = renderHook(() => useGetMovieStore());
        act(() => {
            result.current.actions.reset();
        });
    });

    it('should pass', () => {
        expect(true).toBe(true);
    });

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useGetMovieStore());

        expect(result.current.data).toBeNull();
        expect(result.current.optimisticSelectionId).toEqual(null);
        expect(result.current.error).toEqual(null);
        expect(result.current.inWatchlist).toEqual(null);
        expect(result.current.loading).toEqual(false);
    });

    describe('Get movie', () => {
        const mockId = 'tt0118826';

        beforeEach(() => {
            vi.spyOn(OmdbApi, 'getId').mockReturnValue(
                Promise.resolve(movieMock as MovieModel)
            );
        });

        it('should get movie by id', async () => {
            const { result } = renderHook(() => useGetMovieStore());
            act(() => {
                result.current.actions.getMovieByImdbID(mockId);
            });

            await waitFor(() => expect(result.current.data).toBeDefined());

            expect(result.current.data).toEqual(movieMock);
            expect(result.current.inWatchlist).toBe(false);
        });

        it('should set movie in watchlist', async () => {
            const { result } = renderHook(() => useGetMovieStore());
            act(() => {
                result.current.actions.getMovieByImdbID(mockId);
            });

            await waitFor(() => expect(result.current.data).toBeDefined());

            act(() => {
                result.current.actions.setWatchList(mockId, true);
            });

            expect(result.current.inWatchlist).toBe(true);

            act(() => {
                result.current.actions.setWatchList(mockId, false);
            });

            expect(result.current.inWatchlist).toBe(false);

            // try to set wrong movie id to watchlist

            act(() => {
                result.current.actions.setWatchList('wrong-id', true);
            });

            expect(result.current.inWatchlist).toBe(false);
        });
    });
});
