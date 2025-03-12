import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";

const BillFilters = () => {
  return (
    <div className="flex items-end justify-between gap-300 mb-400">
      <div className="max-w-[380px] flex-1">
        <InputField
          name="search_bills"
          placeholder="Search Bills"
          icon="MagnifyingGlassIcon"
        />
      </div>

      <SelectField
        name="sort_by"
        label="Sort by"
        layout="row"
        options={[
          { label: "Latest", value: "latest" },
          { label: "Oldest", value: "oldest" },
          { label: "A to Z", value: "a_to_z" },
          { label: "Z to A", value: "z_to_a" },
          { label: "Highest", value: "highest" },
          { label: "Lowest", value: "lowest" },
        ]}
      />
    </div>
  );
};

export default BillFilters;
