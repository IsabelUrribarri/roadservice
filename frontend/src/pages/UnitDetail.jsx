import { useState, useEffect } from "react";
import { getUnit, updateUnit } from "../services/unitService";
import { addFuelRecord } from "../services/fuelService";
import FuelForm from "../components/FuelTable";
import MetricsPanel from "../components/MetricCard";

export default function UnitDetail({ unitId }) {
  const [unit, setUnit] = useState(null);
  const [fuelRecords, setFuelRecords] = useState([]);
  const [metrics, setMetrics] = useState({});

  // Cargar datos de la unidad
  const loadUnit = async () => {
    const data = await getUnit(unitId);
    setUnit(data);
    // Si tu API devuelve registros de combustible dentro de la unidad:
    setFuelRecords(data.fuelRecords || []);
  };

  // Cargar métricas calculadas (ejemplo: consumo promedio, costo total)
  const loadMetrics = () => {
    if (!fuelRecords.length) {
      setMetrics({});
      return;
    }
    const totalFuel = fuelRecords.reduce((acc, r) => acc + r.fuel, 0);
    const totalCost = fuelRecords.reduce((acc, r) => acc + r.total, 0);
    const totalMiles = fuelRecords.reduce((acc, r) => acc + r.miles, 0);
    const consumption = totalMiles / totalFuel;

    setMetrics({ totalFuel, totalCost, totalMiles, consumption });
  };

  useEffect(() => {
    loadUnit();
  }, [unitId]);

  useEffect(() => {
    loadMetrics();
  }, [fuelRecords]);

  // Guardar nuevo registro de combustible
  const handleFuelSaved = async (payload) => {
    await addFuelRecord(payload);
    await loadUnit(); // recarga los datos de la unidad incluyendo los registros
  };

  // Guardar cambios de la unidad
  const handleUnitUpdate = async (updatedData) => {
    await updateUnit(unitId, updatedData);
    await loadUnit();
  };

  if (!unit) return <p>Cargando unidad...</p>;

  return (
    <div>
      <h2>Detalle de la Unidad: {unit.name}</h2>
      <p>Placa: {unit.plate}</p>

      <MetricsPanel metrics={metrics} />

      <FuelForm
        fuelRecords={fuelRecords}
        vehicles={[unit]} // si el formulario necesita la lista de vehículos
        onFuelSaved={handleFuelSaved}
      />

      {/* Ejemplo de actualización de la unidad */}
      <button onClick={() => handleUnitUpdate({ name: unit.name + " ✏️" })}>
        Actualizar unidad
      </button>
    </div>
  );
}
