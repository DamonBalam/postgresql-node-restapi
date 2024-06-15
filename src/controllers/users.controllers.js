import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(result.rows[0]);
};

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) returning *",
      [data.name, data.email]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rowsCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(result.rows[0]);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id]
  );

  if (result.rowsCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(result.rows);
};
