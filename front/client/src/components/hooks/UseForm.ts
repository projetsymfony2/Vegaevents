// import { useState } from 'react';

// interface UseFormReturn<T> {
//   formData: T;
//   errors: Record<keyof T, string | undefined>;
//   isSubmitting: boolean;
//   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//   handleSubmit: (onSubmit: (data: T) => Promise<void>) => Promise<boolean>;
//   onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
// }

// const useForm = <T,>(
//   initialValues: T,
//   validators: Record<keyof T, (value: string) => string | undefined>
// ): UseFormReturn<T> => {
//   const [formData, setFormData] = useState<T>(initialValues);
//   const [errors, setErrors] = useState<Record<keyof T, string | undefined>>({} as Record<keyof T, string | undefined>);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (onSubmit: (data: T) => Promise<void>): Promise<boolean> => {
//     setIsSubmitting(true);

//     // Valider les champs
//     const newErrors: Record<keyof T, string | undefined> = {} as Record<keyof T, string | undefined>;
//     let isValid = true;

//     Object.keys(validators).forEach((key) => {
//       const error = validators[key as keyof T](formData[key as keyof T] as string);
//       if (error) {
//         newErrors[key as keyof T] = error;
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);

//     if (isValid) {
//       try {
//         await onSubmit(formData);
//       } catch (error) {
//         console.error('Erreur lors de la soumission du formulaire :', error);
//         isValid = false;
//       }
//     }

//     setIsSubmitting(false);
//     return isValid;
//   };

//   const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name } = e.target;
//     const error = validators[name as keyof T](formData[name as keyof T] as string);
//     setErrors({ ...errors, [name]: error });
//   };

//   return { formData, errors, isSubmitting, handleChange, handleSubmit, onBlur };
// };

// export default useForm;


// import { useState } from 'react';
// import { FormErrors } from '../../types/Form.types';

// interface UseFormConfig<T> {
//   initialValues: T;
//   validators: Record<keyof T, (value: string) => string | undefined>;
//   onSubmit: (values: T) => Promise<void>;
// }

// const useForm = <T extends Record<string, string>>({
//   initialValues,
//   validators,
//   onSubmit
// }: UseFormConfig<T>) => {
//   const [values, setValues] = useState<T>(initialValues);
//   const [errors, setErrors] = useState<FormErrors<T>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validateField = (name: keyof T, value: string) => {
//     const validator = validators[name];
//     return validator ? validator(value) : undefined;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setValues(prev => ({ ...prev, [name]: value }));
//   };

//   const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     const error = validateField(name as keyof T, value);
//     setErrors(prev => ({ ...prev, [name]: error }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const newErrors: FormErrors<T> = {};
//     let hasErrors = false;

//     // Valider tous les champs
//     Object.keys(values).forEach(key => {
//       const error = validateField(key as keyof T, values[key as keyof T]);
//       if (error) {
//         newErrors[key as keyof T] = error;
//         hasErrors = true;
//       }
//     });

//     setErrors(newErrors);

//     if (!hasErrors) {
//       try {
//         await onSubmit(values);
//         // Réinitialiser le formulaire après succès si nécessaire
//         // setValues(initialValues);
//       } catch (error) {
//         console.error('Erreur lors de la soumission:', error);
//       }
//     }

//     setIsSubmitting(false);
//     return !hasErrors;
//   };

//   return {
//     values,
//     errors,
//     isSubmitting,
//     handleChange,
//     handleBlur,
//     handleSubmit
//   };
// };

// export default useForm;