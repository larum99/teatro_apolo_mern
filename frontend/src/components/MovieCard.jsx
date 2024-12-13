'use client';
import Link from "next/link";

const MovieCard = ({ movie, genres }) => {
    const movieGenres = movie.genre_ids.map((id) => genres[id]).join(', ');

    return (
        <Link href={`/movie/${movie.id}`} passHref>
            <div className="flex-none w-64 p-2 bg-primary rounded-lg shadow-md transform transition-transform hover:scale-110">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-[400px] rounded-lg"
                />
                <h3 className="text-center text-lg font-medium mt-2 text-secondary truncate hover:overflow-visible hover:whitespace-normal hover:bg-primary">
                    {movie.original_title}
                </h3>
                <p className="text-center text-sm text-secondary-dark truncate">
                    Fecha de lanzamiento: {movie.release_date}
                </p>
                <p className="text-center text-sm text-textLight truncate hover:overflow-visible hover:whitespace-normal hover:bg-primary">
                    Géneros: {movieGenres || 'No disponibles'}
                </p>
            </div>
        </Link>
    );
};

export default MovieCard;
