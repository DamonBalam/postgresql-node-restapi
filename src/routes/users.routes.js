import { Router } from "express";

import {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/users.controllers.js";

const router = Router();

/* LISTANDO USERS */
router.get("/users", getUsers);

/* BUSCANDO UN USER */
router.get("/users/:id", getUserById);

/* CREANDO USER */
router.post("/users", createUser);

/* ELIMINANDO USER */
router.delete("/users/:id", deleteUser);

/* ACTUALIZANDO USER */
router.put("/users/:id", updateUser);

export default router;
