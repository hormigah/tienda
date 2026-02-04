import './Loading.css';

export default function Loading() {
  return (
    <div className="Loading">
      <div className="Loading__container">
        <div className="Loading__spinner" />
        <p className="Loading__text">Cargando...</p>
      </div>
    </div>
  );
}
