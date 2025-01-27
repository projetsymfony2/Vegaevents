"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
// Charger les variables d'environnement
dotenv_1.default.config();
// Récupérer l'URL et la clé privée de Supabase depuis les variables d'environnement
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
// Vérifier que les variables sont définies
if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Key must be defined in the .env file');
}
// Créer et exporter le client Supabase
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
