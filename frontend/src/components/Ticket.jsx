import { useState } from 'react';

const Ticket = ({ movie, selectedShowtime, selectedSeats, userId }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const total = selectedSeats.length * 10000;

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const ticketData = {
            movieTitle: movie.title,
            showtime: `${selectedShowtime.showTime} en Sala ${selectedShowtime.roomId}`,
            seats: selectedSeats.map(seat => seat.name),
            total: total,
        };

        try {
            const response = await fetch('http://localhost:4200/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ticketData),
            });

            if (response.ok) {
                alert('Ticket comprado exitosamente');
                window.location.href = '/';
            } else {
                throw new Error('Error al comprar el ticket');
            }
        } catch (error) {
            console.error(error);
            alert('Hubo un problema al comprar el ticket');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-6 bg-primary-extraLight p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-secondary-dark mb-4">Detalles del Ticket</h2>
            <p><strong>Película:</strong> {movie.title}</p>
            <p><strong>Función:</strong> {selectedShowtime.showTime} en Sala {selectedShowtime.roomId}</p>
            <p><strong>Asientos:</strong></p>
            <ul>
                {selectedSeats.map(seat => (
                    <li key={seat.id}>{seat.name}</li>
                ))}
            </ul>
            <p><strong>Total:</strong> {total.toLocaleString()} COP</p>
            <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="mt-4 bg-primary text-white p-2 rounded-lg"
            >
                {isSubmitting ? 'Procesando...' : 'Confirmar compra'}
            </button>
        </div>
    );
};

export default Ticket;
