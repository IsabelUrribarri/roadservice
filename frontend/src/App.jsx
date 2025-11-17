import { useState } from "react";
import VehicleTable from "./components/VehicleTable";
import FuelTable from "./components/FuelTable";
import MaintenanceTable from "./components/MaintenanceTable";
import InventoryTable from "./components/InventoryTable";
import "./App.css"; // tu CSS de cards, tabs, botones

export default function App() {
  const [activeTab, setActiveTab] = useState("vehicles");

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Gestión de Flota</h2>
        <ul>
          <li className={activeTab === "vehicles" ? "active" : ""} onClick={() => setActiveTab("vehicles")}>Vehículos</li>
          <li className={activeTab === "fuel" ? "active" : ""} onClick={() => setActiveTab("fuel")}>Combustible</li>
          <li className={activeTab === "maintenance" ? "active" : ""} onClick={() => setActiveTab("maintenance")}>Mantenimiento</li>
          <li className={activeTab === "inventory" ? "active" : ""} onClick={() => setActiveTab("inventory")}>Inventario</li>
        </ul>
      </aside>

      <main className="main-content">
        {activeTab === "vehicles" && <VehicleTable />}
        {activeTab === "fuel" && <FuelTable />}
        {activeTab === "maintenance" && <MaintenanceTable />}
        {activeTab === "inventory" && <InventoryTable />}
      </main>
    </div>
  );
}
