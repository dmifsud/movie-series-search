import SearchMovie from '@components/SearchMovie';
import useSearchMoviesStore from '@store/search-movie.store';
import {
    act,
    renderHook,
    render,
    waitFor,
    fireEvent,
} from '@testing-library/react';
import { afterEach, beforeEach, vi, it, describe, expect } from 'vitest';

describe('SearchMovie component', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear mocks before each test
    });

    afterEach(() => {
        const { result } = renderHook(() => useSearchMoviesStore());
        act(() => {
            result.current.actions.reset();
        });
    });

    it('should trigger search query on search', async () => {
        const mockSearch = 'The Castle';
        const { result } = renderHook(() => useSearchMoviesStore());

        act(() => {
            vi.spyOn(result.current.actions, 'searchMovie').mockImplementation(
                () => {}
            );
        });

        const component = render(<SearchMovie />);

        const searchElement = component.getByTestId(
            'default-search'
        ) as HTMLInputElement;

        const formElement = component.getByTestId(
            'search-form'
        ) as HTMLButtonElement;

        fireEvent.change(searchElement, { target: { value: mockSearch } });

        fireEvent.submit(formElement);

        await waitFor(() =>
            expect(result.current.actions.searchMovie).toHaveBeenCalledWith(
                { s: mockSearch },
                true
            )
        );
    });
});
