// import { ContactFormData } from '../../types/Form.types';

// export const contactFormValidators: Record<keyof ContactFormData, (value: string) => string | undefined> = {
//   name: (value: string) => 
//     value.trim() === '' ? 'Le nom est requis' : undefined,
    
//   email: (value: string) => {
//     if (value.trim() === '') return 'L\'email est requis';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'L\'email n\'est pas valide';
//     return undefined;
//   },
  
//   phone: (value: string) => 
//     value.trim() === '' ? 'Le téléphone est requis' : undefined,
    
//   message: (value: string) => 
//     value.trim() === '' ? 'Le message est requis' : undefined
// };
