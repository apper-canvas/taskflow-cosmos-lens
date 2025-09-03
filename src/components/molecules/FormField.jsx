import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  type = "input", 
  error, 
  className,
  children,
  ...props 
}) => {
  const InputComponent = type === "textarea" ? Textarea : Input;
  
  return (
    <div className={cn("space-y-1", className)}>
      {label && <Label>{label}</Label>}
      {children || <InputComponent {...props} />}
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;