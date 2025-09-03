import Badge from "@/components/atoms/Badge";

const PriorityBadge = ({ priority, className }) => {
  const priorityConfig = {
    high: { 
      variant: "high", 
      label: "High",
      className: "animate-pulse-subtle"
    },
    medium: { 
      variant: "medium", 
      label: "Medium" 
    },
    low: { 
      variant: "low", 
      label: "Low" 
    }
  };

  const config = priorityConfig[priority] || priorityConfig.low;

  return (
    <Badge 
      variant={config.variant} 
      className={`${config.className || ""} ${className || ""}`}
    >
      {config.label}
    </Badge>
  );
};

export default PriorityBadge;