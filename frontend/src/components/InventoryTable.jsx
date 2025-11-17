import { useState,useEffect } from "react";
import { getInventoryItems, addInventoryItem, updateInventoryItem, deleteInventoryItem } from "../services/inventoryService";
import { getUnits } from "../services/unitService";
import Modal from "./Modal";

export default function InventoryTable() {
  const [items,setItems] = useState([]);
  const [vehicles,setVehicles] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [editItem,setEditItem] = useState(null);
  const [form,setForm] = useState({ vehicle:"", item:"", quantity:0, unit:"", lastUpdate:"", status:"Disponible" });

  useEffect(()=>{ loadData() },[]);

  const loadData = async ()=>{
    setItems(await getInventoryItems());
    setVehicles(await getUnits());
  };

  const handleAdd=()=>{ setEditItem(null); setForm({ vehicle:"", item:"", quantity:0, unit:"", lastUpdate:"", status:"Disponible" }); setShowModal(true);}
  const handleEdit=(i)=>{ setEditItem(i); setForm(i); setShowModal(true);}
  const handleDelete=async(id)=>{ await deleteInventoryItem(id); loadData();}
  const handleSubmit=async()=>{ if(editItem) await updateInventoryItem(editItem.id,form); else await addInventoryItem(form); setShowModal(false); loadData(); }

  return (
    <div>
      <div className="card-header">
        <div className="card-title">Inventario por Unidad</div>
        <button className="btn btn-primary" onClick={handleAdd}>Agregar Item</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item</th><th>Cantidad</th><th>Unidad</th><th>Última Actualización</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i=>(
            <tr key={i.id}>
              <td>{i.item}</td><td>{i.quantity}</td><td>{i.unit}</td><td>{i.lastUpdate}</td><td>{i.status}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>handleEdit(i)}>Editar</button>
                <button className="btn btn-danger" onClick={()=>handleDelete(i.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal onClose={()=>setShowModal(false)}>
          <div className="form-group">
            <label>Vehículo</label>
            <select value={form.vehicle} onChange={e=>setForm({...form,vehicle:e.target.value})}>
              <option value="">-- Seleccione un vehículo --</option>
              {vehicles.map(v=><option key={v.id} value={v.id}>{v.id} - {v.mechanic}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Item</label>
            <input value={form.item} onChange={e=>setForm({...form,item:e.target.value})}/>
          </div>
          <div className="form-group">
            <label>Cantidad</label>
            <input type="number" value={form.quantity} onChange={e=>setForm({...form,quantity:Number(e.target.value)})}/>
          </div>
          <div className="form-group">
            <label>Unidad</label>
            <input value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})}/>
          </div>
          <div className="form-group">
            <label>Última Actualización</label>
            <input type="date" value={form.lastUpdate} onChange={e=>setForm({...form,lastUpdate:e.target.value})}/>
          </div>
          <div className="form-group">
            <label>Estado</label>
            <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
              <option>Disponible</option>
              <option>Bajo</option>
              <option>Agotado</option>
            </select>
          </div>
          <button className="btn btn-success" onClick={handleSubmit}>Guardar</button>
        </Modal>
      )}
    </div>
  );
}
