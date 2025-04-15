import React from "react";
import { DropdownField } from "~/components";

interface GenderDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function GenderDropdown({
  value,
  onChange,
}: GenderDropdownProps) {
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <DropdownField
      name="gender"
      value={value}
      onChange={onChange}
      label="Gender"
      options={genderOptions}
      ariaLabel="Gender"
    />
  );
}
