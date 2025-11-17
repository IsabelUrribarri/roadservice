import { useState, useEffect } from "react";
import { getUnits, addUnit, updateUnit, deleteUnit } from "../services/unitService";
import Modal from "./Modal";

export default function VehicleTable() {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);
  const [form, setForm] = useState({ id:"", mechanic:"", model:"", miles:0, status:"Activo" });

  useEffect(() => { loadVehicles() }, []);

  const loadVehicles = async () => {
    const data = await getUnits();
    setVehicles(data);
  };

  const handleAdd = () => {
    setEditVehicle(null);
    setForm({ id:"", mechanic:"", model:"", miles:0, status:"Activo" });
    setShowModal(true);
  };

  const handleEdit = (v) => {
    setEditVehicle(v);
    setForm(v);
    setShowModal(true);
  };

  const handleDelete = async (id) => { await deleteUnit(id); loadVehicles(); };

  const handleSubmit = async () => {
    if(editVehicle) await updateUnit(form.id, form);
    else await addUnit(form);
    setShowModal(false);
    loadVehicles();
  };

  return (
    <div>
      <div className="card-header">
        <div className="card-title">Gestión de Vehículos</div>
        <button className="btn btn-primary" onClick={handleAdd}>Agregar Vehículo</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Mecánico</th><th>Modelo</th><th>Millas</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(v => (
            <tr key={v.id}>
              <td>{v.id}</td><td>{v.mechanic}</td><td>{v.model}</td><td>{v.miles}</td><td>{v.status}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>handleEdit(v)}>Editar</button>
                <button className="btn btn-danger" onClick={()=>handleDelete(v.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal onClose={()=>setShowModal(false)}>
          <div className="form-group">
            <label>ID</label>
            <input value={form.id} disabled={!!editVehicle} onChange={e=>setForm({...form,id:e.target.value})}/>
          </div>
          <div className="form-group">
            <label>Mecánico</label>
            <input value={form.mechanic} onChange={e=>setForm({...form,mechanic:e.target.value})}/>
          </div>
          <div className="form-group">
            <label>Modelo</label>
            <input value={form.model} onChange={e=>setForm({...form,model:e.target.value})}/>
          </div>
          <div className="form-group">
            <label>Millas</label>
            <input type="number" value={form.miles} onChange={e=>setForm({...form,miles:Number(e.target.value)})}/>
          </div>
          <div className="form-group">
            <label>Estado</label>
            <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
              <option>Activo</option>
              <option>En Mantenimiento</option>
            </select>
          </div>
          <button className="btn btn-success" onClick={handleSubmit}>Guardar</button>
        </Modal>
      )}
    </div>
  );
}
