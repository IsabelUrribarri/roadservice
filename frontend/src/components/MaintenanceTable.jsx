import { useState, useEffect } from "react";
import { getMaintenanceRecords, addMaintenanceRecord, updateMaintenanceRecord, deleteMaintenanceRecord } from "../services/maintenanceService";
import { getUnits } from "../services/unitService";
import Modal from "./Modal";

export default function MaintenanceTable() {
  const [records,setRecords] = useState([]);
  const [vehicles,setVehicles] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [editRecord,setEditRecord] = useState(null);
  const [form,setForm] = useState({ date:"", vehicle:"", service:"", description:"", cost:0, nextService:"" });

  useEffect(()=>{ loadData() },[]);

  const loadData = async () => {
    setRecords(await getMaintenanceRecords());
    setVehicles(await getUnits());
  };

  const handleAdd=()=>{ setEditRecord(null); setForm({ date:"", vehicle:"", service:"", description:"", cost:0, nextService:"" }); setShowModal(true);}
  const handleEdit=(r)=>{ setEditRecord(r); setForm(r); setShowModal(true);}
  const handleDelete=async(id)=>{ await deleteMaintenanceRecord(id); loadData();}
  const handleSubmit=async()=>{ if(editRecord) await updateMaintenanceRecord(editRecord.id,form); else await addMaintenanceRecord(form); setShowModal(false); loadData(); }

  return (
    <div>
      <div className="card-header">
        <div className="card-title">Registro de Mantenimiento</div>
        <button className="btn btn-primary" onClick={handleAdd}>Nuevo Mantenimiento</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Fecha</th><th>Vehículo</th><th>Servicio</th><th>Descripción</th><th>Costo</th><th>Próximo Servicio</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r=>(
            <tr key={r.id}>
              <td>{r.date}</td><td>{r.vehicle}</td><td>{r.service}</td><td>{r.description}</td><td>${r.cost.toFixed(2)}</td><td>{r.nextService}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>handleEdit(r)}>Editar</button>
                <button className="btn btn-danger" onClick={()=>handleDelete(r.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal onClose={()=>setShowModal(false)}>
          <div className="form-group">
            <label>Fecha</label>
            <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
          </div>
          <div className="form-group">
            <label>Vehículo</label>
            <select value={form.vehicle} onChange={e=>setForm({...form,vehicle:e.target.value})}>
              <option value="">-- Seleccione un vehículo --</option>
              {vehicles.map(v=><option key={v.id} value={v.id}>{v.id} - {v.mechanic}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Servicio</label>
            <input value={form.service} onChange={e=>setForm({...form,service:e.target.value})}/>
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <input value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
          </div>
          <div className="form-group">
            <label>Costo</label>
            <input type="number" value={form.cost} onChange={e=>setForm({...form,cost:Number(e.target.value)})}/>
          </div>
          <div className="form-group">
            <label>Próximo Servicio</label>
            <input type="date" value={form.nextService} onChange={e=>setForm({...form,nextService:e.target.value})}/>
          </div>
          <button className="btn btn-success" onClick={handleSubmit}>Guardar</button>
        </Modal>
      )}
    </div>
  );
}
