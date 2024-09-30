import { MovieModel } from '@api/models/omdb.schema';
import MovieCard from './ui/MovieCard';
import useIsMovieSelectedSelector from '@store/selectors/useIsMovieSelectedSelector';

export interface MovieListItemProps extends React.DOMAttributes<{}> {
    movie: MovieModel;
}

function MovieListItem({ movie, ...htmlAttr }: MovieListItemProps) {
    const isSelected = useIsMovieSelectedSelector(movie.imdbID);

    return (
        <div
            {...htmlAttr}
            className={`${isSelected ? 'bg-primary-light ' : ''}flex gap-3 flex-row p-8 cursor-pointer hover:bg-primary-light border-b-2 border-b-secondary border-solid`}
        >
            <div className="min-w-[20%]">
                <MovieCard posterUrl={movie.Poster} title={movie.Title} />
            </div>
            <div className="flex-grow">
                <p className="text-xl text-primary">{movie.Title}</p>
                <p className="text-secondary">{movie.Year}</p>
            </div>
        </div>
    );
}

export default MovieListItem;
