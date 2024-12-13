'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectShowtimeGrid = ({ movieId, onShowtimeSelect }) => {
    const [showtimes, setShowtimes] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShowtimes = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/showtimes/${movieId}`);
                setShowtimes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener las funciones:', error);
                setError('Error al cargar las funciones disponibles.');
                setLoading(false);
            }
        };

        fetchShowtimes();
    }, [movieId]);

    if (loading) {
        return <div className="text-center p-6">Cargando funciones...</div>;
    }

    if (error) {
        return <div className="text-center p-6 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6 bg-primary-light rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-textLight mb-6 text-center">Selecciona una función</h2>
            <div className="space-y-6">
                {/* Iterar sobre las claves (nombres de salas) */}
                {Object.keys(showtimes).map((roomName) => (
                    <div key={roomName} className="border-t-2 border-secondary-light pt-6">
                        <h3 className="text-xl font-bold text-secondary-dark mb-4">{roomName}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {showtimes[roomName].map((showtime) => {
                                // Asegurarse de que showtime._id está disponible
                                const key = showtime?._id ? `${roomName}-${showtime._id}` : `${roomName}-${Math.random()}`;
                                return (
                                    <div
                                        key={key}  // Usar una clave válida o fallback
                                        className="p-4 rounded-lg border border-secondary-light cursor-pointer hover:scale-105 transition-all transform bg-secondary-light shadow-md hover:bg-secondary-dark text-white"
                                        onClick={() => onShowtimeSelect({ showtimeId: showtime._id, roomId: roomName })}
                                    >
                                        <h4 className="text-lg font-semibold">{showtime.showTime}</h4>
                                        <p className="text-sm text-gray-200">Fecha: {showtime.showDate}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectShowtimeGrid;
