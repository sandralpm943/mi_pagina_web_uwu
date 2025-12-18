import { GatosEntry } from "../types";

import gatosData from "./gatos.json";

const gatos: GatosEntry[] = gatosData as GatosEntry[]
export const getEntries = (): GatosEntry[] => gatos




