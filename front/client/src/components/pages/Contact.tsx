// import React, { useState, useReducer, useEffect, FormEvent } from 'react';

// // Définition des interfaces pour les données du formulaire et les erreurs
// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   message: string;
// }

// interface FormErrors {
//   name?: string;
//   email?: string;
//   phone?: string;
//   message?: string;
// }

// // Définition des actions pour le reducer
// type FormAction =
//   | { type: 'UPDATE_FIELD'; field: keyof FormData; value: string }
//   | { type: 'RESET_FORM' };

// // Reducer pour gérer les mises à jour de l'état du formulaire
// const formReducer = (state: FormData, action: FormAction): FormData => {
//   switch (action.type) {
//     case 'UPDATE_FIELD':
//       return { ...state, [action.field]: action.value };
//     case 'RESET_FORM':
//       return { name: '', email: '', phone: '', message: '' };
//     default:
//       return state;
//   }
// };

// // Fonction de validation des champs du formulaire
// const validateField = (name: keyof FormData, value: string): string | undefined => {
//   if (!value.trim()) return 'Ce champ est requis';
//   if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//     return 'L\'email n\'est pas valide';
//   }
//   return undefined;
// };

// // Composant principal du formulaire de contact
// const ContactForm: React.FC = () => {
//   // Utilisation de useReducer pour gérer l'état du formulaire
//   const [formData, dispatch] = useReducer(formReducer, {
//     name: '',
//     email: '',
//     phone: '',
//     message: '',
//   });

//   // États pour les erreurs, la soumission et le statut de soumission
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

//   // Effet pour valider les champs en temps réel
//   useEffect(() => {
//     const newErrors: FormErrors = {};
//     Object.keys(formData).forEach((key) => {
//       const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
//       if (error) newErrors[key as keyof FormErrors] = error;
//     });
//     setErrors(newErrors);
//   }, [formData]);

//   // Gestionnaire de soumission du formulaire
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     if (Object.keys(errors).length === 0) {
//       try {
//         // Simuler un appel API
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         setSubmitStatus('success');
//         dispatch({ type: 'RESET_FORM' });
//       } catch {
//         setSubmitStatus('error');
//       }
//     }

//     setIsSubmitting(false);
//   };

//   // Gestionnaire de changement des champs du formulaire
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     dispatch({ type: 'UPDATE_FIELD', field: name as keyof FormData, value });
//   };

//   return (
//     <form className="bg-gray-100 rounded-xl mx-auto p-8 w-full max-w-2xl" onSubmit={handleSubmit}>
//       {/* Champ pour le nom */}
//       <div className="relative z-0 w-full mb-6 group">
//         <input
//           type="text"
//           name="name"
//           id="name"
//           value={formData.name}
//           onChange={handleChange}
//           className={`block py-3 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
//             errors.name ? 'border-red-500' : ''
//           }`}
//           placeholder=" "
//           aria-describedby={errors.name ? 'name-error' : undefined}
//         />
//         <label
//           htmlFor="name"
//           className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600"
//         >
//           Nom
//         </label>
//         {errors.name && (
//           <p id="name-error" className="text-sm text-red-600">
//             {errors.name}
//           </p>
//         )}
//       </div>

//       {/* Champ pour l'email */}
//       <div className="relative z-0 w-full mb-6 group">
//         <input
//           type="email"
//           name="email"
//           id="email"
//           value={formData.email}
//           onChange={handleChange}
//           className={`block py-3 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
//             errors.email ? 'border-red-500' : ''
//           }`}
//           placeholder=" "
//           aria-describedby={errors.email ? 'email-error' : undefined}
//         />
//         <label
//           htmlFor="email"
//           className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600"
//         >
//           Email
//         </label>
//         {errors.email && (
//           <p id="email-error" className="text-sm text-red-600">
//             {errors.email}
//           </p>
//         )}
//       </div>

//       {/* Champ pour le numéro de téléphone */}
//       <div className="relative z-0 w-full mb-6 group">
//         <input
//           type="tel"
//           name="phone"
//           id="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           className={`block py-3 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
//             errors.phone ? 'border-red-500' : ''
//           }`}
//           placeholder=" "
//           aria-describedby={errors.phone ? 'phone-error' : undefined}
//         />
//         <label
//           htmlFor="phone"
//           className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600"
//         >
//           Numéro de téléphone
//         </label>
//         {errors.phone && (
//           <p id="phone-error" className="text-sm text-red-600">
//             {errors.phone}
//           </p>
//         )}
//       </div>

//       {/* Champ pour le message */}
//       <div className="relative z-0 w-full mb-6 group">
//         <textarea
//           name="message"
//           id="message"
//           value={formData.message}
//           onChange={handleChange}
//           className={`block py-3 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
//             errors.message ? 'border-red-500' : ''
//           }`}
//           placeholder=" "
//           aria-describedby={errors.message ? 'message-error' : undefined}
//         />
//         <label
//           htmlFor="message"
//           className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600"
//         >
//           Message
//         </label>
//         {errors.message && (
//           <p id="message-error" className="text-sm text-red-600">
//             {errors.message}
//           </p>
//         )}
//       </div>

//       {/* Bouton de soumission */}
//       <button
//         type="submit"
//         className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
//         disabled={isSubmitting || Object.keys(errors).length > 0}
//         aria-disabled={isSubmitting || Object.keys(errors).length > 0}
//       >
//         {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
//       </button>

//       {/* Affichage du statut de soumission */}
//       {submitStatus === 'success' && (
//         <p className="text-center text-green-600 mt-4">Votre message a été envoyé avec succès !</p>
//       )}
//       {submitStatus === 'error' && (
//         <p className="text-center text-red-600 mt-4">Une erreur est survenue. Veuillez réessayer.</p>
//       )}
//     </form>
//   );
// };

// export default React.memo(ContactForm);