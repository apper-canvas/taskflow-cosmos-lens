import { motion } from "framer-motion";

const Loading = ({ className }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="bg-white rounded-lg p-6 shadow-card animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-card animate-pulse">
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-20"></div>
          ))}
        </div>
      </div>

      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-lg p-4 shadow-card animate-pulse"
        >
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded mt-1"></div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                <div className="flex items-center gap-2">
                  <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-16"></div>
                  <div className="w-6 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                  <div className="w-6 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                </div>
              </div>
              
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
              
              <div className="flex items-center gap-2 mt-3">
                <div className="w-4 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;