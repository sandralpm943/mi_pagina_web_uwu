import type { usuarios } from "@/types/usuarios.types";
import axios from "axios";
import { ref } from "vue";

const API = "http://localhost:3000/usuarios"

export const obtenerUsuarios = async(): Promise<usuarios[]> => {
    const res = await axios.get(`${API}`)
    return res.data;
}