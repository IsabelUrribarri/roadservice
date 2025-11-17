import React from 'react';
import { Link } from 'react-router-dom';

export default function UnitCard({ unit }) {
  return (
    <div className="card">
      <h3>{unit.name} <span className="small">({unit.plate})</span></h3>
      <p className="small">Millas: {unit.totalMiles ?? 0}</p>
      <Link to={`/units/${unit.id}`} className="button">Ver detalles</Link>
    </div>
  );
}
