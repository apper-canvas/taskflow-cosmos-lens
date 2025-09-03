import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center py-12 px-6 ${className}`}
    >
      <div className="bg-white rounded-xl shadow-card-hover p-8 max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name="AlertCircle" size={32} className="text-red-600" />
        </motion.div>

        <h3 className="text-lg font-semibold font-display text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>

        {onRetry && (
          <Button 
            onClick={onRetry}
            className="flex items-center gap-2 mx-auto"
          >
            <ApperIcon name="RefreshCw" size={16} />
            Try Again
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;