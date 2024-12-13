'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieHeader from '@/components/MovieHeader';
import SelectShowtimeGrid from '@/components/SelectShowtimeGrid';
import SelectSeat from '@/components/SelectSeat';
import Ticket from '@/components/Ticket';
import ProtectedRoute from '@/components/ProtectedRoute';

const SelectShowtime = ({ params }) => {
    const { id: movieId } = React.use(params);
    const [movie, setMovie] = useState(null);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loadingSeats, setLoadingSeats] = useState(false);
    const [errorSeats, setErrorSeats] = useState(null);
    const [showTicket, setShowTicket] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!movieId) return;

            try {
                const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                        language: 'es-ES',
                    },
                });
                setMovie(movieResponse.data);
            } catch (error) {
                console.error("Error al obtener los detalles de la película:", error.message);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    useEffect(() => {
        if (selectedShowtime) {
            setLoadingSeats(true);
            setErrorSeats(null);
            const fetchSeats = async () => {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/seats/${selectedShowtime.roomId}`);
                    setSeats(response.data);
                    setLoadingSeats(false);
                } catch (error) {
                    console.error('Error al obtener los asientos:', error);
                    setErrorSeats(error.response ? error.response.data.message : 'Error al obtener los asientos');
                    setLoadingSeats(false);
                }
            };

            fetchSeats();
        }
    }, [selectedShowtime]);

    const handleConfirm = () => {
        setShowTicket(true);
    };

    return (
        <ProtectedRoute>
            <div className="p-6 bg-primary-light flex flex-col items-center justify-center">
                <MovieHeader title={movie?.title} />
                <div className="flex flex-col lg:flex-row gap-6 m-6 items-start">
                    {movie ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-72 h-auto max-h-[450px] rounded-lg object-cover"
                        />
                    ) : (
                        <p className="text-white">Cargando información de la película...</p>
                    )}
                    {!selectedShowtime ? (
                        <SelectShowtimeGrid movieId={movieId} onShowtimeSelect={setSelectedShowtime} />
                    ) : showTicket ? (
                        <Ticket movie={movie} selectedShowtime={selectedShowtime} selectedSeats={selectedSeats} />
                    ) : (
                        <div className="w-full">
                            {loadingSeats ? (
                                <p className="text-white">Cargando asientos...</p>
                            ) : errorSeats ? (
                                <p className="text-red-500">{errorSeats}</p>
                            ) : (
                                <SelectSeat
                                    seats={seats}
                                    onSeatSelect={setSelectedSeats}
                                    onConfirm={handleConfirm}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default SelectShowtime;
