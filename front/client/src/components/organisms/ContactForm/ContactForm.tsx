// import React from 'react';
// import useForm from '../../hooks/UseForm';
// import InputWithError from '../../molecules/InputWithError/InputWithError';
// import Button from '../../atoms/Button/Button';
// import { ContactFormStyles } from '../../../styles/ContactFormStyle';
// import Input from '../../atoms/Input';

// interface ContactFormData {
//   name: string;
//   email: string;
//   phone: string;
//   message: string;
// }

// interface ContactFormProps {
//   onSubmit: (data: ContactFormData) => Promise<void>;
// }

// // Définir le type des props d'Input si ce n'est pas déjà fait
// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   // Ajoutez ici d'autres props spécifiques à votre composant Input si nécessaire
// }

// const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
//   const { formData, errors, isSubmitting, handleChange, handleSubmit, onBlur } = useForm<ContactFormData>(
//     { name: '', email: '', phone: '', message: '' },
//     {
//       name: (value: string) => (value.trim() === '' ? 'Ce champ est requis' : undefined),
//       email: (value: string) =>
//         value.trim() === ''
//           ? 'Ce champ est requis'
//           : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
//           ? 'L\'email n\'est pas valide'
//           : undefined,
//       phone: (value: string) => (value.trim() === '' ? 'Ce champ est requis' : undefined),
//       message: (value: string) => (value.trim() === '' ? 'Ce champ est requis' : undefined),
//     }
//   );

//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const isValid = await handleSubmit(onSubmit);

//     if (isValid) {
//       console.log('Formulaire soumis avec succès !');
//     } else {
//       console.log('Le formulaire contient des erreurs.');
//     }
//   };

//   return (
//     <div style={{ position: 'relative', height: '100%', paddingBottom: '80px' }}>
//       <form onSubmit={handleFormSubmit} className="space-y-6" style={{ height: '100%', overflowY: 'auto' }}>
//         <InputWithError<InputProps>
//           label="Nom"
//           inputProps={{
//             type: 'text',
//             name: 'name',
//             value: formData.name,
//             onChange: handleChange,
//             onBlur: onBlur,
//             className: `${ContactFormStyles.input} ${errors.name ? ContactFormStyles.inputError : ''}`,
//             placeholder: 'Entrez votre nom',
//           }}
//           error={errors.name}
//           errorClassName={ContactFormStyles.errorContainer}
//         />
//         <InputWithError<InputProps>
//           label="Email"
//           inputProps={{
//             type: 'email',
//             name: 'email',
//             value: formData.email,
//             onChange: handleChange,
//             onBlur: onBlur,
//             className: `${ContactFormStyles.input} ${errors.email ? ContactFormStyles.inputError : ''}`,
//             placeholder: 'Entrez votre email',
//           }}
//           error={errors.email}
//           errorClassName={ContactFormStyles.errorContainer}
//         />
//         <InputWithError<InputProps>
//           label="Téléphone"
//           inputProps={{
//             type: 'tel',
//             name: 'phone',
//             value: formData.phone,
//             onChange: handleChange,
//             onBlur: onBlur,
//             className: `${ContactFormStyles.input} ${errors.phone ? ContactFormStyles.inputError : ''}`,
//             placeholder: 'Entrez votre numéro de téléphone',
//           }}
//           error={errors.phone}
//           errorClassName={ContactFormStyles.errorContainer}
//         />
//         <InputWithError<InputProps>
//           label="Message"
//           inputProps={{
//             type: 'text',
//             name: 'message',
//             value: formData.message,
//             onChange: handleChange,
//             onBlur: onBlur,
//             className: `${ContactFormStyles.input} ${errors.message ? ContactFormStyles.inputError : ''}`,
//             placeholder: 'Entrez votre message',
//           }}
//           error={errors.message}
//           errorClassName={ContactFormStyles.errorContainer}
//         />
//         <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', backgroundColor: 'white' }}>
//           <Button
//             type="submit"
//             disabled={isSubmitting}
//             className={`${ContactFormStyles.button} ${isSubmitting ? ContactFormStyles.buttonDisabled : ''}`}
//             style={{ width: '100%' }}
//           >
//             {isSubmitting ? 'Envoi en cours...' : 'SOUMETTRE'}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;
