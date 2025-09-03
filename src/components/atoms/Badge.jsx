import { cn } from "@/utils/cn";

const Badge = ({ className, variant = "default", children, ...props }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700",
    secondary: "bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-700",
    accent: "bg-gradient-to-r from-accent-100 to-accent-200 text-accent-700",
    success: "bg-gradient-to-r from-green-100 to-green-200 text-green-700",
    warning: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700",
    error: "bg-gradient-to-r from-red-100 to-red-200 text-red-700",
    high: "bg-gradient-to-r from-red-100 to-red-200 text-red-700 hover:from-red-200 hover:to-red-300",
    medium: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 hover:from-yellow-200 hover:to-yellow-300",
    low: "bg-gradient-to-r from-green-100 to-green-200 text-green-700 hover:from-green-200 hover:to-green-300"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-200 hover:scale-105",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;