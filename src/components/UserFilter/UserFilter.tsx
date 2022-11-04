import { Select } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';

interface User {
  userId: string;
  fullName: string;
}

type UserFilterProps = {
  users?: User[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const UserFilter = ({ users, onChange }: UserFilterProps) => {
  return (
    <Select placeholder='Seleccione un barbero' mb={5} onChange={onChange}>
      {users?.map((option: User) => {
        return (
          <option key={option.userId} value={option.userId}>
            {option.fullName}
          </option>
        );
      })}
    </Select>
  );
};
