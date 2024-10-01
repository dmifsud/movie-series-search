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

    it('should trigger search query on change of types', async () => {
        const mockSearch = 'Star Wars';
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

        const typesContainer = component.getByTestId(
            'radio-types'
        ) as HTMLDivElement;

        const types = typesContainer.querySelectorAll('input[type=radio]');

        expect(types.length).toBe(4);

        fireEvent.change(searchElement, { target: { value: mockSearch } });

        const movieTypeRadio = component.getByTestId(
            'radio-type-movie'
        ) as HTMLInputElement;

        fireEvent.click(movieTypeRadio);

        await waitFor(() =>
            expect(result.current.actions.searchMovie).toHaveBeenCalledWith(
                { s: mockSearch, type: 'movie' },
                true
            )
        );
    });
});
