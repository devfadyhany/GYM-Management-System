const express = require("express");
const {
  AddEquipment,
  GetEquipments,
  GetEquipment,
  EditEquipment,
  DeleteEquipment,
} = require("../controllers/equipmentContoller");
const { RequireAdmin } = require("../middlewares/RequireAdmin");
const router = express.Router();

// User Manapulation Routes
router.get("/", GetEquipments);
router.get("/:id", GetEquipment);
router.post("/", RequireAdmin, AddEquipment);
router.put("/:id", RequireAdmin, EditEquipment);
router.delete("/:id", RequireAdmin,  DeleteEquipment);

module.exports = router;
