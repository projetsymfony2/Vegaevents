// import React from 'react';
// import Input from '../../atoms/Input';
// import ErrorMessage from '../../atoms/ErrorMessage/ErrorMessage';

// interface InputWithErrorProps<T> {
//   label: string;
//   inputProps: T;
//   error?: string;
//   errorClassName?: string;
// }

// const InputWithError = <T extends React.ComponentProps<typeof Input>>({
//   label,
//   inputProps,
//   error,
//   errorClassName
// }: InputWithErrorProps<T>) => (
//   <div className="mb-4">
//     <label htmlFor={inputProps.name} className="block text-sm font-medium text-gray-700">
//       {label}
//     </label>
//     <Input {...inputProps} />
//     {error && <ErrorMessage message={error} className={errorClassName} />}
//   </div>
// );

// export default InputWithError;

// import React from 'react';
// import Input from '../../atoms/Input';
// import ErrorMessage from '../../atoms/ErrorMessage/ErrorMessage';
// import { InputProps } from '../../../types/Form.types';

// interface InputWithErrorProps {
//   label: string;
//   inputProps: InputProps;
//   error?: string;
//   errorClassName?: string;
// }

// const InputWithError: React.FC<InputWithErrorProps> = ({
//   label,
//   inputProps,
//   error,
//   errorClassName
// }) => (
//   <div className="mb-4">
//     <label 
//       htmlFor={inputProps.name} 
//       className="block text-sm font-medium text-gray-700 mb-1"
//     >
//       {label}
//     </label>
//     <Input {...inputProps} />
//     {error && <ErrorMessage message={error} className={errorClassName} />}
//   </div>
// );

// export default InputWithError;