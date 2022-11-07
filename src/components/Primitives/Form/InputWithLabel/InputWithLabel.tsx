import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';
import {
  RegisterOptions,
  FieldValues,
  FieldPath,
  useFormContext,
} from 'react-hook-form';
import React from 'react';

type InputWithLabelProps = {
  formLabel?: string;
  formType?: string;
  placeholder?: string;
  inputName: FieldPath<FieldValues>;
  rules?: RegisterOptions;
};

export const InputWithLabel = ({
  formLabel,
  formType = 'text',
  placeholder,
  inputName,
  rules,
}: InputWithLabelProps): JSX.Element => {
  const formContext = useFormContext();

  if (!formContext) {
    return (
      <Text color='red'>Form context is missing form field {inputName}</Text>
    );
  }

  const {
    register,
    formState: { errors, isSubmitting },
  } = formContext;

  const errorMessage = errors && (errors?.[inputName]?.message as string);

  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormLabel>{formLabel}</FormLabel>
      <Input
        type={formType}
        placeholder={placeholder}
        isDisabled={isSubmitting}
        {...(register && register(inputName, rules))}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
