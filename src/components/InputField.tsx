import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/core';
import {useField} from 'formik';
import React, {InputHTMLAttributes, TextareaHTMLAttributes} from 'react';

type InputFieldProps =
InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  textarea?: boolean
}
|
TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  name: string
  textarea?: boolean
  size?: string
}

// type TextAreaFieldProps =
// TextareaHTMLAttributes<HTMLTextAreaElement> & {
//     label: string
//     name: string
//     textarea?: boolean
//     size?: string
// }

export const InputField: React.FC<InputFieldProps> =
({
  label,
  size: _,
  textarea,
  ...props
}: React.PropsWithChildren<InputFieldProps>) => {
  // let InputOrTextarea = Input;
  // InputOrTextarea = Textarea as TextareaHTMLAttributes<HTMLTextAreaElement>;
  let InputOrTextarea = Input as InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>;
  if (textarea) {
    InputOrTextarea = Textarea;
  }

  const [field, {error}] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
