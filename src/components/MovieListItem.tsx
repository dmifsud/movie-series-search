import { MovieModel } from '@api/models/omdb.schema';
import MovieCard from './ui/MovieCard';
import useIsMovieSelectedSelector from '@store/selectors/useIsMovieSelectedSelector';
import Skeleton from 'react-loading-skeleton';

export interface MovieListItemProps extends React.DOMAttributes<{}> {
    movie?: MovieModel;
    showSkeleton?: boolean;
}

function MovieListItem({
    movie,
    showSkeleton,
    ...htmlAttr
}: MovieListItemProps) {
    let isSelected = false;
    if (movie) {
        isSelected = useIsMovieSelectedSelector(movie.imdbID);
    }

    const displaySkeleton = !movie && showSkeleton;

    return (
        <div
            {...htmlAttr}
            className={`${isSelected ? 'bg-primary-light ' : ''}flex gap-3 flex-row p-8 cursor-pointer hover:bg-primary-light border-b-2 border-b-secondary border-solid`}
        >
            <div className="min-w-[20%]">
                {movie && (
                    <MovieCard posterUrl={movie.Poster} title={movie.Title} />
                )}
                {displaySkeleton && <Skeleton width={60} height={60} />}
            </div>
            <div className="flex-grow">
                {movie && (
                    <>
                        <p className="text-xl text-primary">{movie.Title}</p>
                        <p className="text-secondary">{movie.Year}</p>
                    </>
                )}
                {displaySkeleton && (
                    <>
                        <p className="mb-4">
                            <Skeleton count={1} height={20} />
                        </p>
                        <p>
                            <Skeleton count={1} width={50} />
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default MovieListItem;
