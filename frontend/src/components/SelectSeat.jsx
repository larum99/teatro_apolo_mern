'use client'
import React, { useState } from 'react';
import axios from 'axios';

const SelectSeat = ({ seats, onSeatSelect, onConfirm }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [updatedSeats, setUpdatedSeats] = useState(seats);

    const handleSeatClick = async (seatId) => {
        if (selectedSeats.some(seat => seat.id === seatId)) {
            // Si el asiento ya está seleccionado, lo deseleccionamos
            setSelectedSeats(selectedSeats.filter(seat => seat.id !== seatId));
            const updatedSeatsList = updatedSeats.map((seat) =>
                seat._id === seatId ? { ...seat, status: 'available' } : seat
            );
            setUpdatedSeats(updatedSeatsList);
        } else {
            // Si el asiento no está seleccionado, lo reservamos
            try {
                const response = await axios.put(`http://localhost:4200/seats/reserve/${seatId}`);
                const updatedSeatsList = updatedSeats.map((seat) =>
                    seat._id === seatId ? { ...seat, status: 'reserved' } : seat
                );
                setUpdatedSeats(updatedSeatsList);

                const reservedSeat = updatedSeatsList.find(seat => seat._id === seatId);
                setSelectedSeats((prevSelectedSeats) => [
                    ...prevSelectedSeats,
                    { id: seatId, name: `${reservedSeat.row}${reservedSeat.number}` }
                ]);
            } catch (error) {
                console.error('Error al reservar el asiento:', error);
            }
        }
    };

    // Confirmar la selección de asientos y pasarlos al componente padre
    const handleConfirm = () => {
        onSeatSelect(selectedSeats);  // Pasar los asientos seleccionados al componente padre
        onConfirm();  // Llamar a onConfirm para cambiar el estado en el componente padre
    };

    return (
        <div>
            <div className="grid grid-cols-5 gap-2">
                {updatedSeats.map((seat) => (
                    <button
                        key={seat._id}
                        onClick={() => handleSeatClick(seat._id)}
                        className={`px-2 py-1 text-xs rounded-lg ${ 
                            seat.status === 'available' 
                                ? selectedSeats.some(selectedSeat => selectedSeat.id === seat._id) 
                                    ? 'bg-primary-extraLight'  
                                    : 'bg-secondary-dark hover:bg-secondary-light'
                                : 'bg-primary-extraLight'
                        } text-textLight`}
                        disabled={seat.status !== 'available'}
                    >
                        {seat.row}-{seat.number}
                    </button>
                ))}
            </div>

            <div className="mt-4">
                <h3>Asientos seleccionados:</h3>
                <ul>
                    {selectedSeats.map((seat) => (
                        <li key={seat.id}>{seat.name}</li>
                    ))}
                </ul>
            </div>

            {selectedSeats.length > 0 && (
                <div className="flex items-center justify-center mt-4">
                    <button
                        onClick={handleConfirm}
                        className="bg-primary text-textLight py-2 px-4 rounded hover:bg-primary-extraLight"
                    >
                        Confirmar
                    </button>
                </div>
            )}
        </div>
    );
};

export default SelectSeat;
