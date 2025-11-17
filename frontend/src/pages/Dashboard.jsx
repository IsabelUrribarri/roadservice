import { useState, useEffect } from "react";
import { getUnits } from "../services/unitService";
import { getFuelRecords } from "../services/fuelService";
import { getMaintenanceRecords } from "../services/maintenanceService";
import { getInventoryItems } from "../services/inventoryService";

const Dashboard = () => {
  const [units, setUnits] = useState([]);
  const [fuelRecords, setFuelRecords] = useState([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState("dashboard");

  useEffect(() => {
    fetchUnits();
    fetchFuelRecords();
    fetchMaintenanceRecords();
    fetchInventoryItems();
  }, []);

  const fetchUnits = async () => {
    try {
      const data = await getUnits();
      setUnits(data);
    } catch (err) {
      console.error("Error fetching units:", err);
    }
  };

  const fetchFuelRecords = async () => {
    try {
      const data = await getFuelRecords();
      setFuelRecords(data);
    } catch (err) {
      console.error("Error fetching fuel records:", err);
    }
  };

  const fetchMaintenanceRecords = async () => {
    try {
      const data = await getMaintenanceRecords();
      setMaintenanceRecords(data);
    } catch (err) {
      console.error("Error fetching maintenance records:", err);
    }
  };

  const fetchInventoryItems = async () => {
    try {
      const data = await getInventoryItems();
      setInventoryItems(data);
    } catch (err) {
      console.error("Error fetching inventory items:", err);
    }
  };

  // Simple tab navigation
  const renderTabContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return (
          <div>
            <h1>Dashboard de Métricas</h1>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">Unidades</div>
                <div className="stat-value">{units.length}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Registros de Combustible</div>
                <div className="stat-value">{fuelRecords.length}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Mantenimientos</div>
                <div className="stat-value">{maintenanceRecords.length}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Items de Inventario</div>
                <div className="stat-value">{inventoryItems.length}</div>
              </div>
            </div>
          </div>
        );
      case "vehicles":
        return (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Mechanic</th>
                <th>Model</th>
                <th>Miles</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {units.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.mechanic}</td>
                  <td>{u.model}</td>
                  <td>{u.miles}</td>
                  <td>{u.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "fuel":
        return (
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Vehículo</th>
                <th>Combustible</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {fuelRecords.map((f, i) => (
                <tr key={i}>
                  <td>{f.date}</td>
                  <td>{f.vehicle}</td>
                  <td>{f.fuel}</td>
                  <td>${f.price}</td>
                  <td>${f.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "maintenance":
        return (
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Vehículo</th>
                <th>Servicio</th>
                <th>Descripción</th>
                <th>Costo</th>
                <th>Próximo Servicio</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceRecords.map((m, i) => (
                <tr key={i}>
                  <td>{m.date}</td>
                  <td>{m.vehicle}</td>
                  <td>{m.service}</td>
                  <td>{m.description}</td>
                  <td>${m.cost}</td>
                  <td>{m.nextService}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "inventory":
        return (
          <table>
            <thead>
              <tr>
                <th>Vehículo</th>
                <th>Item</th>
                <th>Cantidad</th>
                <th>Unidad</th>
                <th>Última Actualización</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((inv, i) => (
                <tr key={i}>
                  <td>{inv.vehicle}</td>
                  <td>{inv.item}</td>
                  <td>{inv.quantity}</td>
                  <td>{inv.unit}</td>
                  <td>{inv.lastUpdate}</td>
                  <td>{inv.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <nav>
        <ul>
          <li onClick={() => setSelectedTab("dashboard")}>Dashboard</li>
          <li onClick={() => setSelectedTab("vehicles")}>Vehicles</li>
          <li onClick={() => setSelectedTab("fuel")}>Fuel</li>
          <li onClick={() => setSelectedTab("maintenance")}>Maintenance</li>
          <li onClick={() => setSelectedTab("inventory")}>Inventory</li>
        </ul>
      </nav>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default Dashboard;
