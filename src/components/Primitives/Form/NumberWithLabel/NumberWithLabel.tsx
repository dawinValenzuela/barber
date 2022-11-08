import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import {
  Controller,
  useFormContext,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

type NumberWithLabelProps = {
  inputName: FieldPath<FieldValues>;
  rules?: RegisterOptions;
  formLabel?: string;
};

export const NumberWithLabel = ({
  inputName,
  formLabel,
  rules,
}: NumberWithLabelProps): JSX.Element => {
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
        render={({ field: { ref, ...restField } }) => {
          return (
            <NumberInput {...restField} isDisabled={isSubmitting}>
              <NumberInputField ref={ref} name={restField.name} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          );
        }}
      />
      {errors?.value && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};
