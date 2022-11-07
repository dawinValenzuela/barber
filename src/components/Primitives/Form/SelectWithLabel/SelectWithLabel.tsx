import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import {
  Path,
  RegisterOptions,
  FieldValues,
  FieldError,
  DeepMap,
  Controller,
  Control,
} from 'react-hook-form';
import React from 'react';

type Option = {
  value: string;
  label: string;
};

type SelectWithLabelProps<TFormValues extends FieldValues> = {
  formLabel?: string;
  placeholder?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  inputName: Path<TFormValues>;
  isDisabled?: boolean;
  rules?: RegisterOptions;
  control: Control<TFormValues>;
  options: Option[] | [];
};

export const SelectWithLabel = <TFormValues extends Record<string, unknown>>({
  formLabel,
  placeholder,
  isDisabled,
  errors,
  inputName,
  control,
  rules,
  options,
}: SelectWithLabelProps<TFormValues>): JSX.Element => {
  const errorMessage = errors && errors?.[inputName]?.message;

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
              isDisabled={isDisabled}
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
