import prisma from "../config/db.js";

export const createMaintenance = async (req, res) => {
  try {
    const { unitId, date, description, cost } = req.body;
    const m = await prisma.maintenanceRecord.create({
      data: { unitId, date, description, cost }
    });
    res.status(201).json(m);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMaintenanceByUnit = async (req, res) => {
  try {
    const unitId = parseInt(req.params.id);
    const records = await prisma.maintenanceRecord.findMany({
      where: { unitId },
      orderBy: { date: 'desc' }
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
