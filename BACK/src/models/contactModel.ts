// src/models/contactModel.ts
import { supabase } from '../Utils/supabaseClient';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const createContact = async (contactData: ContactFormData) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([contactData])
    .select();

  if (error) throw error;
  return data;
};

export const getContacts = async () => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*');

  if (error) throw error;
  return data;
};