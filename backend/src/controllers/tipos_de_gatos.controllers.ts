import { pool } from "../db";
import { Request, Response } from "express";
import { DB_TABLE_TIPOSGATOS } from "../config";

import fs from "fs";
import path from "path";


export const obtenerTiposdeGatos= async (_req: Request, res: Response)=>{

    const { rows } = await pool.query(` SELECT * FROM ${DB_TABLE_TIPOSGATOS}`);
    return res.status(200).json(rows);

    
};

export const insertarGatos= async (req: Request, res: Response)=>{
    
    const data = req.body;
    const file = req.file;

     if (!file) return res.status(400).json({ error: 'Archivo imagen requerido' });

    const imagePath =`/uploads/tipos_de_gatos/${file.filename}`;

    const {rows} = await pool.query(
        `INSERT INTO ${DB_TABLE_TIPOSGATOS} (raza, personalidad, descripcion, procedencia, datos_curiosos, imagen) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
        [
            data.raza, 
            data.personalidad, 
            data.descripcion, 
            data.procedencia, 
            data.datos_curiosos, 
            imagePath
        ]
    );
    console.log(rows)

    return res.json(rows[0]);
};
    
export const actualizarGato = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const file = req.file;

  try {
     
  // Resolver la imagen
        let imagePath = data.imagenActual || null; // opcionalmente puedes enviar la ruta actual desde el frontend
        if (file) {
            imagePath = `/uploads/tipos_de_gatos/${file.filename}`;

            // borrar imagen antigua del disco (si existe)
            if (data.imagenActual) {
                // const fs = require('fs');
                const oldPath = `${process.cwd()}${data.imagenActual}`;
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
        }

    // Ejecutar UPDATE directo
    const { rows } = await pool.query(
    `
    UPDATE tipos_de_gatos
    SET raza = COALESCE($1, raza),
        personalidad = COALESCE($2, personalidad),
        descripcion = COALESCE($3, descripcion),
        procedencia = COALESCE($4, procedencia),
        datos_curiosos = COALESCE($5, datos_curiosos),
        imagen = COALESCE($6, imagen)
    WHERE id = $7
    RETURNING *
    `,
    [
        data.raza,
        data.personalidad,
        data.descripcion,
        data.procedencia,
        data.datos_curiosos,
        imagePath,
        id
    ]
    );

    if (rows.length === 0) {
    return res.status(404).json({ error: 'Gato no encontrado' });
    }
    
    return res.json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar el gato" });
  }
};
export const obtenerGatoPorId = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const { rows } = await pool.query(
            `SELECT * FROM ${DB_TABLE_TIPOSGATOS} WHERE id = $1`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Gato no encontrado" });
        }

        return res.status(200).json(rows[0]);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al obtener el gato" });
    }
};

export const eliminarGato = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // 1️⃣ Obtener el servidor antes de borrar
    const result = await pool.query(
      `SELECT * FROM ${DB_TABLE_TIPOSGATOS} WHERE id = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Gato no encontrado' });
    }

    const tipo_de_gato = result.rows[0];

    if (tipo_de_gato.imagen) {
      const imagePath = path.join(process.cwd(), tipo_de_gato.imagen);
      if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
      }
    }

    await pool.query(
      `DELETE FROM ${DB_TABLE_TIPOSGATOS}
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    return res.json({ message: 'Gato eliminado correctamente', id });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al eliminar el gato" });
  }
};





    //raza 
    //personalidad 
    //descripcion 
    //procedencia 
    //datos_curiosos 
    //imagen 

       

