import React, { useReducer, useState, useCallback, useEffect } from 'react';

// Types
type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormAction =
  | { type: 'UPDATE_FIELD'; field: keyof FormState; value: string }
  | { type: 'RESET_FORM' };

type FormErrors = {
  [K in keyof FormState]?: string;
};

// Regex pour la validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

// Reducer
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return { name: '', email: '', phone: '', message: '' };
    default:
      return state;
  }
};

const ContactForm: React.FC = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState<Set<keyof FormState>>(new Set());

  // Validation du formulaire
  const validateField = useCallback((name: keyof FormState, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Le nom doit contenir au moins 2 caractères' : '';
      case 'email':
        return !EMAIL_REGEX.test(value) ? 'Veuillez entrer une adresse email valide' : '';
      case 'phone':
        return value && !PHONE_REGEX.test(value) ? 'Veuillez entrer un numéro de téléphone français valide' : '';
      case 'message':
        return value.trim().length < 10 ? 'Le message doit contenir au moins 10 caractères' : '';
      default:
        return '';
    }
  }, []);

  // Validation du formulaire complet
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formState) as Array<keyof FormState>).forEach((field) => {
      const error = validateField(field, formState[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formState, validateField]);

  // Gestion des changements
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      dispatch({
        type: 'UPDATE_FIELD',
        field: name as keyof FormState,
        value,
      });

      if (touched.has(name as keyof FormState)) {
        const error = validateField(name as keyof FormState, value);
        setErrors(prev => ({ ...prev, [name]: error }));
      }
    },
    [touched, validateField]
  );

  // Gestion du blur
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => new Set(prev).add(name as keyof FormState));
    const error = validateField(name as keyof FormState, formState[name as keyof FormState]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [formState, validateField]);

  // Soumission du formulaire
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setTouched(new Set(Object.keys(formState) as Array<keyof FormState>));

      if (!validateForm()) {
        setSubmissionStatus('error');
        return;
      }

      setIsSubmitting(true);

      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formState),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de l\'envoi du formulaire');
        }

        setSubmissionStatus('success');
        dispatch({ type: 'RESET_FORM' });
        setTouched(new Set());
      } catch (error) {
        console.error('Erreur:', error);
        setSubmissionStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState, validateForm]
  );

  // Gestion du message de statut
  useEffect(() => {
    if (submissionStatus !== 'idle') {
      const timer = setTimeout(() => {
        setSubmissionStatus('idle');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submissionStatus]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Nom"
            name="name"
            value={formState.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-lg py-3 px-4 text-gray-800 text-sm outline-[#a91079] border ${
              errors.name && touched.has('name') ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            required
          />
          {errors.name && touched.has('name') && (
            <p className="text-sm text-red-500" id="name-error">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-lg py-3 px-4 text-gray-800 text-sm outline-[#a91079] border ${
              errors.email && touched.has('email') ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          {errors.email && touched.has('email') && (
            <p className="text-sm text-red-500" id="email-error">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <input
            type="tel"
            placeholder="Téléphone"
            name="phone"
            value={formState.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-lg py-3 px-4 text-gray-800 text-sm outline-[#a91079] border ${
              errors.phone && touched.has('phone') ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && touched.has('phone') && (
            <p className="text-sm text-red-500" id="phone-error">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <textarea
            placeholder="Message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={6}
            className={`w-full rounded-lg py-3 px-4 text-gray-800 text-sm outline-[#a91079] border ${
              errors.message && touched.has('message') ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            required
          />
          {errors.message && touched.has('message') && (
            <p className="text-sm text-red-500" id="message-error">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white bg-[#a91079] hover:bg-[#a91079e2] rounded-lg text-sm px-4 py-3 flex items-center justify-center transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="mr-2"
              viewBox="0 0 16 16"
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11z" />
            </svg>
          )}
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
        </button>
      </form>

      {submissionStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700">Message envoyé avec succès !</p>
        </div>
      )}
      
      {submissionStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">Une erreur s'est produite lors de l'envoi du message.</p>
        </div>
      )}
    </div>
  );
};

export default ContactForm;

