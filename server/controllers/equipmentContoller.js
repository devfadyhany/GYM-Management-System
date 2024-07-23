const Equipment = require("../models/equipment");

const AddEquipment = async (req, res) => {
  try {
    const equipment = req.body;

    const result = await Equipment.create(equipment);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const GetEquipments = async (req, res) => {
  try {
    let equipment;

    const name = req.query.name;

    if (name) {
      equipment = await Equipment.find({
        name: { $regex: ".*" + name + ".*" },
      });
    } else {
      equipment = await Equipment.find();
    }

    res.status(200).json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const GetEquipment = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Equipment.findById(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const EditEquipment = async (req, res) => {
  try {
    const id = req.params.id;
    const equipment = req.body;

    const result = await Equipment.findByIdAndUpdate(id, equipment);

    res
      .status(200)
      .json({ message: "equipment has been updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const DeleteEquipment = async (req, res) => {
  try {
    const id = req.params.id;

    await Equipment.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "equipment has been deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  AddEquipment,
  GetEquipments,
  GetEquipment,
  EditEquipment,
  DeleteEquipment,
};
