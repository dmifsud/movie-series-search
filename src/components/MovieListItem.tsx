import { MovieModel } from '@api/models/omdb.schema';
import useGetMovieStore from '@store/get-movie.store';
import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';

function useIsSelected(movieId: string) {
    const { updatedMovieId } = useGetMovieStore(
        useShallow((state) => ({
            updatedMovieId: state.data?.imdbID,
        }))
    );
    const [isSelected, setIsSelected] = useState(updatedMovieId === movieId);

    useMemo(() => {
        setIsSelected(updatedMovieId === movieId);
    }, [updatedMovieId, movieId]);

    return useMemo(
        () => ({
            isSelected,
        }),
        [isSelected]
    );
}

export interface MovieListItemProps extends React.DOMAttributes<{}> {
    movie: MovieModel;
}

function MovieListItem({ movie, ...htmlAttr }: MovieListItemProps) {
    const { isSelected } = useIsSelected(movie.imdbID);

    console.log('todo: optimize re-render', isSelected, movie.imdbID);
    return (
        <div
            {...htmlAttr}
            className={`${isSelected ? 'bg-primary-light ' : ''}flex gap-3 flex-row p-8 cursor-pointer hover:bg-primary-light border-b-2 border-b-secondary border-solid`}
        >
            <div className="min-w-[20%]">
                <div className="w-full relative pt-[100%] overflow-hidden rounded-md">
                    <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="absolute top-0"
                    />
                </div>
            </div>
            <div className="flex-grow">
                <p className="text-xl text-primary">{movie.Title}</p>
                <p className="text-secondary">{movie.Year}</p>
            </div>
        </div>
    );
}

export default MovieListItem;
