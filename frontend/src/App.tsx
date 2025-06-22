import { Outlet } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import { Footer } from "./components/shared/Footer";
// import AdminTestPanel from "./components/admin/AdminTestPanel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Admin Test Panel - Only for development/testing */}
      {/* <AdminTestPanel /> */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          backgroundColor: "#ffffff",
          color: "#374151",
          borderRadius: "12px",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
      />
    </div>
  );
};

export default App;
