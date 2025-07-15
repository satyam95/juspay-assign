import { useState } from "react";
import { useTheme } from "../contexts/ThemeContextUtils";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  const {theme} = useTheme()
  const [internalChecked, setInternalChecked] = useState(false);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = () => {
    if (!isControlled) {
      setInternalChecked(!internalChecked);
    }
    onChange?.(!isChecked);
  };

  return (
    <div className="relative">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="peer checked:bg-[rgba(28,28,28,1)] dark:checked:bg-[rgba(198,199,248,1)] checked:border-0 rounded-sm appearance-none w-4 h-4 border border-[rgba(28,28,28,0.2)] dark:border-[rgba(255,255,255,0.2)]"
      />
      <svg
        className="absolute w-3 h-3 top-1 left-0.5 hidden peer-checked:block pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={`${theme==="light" ? "rgba(255,255,255,1)": "rgba(28,28,28,1)"}`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
};

export default Checkbox;
