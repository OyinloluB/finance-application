"use client";

import { useForm, FormProvider } from "react-hook-form";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import SidebarContainer from "@/components/organisms/SidebarContainer";

export default function Home() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-250 p-250">
        <InputField
          name="basic_field"
          label="Basic Field"
          placeholder="Placeholder"
          helperText="Helper text"
        />
        <InputField
          name="field_with_prefix"
          label="Field with prefix"
          placeholder="Placeholder"
          prefix="$"
          helperText="Helper text"
        />
        <InputField
          name="field_with_icon"
          label="Field with icon"
          placeholder="Placeholder"
          icon="MagnifyingGlassIcon"
          helperText="Helper text"
        />
        <InputField
          name="field_with_color_tag"
          label="Field with color tag"
          placeholder="Placeholder"
          icon="MagnifyingGlassIcon"
          helperText="Helper text"
        />
        <SelectField
          name="color"
          label="Choose a color"
          variant="color-selection"
          options={[
            {
              label: "Green",
              value: "green",
              color: "#277C78",
              status: "used",
            },
            {
              label: "Yellow",
              value: "yellow",
              color: "#F2CDAC",
              status: "used",
            },
            {
              label: "Cyan",
              value: "cyan",
              color: "#82C9D7",
              status: "used",
            },
            { label: "Navy", value: "navy", color: "#626070" },
            { label: "Red", value: "red", color: "#C94736" },
            { label: "Purple", value: "purple", color: "#826CB0" },
          ]}
        />
        <SelectField
          name="category"
          label="Category"
          options={[
            { label: "Entertainment", value: "entertainment" },
            { label: "Bills", value: "bills" },
            { label: "Groceries", value: "groceries" },
            { label: "Dining Out", value: "dining_out" },
            { label: "Transportation", value: "transportation" },
            { label: "Personal Care", value: "personal_care" },
            { label: "Education", value: "education" },
          ]}
        />
      </div>
      <SidebarContainer />
    </FormProvider>
  );
}
