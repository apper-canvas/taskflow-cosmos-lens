import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found",
  description = "Get started by creating your first item.",
  actionText = "Get Started",
  onAction,
  icon = "FileText",
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-12 px-6 ${className}`}
    >
      <div className="bg-white rounded-xl shadow-card p-8 max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
          className="w-20 h-20 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name={icon} size={36} className="text-primary-600" />
        </motion.div>

        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold font-display text-gray-900 mb-3"
        >
          {title}
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-6 leading-relaxed"
        >
          {description}
        </motion.p>

        {onAction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              onClick={onAction}
              className="flex items-center gap-2 mx-auto"
            >
              <ApperIcon name="Plus" size={16} />
              {actionText}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;