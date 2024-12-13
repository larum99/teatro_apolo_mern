import axios from 'axios';
import MovieHeader from '@/components/MovieHeader';
import MovieDetails from '@/components/MovieDetails';
import MovieTrailer from '@/components/MovieTrailer';
import SelectShowtimeLink from '@/components/SelectShowtimeLink';

const MovieDetail = async ({ params }) => {
    const { id } = await params;
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    // Obtener detalles de la película
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: { api_key: apiKey, language: 'es-ES' },
    });
    const movie = response.data;

    // Obtener videos de la película
    const videosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
        params: { api_key: apiKey, language: 'es-ES' },
    });
    const trailer = videosResponse.data.results.find((video) => video.type === 'Trailer');

    return (
        <div className="p-6 bg-primary-light">
            <MovieHeader title={movie.title} />
            <div className="flex flex-col lg:flex-row gap-6 m-6 items-center">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-72 h-auto max-h-[450px] rounded-lg object-cover"
                />
                <MovieDetails
                    overview={movie.overview}
                    releaseDate={movie.release_date}
                    genres={movie.genres}
                />
                <MovieTrailer trailerKey={trailer?.key} title={movie.title} />
            </div>
            <SelectShowtimeLink id={id} />
        </div>
    );
};

export default MovieDetail;
