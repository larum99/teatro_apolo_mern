'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from '@/components/Carousel';

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAPI = async () => {
            try {
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                await axios.get(`${apiBaseUrl}/movies/now-playing`);
                setLoading(false);
            } catch (error) {
                console.error('Error al conectarse con el backend:', error);
            }
        };

        checkAPI();
    }, []);

    if (loading) {
        return <div className="text-center p-6">Cargando datos...</div>;
    }

    return (
        <div className="min-h-screen bg-primary-light pl-1">
            <Carousel />
        </div>
    );
}
