import React from "react";
import { useFormContext } from "react-hook-form";

const VALUES = {
  none: 1.0,
  low: 0.6666666666666667,
  medium: 0.3333333333333333,
  high: 0,
};

type props = {
  name: string;
};

const CoeficientSelector: React.FC<props> = ({ name }) => {
  const entries = Object.entries(VALUES);
  const { register } = useFormContext();
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        border: "1px solid black",
        padding: "1rem",
      }}
    >
      {name}
      <select {...register(name)}>
        {entries.map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CoeficientSelector;
