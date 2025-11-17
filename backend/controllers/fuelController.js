import prisma from "../config/db.js";

export const createFuel = async (req, res) => {
  try {
    const { unitId, litersOrGallons, pricePerUnit, totalCost, odometer } = req.body;

    const fr = await prisma.fuelRecord.create({
      data: { unitId, litersOrGallons, pricePerUnit, totalCost, odometer }
    });

    if (odometer) {
      const unit = await prisma.unit.findUnique({ where: { id: unitId } });
      if (unit.totalMiles === null || odometer > unit.totalMiles) {
        await prisma.unit.update({
          where: { id: unitId },
          data: { totalMiles: odometer }
        });
      }
    }

    res.status(201).json(fr);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getFuelByUnit = async (req, res) => {
  try {
    const unitId = parseInt(req.params.id);
    const records = await prisma.fuelRecord.findMany({
      where: { unitId },
      orderBy: { date: 'desc' }
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Métricas
export const getMetrics = async (req, res) => {
  try {
    const unitId = parseInt(req.params.id);
    const fuelRecords = await prisma.fuelRecord.findMany({
      where: { unitId },
      orderBy: { date: 'asc' }
    });

    if (!fuelRecords.length) return res.json({ message: 'No fuel records', metrics: {} });

    let totalUnits = 0, totalCost = 0, miles = 0;
    for (let i = 0; i < fuelRecords.length; i++) {
      totalUnits += fuelRecords[i].litersOrGallons;
      totalCost += fuelRecords[i].totalCost;
      if (i > 0) {
        const diff = (fuelRecords[i].odometer || 0) - (fuelRecords[i - 1].odometer || 0);
        if (diff > 0) miles += diff;
      }
    }

    const unit = await prisma.unit.findUnique({ where: { id: unitId } });
    if (miles === 0 && unit && unit.totalMiles) miles = unit.totalMiles;

    const consumption = miles > 0 && totalUnits > 0 ? miles / totalUnits : null;
    const costPerMile = miles > 0 ? totalCost / miles : null;

    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const dailySpend = fuelRecords
      .filter(r => new Date(r.date) >= startOfToday)
      .reduce((s, r) => s + r.totalCost, 0);

    const monthlySpend = fuelRecords
      .filter(r => new Date(r.date) >= startOfMonth)
      .reduce((s, r) => s + r.totalCost, 0);

    res.json({
      metrics: { totalUnits, totalCost, miles, consumption, costPerMile, dailySpend, monthlySpend }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
