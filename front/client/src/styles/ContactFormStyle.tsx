export const ContactFormStyles = {
    // Conteneur principal du formulaire
    formContainer: 'bg-white p-8 rounded-lg shadow-lg',
  
    // Styles pour les champs de formulaire
    input: 'block py-2 px-4 w-full border rounded-lg text-gray-700 focus:outline-none ',
    inputError: 'border-red-500', // Style pour les champs en erreur
  
    // Styles pour les labels
    label: 'block text-sm font-medium text-gray-700 mb-2',
  
    // Styles pour le bouton de soumission
    button: 'w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500',
    buttonDisabled: 'opacity-50 cursor-not-allowed', // Style pour le bouton désactivé
  
    // Styles pour les messages de succès et d'erreur
    successMessage: 'mt-4 text-green-600 text-sm',
    errorMessage: 'mt-4 text-red-600 text-sm',
  
    // Styles pour le conteneur des erreurs
    errorContainer: 'text-sm text-red-600',
  };