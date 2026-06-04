import { TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps): ReactElement => {
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 300);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <TextInput
      label="Search Tasks"
      placeholder="Search tasks by title"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      radius="md"
    />
  );
};
