import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import {
  UseFormRegister,
  Path,
  RegisterOptions,
  FieldValues,
  FieldError,
  DeepMap,
} from 'react-hook-form';
import React from 'react';

type InputWithLabelProps<TFormValues extends FieldValues> = {
  formLabel?: string;
  formType?: string;
  placeholder?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  inputName: Path<TFormValues>;
  isDisabled?: boolean;
  register?: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
};

export const InputWithLabel = <TFormValues extends Record<string, unknown>>({
  formLabel,
  formType = 'text',
  placeholder,
  isDisabled,
  errors,
  inputName,
  register,
  rules,
}: InputWithLabelProps<TFormValues>): JSX.Element => {
  const errorMessage = errors && errors?.[inputName]?.message;

  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormLabel>{formLabel}</FormLabel>
      <Input
        type={formType}
        placeholder={placeholder}
        isDisabled={isDisabled}
        {...(register && register(inputName, rules))}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
