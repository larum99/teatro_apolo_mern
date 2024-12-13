const MovieDetails = ({ overview, releaseDate, genres }) => (
    <div>
        <p className="text-lg text-white text-justify">{overview}</p>
        <p className="text-lg text-secondary pt-3 text-center">
            Fecha de lanzamiento: {releaseDate}
        </p>
        <p className="text-lg text-secondary mt-2 text-center">
            Géneros: {genres.map((genre) => genre.name).join(', ')}
        </p>
    </div>
);

export default MovieDetails;
