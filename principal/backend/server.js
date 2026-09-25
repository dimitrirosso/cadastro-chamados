import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  ssl: {
    rejectUnauthorized: true,
  },
});

app.post("/adicionar", async (req, res) => {
  const { assunto, requisitante, prioridade, status, data } = req.body;

  try {
    const [resultado] = await db.query(
      "INSERT INTO chamado (assunto, requisitante, prioridade, statos, data_abertura) VALUES (?, ?, ? ,? ,?)",
      [assunto, requisitante, prioridade, status, data],
    );

    res.status(201).json({ mensagem: "cadastrado", id: resultado.insertId });
  } catch (erro) {
    res.status(500).json({ Erro: erro });
  }
});

app.put("/editar/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { prioridade, status } = req.body;

  try {
    const [resultado] = db.query(
      "UPDATE chamado SET prioridade = ?, statos = ? WHERE id = ?",
      [prioridade, status, id],
    );

    res.status(200).json({ Mensagem: "Editado!" });
  } catch (erro) {
    res.status(500).json({ Erro: erro });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const [resultado] = await db.query("DELETE FROM chamado WHERE id = ?", [
      id,
    ]);

    res.status(200).json({ mensagem: "deletado!" });
  } catch (erro) {
    res.status(500).json({ mensagem: erro });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log("Rodando..."));
