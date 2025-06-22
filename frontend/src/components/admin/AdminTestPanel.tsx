import React from "react";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setCredentials, Roles } from "../../redux/slices/authSlice";
import { HiUser, HiShieldCheck } from "react-icons/hi";

const AdminTestPanel: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const makeUserAdmin = () => {
    if (userInfo) {
      const adminUser = {
        ...userInfo,
        role: Roles.ADMIN,
      };
      dispatch(setCredentials(adminUser));
    }
  };

  const makeUserCustomer = () => {
    if (userInfo) {
      const customerUser = {
        ...userInfo,
        role: Roles.CUSTOMER,
      };
      dispatch(setCredentials(customerUser));
    }
  };

  if (!userInfo) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50"
    >
      <div className="flex items-center gap-3 mb-3">
        <HiShieldCheck className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-800">Admin Test Panel</h3>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Current Role: <span className="font-medium text-blue-600">{userInfo.role}</span>
        </p>
        
        <div className="flex gap-2">
          <button
            onClick={makeUserAdmin}
            disabled={userInfo.role === Roles.ADMIN}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white text-xs rounded-lg transition-colors duration-200"
          >
            Make Admin
          </button>
          <button
            onClick={makeUserCustomer}
            disabled={userInfo.role === Roles.CUSTOMER}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-xs rounded-lg transition-colors duration-200"
          >
            Make Customer
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          For testing admin dashboard access
        </p>
      </div>
    </motion.div>
  );
};

export default AdminTestPanel;
