import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";

const BillFilters = () => {
  return (
    <div className="flex items-center justify-between gap-300 mb-400">
      <div className="flex-grow min-w-[0] max-w-[60%] sm:max-w-[380px]">
        <InputField
          name="search_bills"
          placeholder="Search Bills"
          icon="MagnifyingGlassIcon"
        />
      </div>

      <div className="hidden lg:flex">
        <SelectField
          name="sort_by"
          label="Sort by"
          placeholder="Latest"
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

      <div className="flex lg:hidden">
        <SelectField
          name="sort_by"
          icon="SortByIcon"
          variant="icon-only"
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
    </div>
  );
};

export default BillFilters;
