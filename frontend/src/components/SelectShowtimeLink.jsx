import Link from 'next/link';

const SelectShowtimeLink = ({ id }) => (
    <div className="mt-8 text-center">
        <Link href={`/select-showtime/${id}`} className="text-2xl font-bold text-center text-secondary-dark hover:text-secondary bg-primary p-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Seleccionar Función
        </Link>
    </div>
);

export default SelectShowtimeLink;
