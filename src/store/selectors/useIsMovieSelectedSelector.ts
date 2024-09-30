import useGetMovieStore from '@store/get-movie.store';
import { useShallow } from 'zustand/shallow';

function useIsMovieSelectedSelector(movieId: string) {
    const { isSelected } = useGetMovieStore(
        useShallow((state) => ({
            isSelected: state?.optimisticSelectionId === movieId,
        }))
    );

    return isSelected;
}

export default useIsMovieSelectedSelector;
