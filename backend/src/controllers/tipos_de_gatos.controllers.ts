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

    //raza 
    //personalidad 
    //descripcion 
    //procedencia 
    //datos_curiosos 
    //imagen 

       

