const MovieTrailer = ({ trailerKey, title }) => {
    return (
        <div className="flex justify-center items-center mt-6 w-full h-64 sm:h-96">
            {trailerKey ? (
                <iframe
                    className="w-full h-full rounded-lg shadow-md"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title={`${title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <p className="text-center">No hay tráiler disponible.</p>
            )}
        </div>
    );
};

export default MovieTrailer;
