import { pool } from "../db";
import { Request, Response } from "express";
import { DB_TABLE_TIPOSGATOS } from "../config";


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
  

  try {
    const { id } = req.params;
    const data = req.body;
    const file = req.file;
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Solo agregar los campos que vienen en el body
    if (data.raza !== undefined) {
      fields.push(`raza = $${idx++}`);
      values.push(data.raza);
    }
    if (data.personalidad !== undefined) {
      fields.push(`personalidad = $${idx++}`);
      values.push(data.personalidad);
    }
    if (data.descripcion !== undefined) {
      fields.push(`descripcion = $${idx++}`);
      values.push(data.descripcion);
    }
    if (data.procedencia !== undefined) {
      fields.push(`procedencia = $${idx++}`);
      values.push(data.procedencia);
    }
    if (data.datos_curiosos !== undefined) {
      fields.push(`datos_curiosos = $${idx++}`);
      values.push(data.datos_curiosos);
    }

    // Si hay imagen
    if (file) {
      fields.push(`imagen = $${idx++}`);
      values.push(`/uploads/tipos_de_gatos/${file.filename}`);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No hay campos para actualizar" });
    }

    // Agregar el id al final
    values.push(id);

    const query = `
      UPDATE ${DB_TABLE_TIPOSGATOS}
      SET ${fields.join(", ")}
      WHERE id = $${idx}
      RETURNING *
    `;

    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Gato no encontrado" });
    }

    return res.json(rows[0]);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar el gato" });
  }
};


    //raza 
    //personalidad 
    //descripcion 
    //procedencia 
    //datos_curiosos 
    //imagen 

       

