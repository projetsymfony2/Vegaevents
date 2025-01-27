import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Récupérer l'URL et la clé privée de Supabase depuis les variables d'environnement
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Vérifier que les variables sont définies
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be defined in the .env file');
}

// Créer et exporter le client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);