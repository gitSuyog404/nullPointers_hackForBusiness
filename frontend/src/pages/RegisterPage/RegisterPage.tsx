import { motion } from "framer-motion";
import { Title, Text, Container } from "@mantine/core";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../components/ui/FormInput";
import FormCheckbox from "../../components/ui/FormCheckbox";
import { useSignUpMutation } from "../../redux/slices/userApiSlice";
import { useAppDispatch } from "../../redux/hooks";
import { setCredentials } from "../../redux/slices/authSlice";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  isRestaurant: boolean;
  address?: string;
  registrationNumber?: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "onChange",
  });

  const isRestaurant = watch("isRestaurant");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log("Registration data:", data);

      const result = await signUp(data).unwrap();

      if (result.user) {
        dispatch(setCredentials(result.user));

        toast.success(
          `Account created successfully! Welcome ${
            data.isRestaurant
              ? "to our restaurant partner program"
              : "to Food Rescue"
          }!`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );

        reset();
        navigate("/");
      }
    } catch (error: any) {
      console.error("Registration error:", error);

      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

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
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <section className="py-20 sm:py-24 lg:py-28">
        <Container size="xl">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Title
                order={1}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
              >
                Join Food Rescue
              </Title>
              <Text
                size="xl"
                className="text-gray-600 max-w-2xl mx-auto leading-relaxed"
              >
                Help reduce food waste and support your community. Register as a
                volunteer to collect food or as a restaurant to share your
                unsold goods.
              </Text>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 lg:p-12"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center"
                >
                  Create Your Account
                </motion.h2>

                <motion.form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <FormInput
                      label="Full Name"
                      name="name"
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
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <FormInput
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Create a strong password"
                      register={register}
                      error={errors.password}
                      required
                    />
                    <FormInput
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      register={register}
                      error={errors.phone}
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    viewport={{ once: true }}
                    className="pt-4"
                  >
                    <FormCheckbox
                      label="I am registering as a restaurant"
                      name="isRestaurant"
                      register={register}
                      error={errors.isRestaurant}
                      description="Check this if you're a restaurant owner looking to share unsold food"
                    />
                  </motion.div>

                  {isRestaurant && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6 pt-4 border-t border-gray-200"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <FormInput
                          label="Restaurant Address"
                          name="address"
                          placeholder="Enter your restaurant address"
                          register={register}
                          error={errors.address}
                          required={isRestaurant}
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <FormInput
                          label="Business Registration Number"
                          name="registrationNumber"
                          placeholder="Enter your business registration number"
                          register={register}
                          error={errors.registrationNumber}
                          required={isRestaurant}
                        />
                      </motion.div>
                    </motion.div>
                  )}

                  {/* <motion.div
                    className="flex justify-center pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    viewport={{ once: true }}
                  > */}
                  <div className="flex justify-center pt-6">
                    {/* <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    > */}
                    <button
                      type="submit"
                      disabled={isSignUpLoading}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-12 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 cursor-pointer focus:ring-blue-500 focus:ring-offset-2 min-w-[200px] shadow-lg hover:shadow-xl"
                    >
                      {isSignUpLoading
                        ? "Creating Account..."
                        : "Create Account"}
                    </button>
                    {/* </motion.div> */}
                    {/* </motion.div> */}
                  </div>
                  <motion.div
                    className="text-center pt-6 border-t border-gray-200"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    <Text className="text-gray-600">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                      >
                        Sign in here
                      </Link>
                    </Text>
                  </motion.div>
                </motion.form>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default RegisterPage;
