// // src/components/atoms/Input/Input.tsx
// import React from 'react';

// interface InputProps {
//   type: string;
//   name: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
//   placeholder?: string;
//   className?: string;
// }

// const Input: React.FC<InputProps> = ({
//   type,
//   name,
//   value,
//   onChange,
//   onBlur,
//   placeholder,
//   className,
// }) => (
//   <input
//     type={type}
//     name={name}
//     value={value}
//     onChange={onChange}
//     onBlur={onBlur}
//     placeholder={placeholder}
//     className={`block py-2 px-4 w-full border rounded-lg ${className}`}
//   />
// );

// // export default Input;
// import React from 'react';
// import { InputProps } from '../../../types/Form.types';

// const Input: React.FC<InputProps> = (props) => (
//   <input
//     {...props}
//     className={`w-full px-3 py-2 border rounded-md ${props.className}`}
//   />
// );

// export default Input;