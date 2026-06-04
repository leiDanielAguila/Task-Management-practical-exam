import { SegmentedControl } from "@mantine/core";
import type { ReactElement } from "react";
import type { TaskFilter } from "../types/task";

interface FilterBarProps {
  value: TaskFilter;
  onChange: (value: TaskFilter) => void;
}

export const FilterBar = ({
  value,
  onChange,
}: FilterBarProps): ReactElement => {
  return (
    <SegmentedControl
      value={value}
      onChange={(nextValue) => onChange(nextValue as TaskFilter)}
      data={[
        { label: "All", value: "all" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ]}
      fullWidth
    />
  );
};
