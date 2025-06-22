import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HiUser,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiPencil,
  HiSave,
  HiX,
  HiCamera,
} from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";
import FormInput from "../../components/ui/FormInput";
import FormDropdown from "../../components/ui/FormDropdown";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
}

const ProfilePage: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      name: userInfo?.name || userInfo?.userName || "",
      email: userInfo?.email || "",
      phone: userInfo?.phone || "",
      location: userInfo?.location || "",
      role: userInfo?.role || "",
    }
  });

  const roleOptions = [
    { value: "CUSTOMER", label: "Customer" },
    { value: "RESTAURANT", label: "Restaurant" },
    { value: "RIDER", label: "Rider" },
    { value: "ADMIN", label: "Admin" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const onSubmit = (data: ProfileFormData) => {
    console.log("Profile updated:", data);
    // Here you would typically send the data to your API
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = () => {
    const name = userInfo?.name || userInfo?.userName || "User";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <HiUser className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
                <p className="text-gray-600">Manage your account information</p>
              </div>
            </div>
            {!isEditing ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <HiPencil className="w-5 h-5" />
                Edit Profile
              </motion.button>
            ) : (
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  <HiX className="w-5 h-5" />
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit(onSubmit)}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <HiSave className="w-5 h-5" />
                  Save Changes
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Profile Picture</h3>
              
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-3xl font-bold">
                        {getInitials()}
                      </span>
                    )}
                  </div>
                  
                  {isEditing && (
                    <motion.label
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute bottom-0 right-0 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <HiCamera className="w-5 h-5 text-gray-600" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </motion.label>
                  )}
                </div>
                
                <div className="mt-4 text-center">
                  <h4 className="text-xl font-semibold text-gray-800">
                    {userInfo?.name || userInfo?.userName || "Unknown User"}
                  </h4>
                  <p className="text-gray-600 capitalize">
                    {userInfo?.role?.toLowerCase() || "User"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Information */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Personal Information</h3>
              
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Full Name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      register={register}
                      error={errors.name}
                      required
                    />
                    
                    <FormInput
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      register={register}
                      error={errors.email}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      register={register}
                      error={errors.phone}
                    />
                    
                    <FormInput
                      label="Location"
                      name="location"
                      type="text"
                      placeholder="Enter your location"
                      register={register}
                      error={errors.location}
                    />
                  </div>

                  <FormDropdown
                    label="Role"
                    name="role"
                    options={roleOptions}
                    placeholder="Select your role"
                    register={register}
                    error={errors.role}
                    required
                  />
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <HiUser className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium text-gray-800">
                          {userInfo?.name || userInfo?.userName || "Not provided"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <HiMail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium text-gray-800">
                          {userInfo?.email || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <HiPhone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium text-gray-800">
                          {userInfo?.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <HiLocationMarker className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium text-gray-800">
                          {userInfo?.location || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <HiUser className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium text-gray-800 capitalize">
                        {userInfo?.role?.toLowerCase() || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
