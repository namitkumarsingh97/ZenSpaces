import { Radio } from "@material-tailwind/react";

export function RadioReport({ onChange, selectedValue }) {
  return (
    <div className="flex text-black font-ibarra gap-2">
      <Radio
        name="type"
        label="This Week"
        checked={selectedValue === "This Week"}
        onChange={() => onChange("This Week")}
      />
      <Radio
        name="type"
        label="This Month"
        checked={selectedValue === "This Month"}
        onChange={() => onChange("This Month")}
      />
      <Radio
        name="type"
        label="This Year"
        checked={selectedValue === "This Year"}
        onChange={() => onChange("This Year")}
      />
    </div>
  );
}
