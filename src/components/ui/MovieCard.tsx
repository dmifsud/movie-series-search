import { useState } from 'react';
import fallbackImg from '../../assets/movie-fallback-icon.png';
interface MovieCardProps {
    title: string;
    posterUrl: string;
    boxartRatio?: boolean;
}

function MoviePosterCard({ title, posterUrl, boxartRatio }: MovieCardProps) {
    const [imgUrl, setImgUrl] = useState(posterUrl);

    const handleFallbackImage = () => {
        setImgUrl(fallbackImg);
    };

    return (
        <span
            className={`inline-block relative w-full ${boxartRatio ? 'pt-[160%]' : 'pt-[100%]'}`}
        >
            <span className="rounded-md box-border overflow-hidden border-0 m-0 p-0 absolute top-0 left-0 right-0 bottom-0">
                <img
                    src={imgUrl}
                    onError={handleFallbackImage}
                    alt={title}
                    className="object-cover min-w-full max-w-full min-h-full max-h-full absolute"
                />
            </span>
        </span>
    );
}

export default MoviePosterCard;
