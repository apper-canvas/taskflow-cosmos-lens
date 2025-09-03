import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ className, checked, onChange, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        ref={ref}
        {...props}
      />
      <div
        className={cn(
          "w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200 flex items-center justify-center",
          checked 
            ? "bg-gradient-to-r from-primary-500 to-primary-600 border-primary-500 scale-110 animate-bounce-light" 
            : "border-gray-300 bg-white hover:border-primary-400 hover:scale-105",
          className
        )}
        onClick={() => onChange && onChange({ target: { checked: !checked } })}
      >
        {checked && (
          <ApperIcon 
            name="Check" 
            size={12} 
            className="text-white animate-bounce-light" 
          />
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;