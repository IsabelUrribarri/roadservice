import React, { useEffect, useState } from 'react';
import UnitCard from '../components/UnitCard';
import { addUnit, getUnits } from "../services/unitService";

export default function Units() {
  const [units, setUnits] = useState([]);
  const [name, setName] = useState('');
  const [plate, setPlate] = useState('');

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getUnits();
    setUnits(data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || !plate) return alert('Nombre y placa requeridos');
    await addUnit({ name, plate });
    setName(''); setPlate('');
    load();
  };

  return (
    <>
      <h1>Unidades</h1>
      <div style={{display:'flex', gap:12}}>
        <form onSubmit={handleCreate} style={{flex:1}} className="card">
          <h4>Crear unidad</h4>
          <input className="input" placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Placa" value={plate} onChange={e=>setPlate(e.target.value)} />
          <button className="button" type="submit">Crear</button>
        </form>
        <div style={{flex:2}}>
          <div className="grid">
            {units.map(u => <UnitCard unit={u} key={u.id} />)}
          </div>
        </div>
      </div>
    </>
  );
}
