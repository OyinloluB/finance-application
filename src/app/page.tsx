import InputField from "@/components/atoms/InputField";
import SidebarContainer from "@/components/organisms/SidebarContainer";

export default function Home() {
  return (
    <div>
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
      </div>
      <SidebarContainer />
    </div>
  );
}
