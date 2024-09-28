import { MovieModel } from '@api/models/omdb.schema';

export interface MovieListItemProps extends React.DOMAttributes<{}> {
    movie: MovieModel;
}

function MovieListItem({ movie, ...htmlAttr }: MovieListItemProps) {
    return (
        <div
            {...htmlAttr}
            className="flex gap-3 flex-row px-6 py-8 cursor-pointer hover:bg-primary-light border-b-2 border-b-secondary border-solid"
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
