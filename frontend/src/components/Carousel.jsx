import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import MovieCard from './MovieCard';
import { Autoplay, Navigation } from 'swiper/modules';

const Carousel = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

                const genresResponse = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list`,
                    {
                        params: {
                            api_key: apiKey,
                            language: 'es-ES',
                        },
                    }
                );
                const genresMap = genresResponse.data.genres.reduce((map, genre) => {
                    map[genre.id] = genre.name;
                    return map;
                }, {});

                const moviesResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/now_playing`,
                    {
                        params: {
                            api_key: apiKey,
                            language: 'es-ES',
                        },
                    }
                );

                const today = new Date();
                const recentMovies = moviesResponse.data.results.filter((movie) => {
                    const releaseDate = new Date(movie.release_date);
                    const differenceInDays = (today - releaseDate) / (1000 * 60 * 60 * 24);
                    return differenceInDays <= 30;
                });

                setMovies(recentMovies);
                setGenres(genresMap);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener datos:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return <div className="text-center p-6">Cargando películas...</div>;
    }

    if (!movies.length) {
        return <div className="text-center p-6">No se encontraron películas en cartelera.</div>;
    }

    return (
        <div className="w-full h-96 bg-primary-light py-6 overflow-visible relative">
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={10}
                slidesPerView={5}
                centeredSlides={true}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                className='overflow-visible'
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id} className="w-full h-auto overflow-visible">
                        <MovieCard movie={movie} genres={genres} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
        </div>
    );
};

export default Carousel;
