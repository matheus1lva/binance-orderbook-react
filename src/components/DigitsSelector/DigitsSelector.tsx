import { Select } from "@chakra-ui/react";
import { useOrderBookContext } from "../../Contexts/BidsContext";

export function DigitsSelector() {
  const options = [
    {
      label: "0.01",
      decimal: 2,
      thousand: 0,
    },
    {
      label: "0.1",
      decimal: 1,
      thousand: 0,
    },
    {
      label: "1",
      decimal: 0,
      thousand: 0,
    },
    {
      label: "10",
      decimal: 0,
      thousand: 1,
    },
    {
      label: "50",
      decimal: 0,
      thousand: 5,
    },
    {
      label: "100",
      decimal: 0,
      thousand: 3,
    },
  ];
  const { setPrecision } = useOrderBookContext();
  return (
    <Select
      placeholder="Select option"
      width={"100px"}
      onChange={(evt) => {
        const value = options.find((a) => a.label === evt.target.value);
        setPrecision(value);
      }}
    >
      {options.map((opt) => {
        return (
          <option key={opt.label} value={opt.label}>
            {opt.label}
          </option>
        );
      })}
    </Select>
  );
}
