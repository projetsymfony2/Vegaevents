// src/components/molecules/LabeledInput/LabeledInput.tsx
import React from 'react';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';

interface LabeledInputProps {
  label: string;
  inputProps: React.ComponentProps<typeof Input>;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, inputProps }) => (
  <div className="mb-4">
    <Label htmlFor={inputProps.name}>{label}</Label>
    <Input {...inputProps} />
  </div>
);

export default LabeledInput;