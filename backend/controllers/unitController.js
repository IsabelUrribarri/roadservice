import prisma from "../config/db.js";

export const getUnits = async (req, res) => {
  try {
    const units = await prisma.unit.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(units);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createUnit = async (req, res) => {
  try {
    const { name, plate, mechanic } = req.body;
    const unit = await prisma.unit.create({
      data: { name, plate, mechanic }
    });
    res.status(201).json(unit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getUnit = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const unit = await prisma.unit.findUnique({
      where: { id },
      include: {
        fuelRecords: { orderBy: { date: 'desc' } },
        maintenance: { orderBy: { date: 'desc' } },
        inventory: true
      }
    });
    if (!unit) return res.status(404).json({ message: 'Unit not found' });
    res.json(unit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUnit = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const unit = await prisma.unit.update({
      where: { id },
      data: req.body
    });
    res.json(unit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUnit = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.unit.delete({ where: { id } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
