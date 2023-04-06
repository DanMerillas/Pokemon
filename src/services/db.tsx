import { createClient } from '@supabase/supabase-js';

function obternerConfiguracionSupabase() {
    const DB_KEY = process.env.REACT_APP_API_KEY || ''
    const DB_URL = process.env.REACT_APP_DB_URL || ''
    return { DB_URL, DB_KEY };
}

export function obtenerDatos(nombreTabla: string, select?:string, order?:string) {
    const { DB_URL, DB_KEY } = obternerConfiguracionSupabase();
    const supabase = createClient(DB_URL, DB_KEY)
    return  supabase
    .from(nombreTabla)
    .select(select ? select: '*')
    .order(order?order:'', { ascending: true })
}

export async function guardarDatos(nombreTabla: string, datos:any) {
    const { DB_URL, DB_KEY } = obternerConfiguracionSupabase();
    const supabase = createClient(DB_URL, DB_KEY)
    const { data, error } = await supabase
    .from(nombreTabla)
    .insert(datos)

    if (error) {
        console.error(error)
        return false
      }
    
      console.log(data)

      return true
}

export async function borrarDato(nombreTabla:string, URL:string){
    const { DB_URL, DB_KEY } = obternerConfiguracionSupabase();
    const supabase = createClient(DB_URL, DB_KEY)
    const { data, error } = await supabase
    .from(nombreTabla)
    .delete()
    .eq('URL', URL)

    if (error) {
        console.error(error)
        return false
      }
    
      console.log(data)

      return true
}