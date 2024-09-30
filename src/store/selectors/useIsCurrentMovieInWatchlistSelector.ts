import useGetMovieStore from '@store/get-movie.store';
import { useShallow } from 'zustand/shallow';

function useIsCurrentMovieInWatchlistSelector() {
    const { inWatchlist } = useGetMovieStore(
        useShallow((state) => ({ inWatchlist: state.inWatchlist }))
    );

    return inWatchlist;
}

export default useIsCurrentMovieInWatchlistSelector;
