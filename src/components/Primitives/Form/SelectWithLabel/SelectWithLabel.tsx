import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';
import {
  RegisterOptions,
  FieldValues,
  FieldPath,
  Controller,
  useFormContext,
} from 'react-hook-form';
import React from 'react';

type Option = {
  value: string;
  label: string;
};

type SelectWithLabelProps = {
  formLabel?: string;
  placeholder?: string;
  inputName: FieldPath<FieldValues>;
  rules?: RegisterOptions;
  options: Option[] | [];
};

export const SelectWithLabel = ({
  formLabel,
  placeholder,
  inputName,
  rules,
  options,
}: SelectWithLabelProps): JSX.Element => {
  const formContext = useFormContext();

  if (!formContext) {
    return (
      <Text color='red'>Form context is missing form field {inputName}</Text>
    );
  }

  const {
    control,
    formState: { errors, isSubmitting },
  } = formContext;

  const errorMessage = errors && (errors?.[inputName]?.message as string);

  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormLabel>{formLabel}</FormLabel>
      <Controller
        control={control}
        name={inputName}
        rules={rules}
        render={({ field }) => {
          return (
            <Select
              placeholder={placeholder}
              isDisabled={isSubmitting}
              {...field}
            >
              {options?.map((option: Option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </Select>
          );
        }}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
