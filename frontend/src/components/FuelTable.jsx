import { useState, useEffect } from "react";
import { getFuelRecords, addFuelRecord, updateFuelRecord, deleteFuelRecord } from "../services/fuelService";
import { getUnits } from "../services/unitService";
import Modal from "./Modal";

export default function FuelTable() {
  const [records, setRecords] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [form, setForm] = useState({ date: "", vehicle: "", fuel: 0, price: 0, miles: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const fuelData = await getFuelRecords();
      const vehicleData = await getUnits();
      setRecords(fuelData);
      setVehicles(vehicleData);
    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  };

  const handleAdd = () => {
    setEditRecord(null);
    setForm({ date: "", vehicle: "", fuel: 0, price: 0, miles: 0 });
    setShowModal(true);
  };

  const handleEdit = (r) => {
    setEditRecord(r);
    setForm(r);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este registro?")) return;
    await deleteFuelRecord(id);
    loadData();
  };

  const handleSubmit = async () => {
    // Calcular total y consumo
    form.total = form.fuel * form.price;
    form.consumption = form.fuel > 0 ? form.miles / form.fuel : 0;

    try {
      if (editRecord) {
        await updateFuelRecord(editRecord.id, form);
      } else {
        await addFuelRecord(form);
      }
      setShowModal(false);
      loadData();
    } catch (err) {
      console.error("Error guardando registro:", err);
    }
  };

  return (
    <div>
      <div className="card-header">
        <div className="card-title">Registro de Combustible</div>
        <button className="btn btn-primary" onClick={handleAdd}>Nueva Recarga</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Vehículo</th>
            <th>Combustible</th>
            <th>Precio/L</th>
            <th>Costo Total</th>
            <th>Millas</th>
            <th>Consumo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.id}>
              <td>{r.date}</td>
              <td>{r.vehicle}</td>
              <td>{r.fuel}</td>
              <td>${r.price.toFixed(2)}</td>
              <td>${r.total.toFixed(2)}</td>
              <td>{r.miles}</td>
              <td>{r.consumption.toFixed(1)}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(r)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(r.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="form-group">
            <label>Fecha</label>
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Vehículo</label>
            <select value={form.vehicle} onChange={e => setForm({ ...form, vehicle: e.target.value })}>
              <option value="">-- Seleccione un vehículo --</option>
              {vehicles.map(v => (
                <option key={v.id} value={v.id}>{v.id} - {v.mechanic}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Litros</label>
            <input type="number" value={form.fuel} onChange={e => setForm({ ...form, fuel: Number(e.target.value) })} />
          </div>
          <div className="form-group">
            <label>Precio/L</label>
            <input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
          </div>
          <div className="form-group">
            <label>Millas Recorridas</label>
            <input type="number" value={form.miles} onChange={e => setForm({ ...form, miles: Number(e.target.value) })} />
          </div>
          <button className="btn btn-success" onClick={handleSubmit}>Guardar</button>
        </Modal>
      )}
    </div>
  );
}
// comentrario