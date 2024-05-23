import { UseFormRegisterReturn } from 'react-hook-form';

type TextBoxProps = {
  id?: string;
  type: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: string
};

export function Textbox({ id, type, label, register, error }: TextBoxProps) {
  return (
    <>
      <label htmlFor={id ?? label}>{label}</label>
      <input id={id ?? label} type={type} className="input" {...register} />
      {error && <div className="errorText">{error}</div>}
    </>
  );
};
