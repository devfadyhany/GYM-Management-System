const express = require("express");
const {
  AddEquipment,
  GetEquipments,
  GetEquipment,
  EditEquipment,
  DeleteEquipment,
} = require("../controllers/equipmentContoller");
const router = express.Router();

// User Manapulation Routes
router.post("/", AddEquipment);
router.get("/", GetEquipments);
router.get("/:id", GetEquipment);
router.put("/:id", EditEquipment);
router.delete("/:id", DeleteEquipment);

module.exports = router;
