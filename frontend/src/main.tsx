import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import { MantineProvider } from "@mantine/core";
import HowItWorksPage from "./pages/HowItWorks/HowItWorksPage.tsx";
import AboutPage from "./pages/AboutPage/AboutPage.tsx";
import ContactPage from "./pages/ContactPage/ContactPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
// import FoodListingPage from "./pages/FoodListingPage/FoodListingPage.tsx";
// import FoodOrderPage from "./pages/FoodOrderPage/FoodOrderPage.tsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.tsx";
import AdminRoute from "./utils/AdminRoute.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import RestaurantsPage from "./pages/admin/RestaurantsPage.tsx";
import FoodItemsPage from "./pages/admin/FoodItemsPage.tsx";
import VolunteersPage from "./pages/admin/VolunteersPage.tsx";
import UsersPage from "./pages/admin/UsersPage.tsx";
import OrdersPage from "./pages/admin/OrdersPage.tsx";
import PickupsPage from "./pages/admin/PickupsPage.tsx";
import ProfilePage from "./pages/admin/ProfilePage.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
// import AdminTestPanel from "./components/admin/AdminTestPanel.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/aboutus" element={<AboutPage />} />
        {/* <Route path="/food-listing" element={<FoodListingPage />} />
        <Route path="/food-order/:id" element={<FoodOrderPage />} /> */}
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/admintest" element={<AdminTestPanel />} /> */}

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="restaurants" element={<RestaurantsPage />} />
          <Route path="food-items" element={<FoodItemsPage />} />
          <Route path="volunteers" element={<VolunteersPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="pickups" element={<PickupsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings/profile" element={<ProfilePage />} />
          <Route
            path="settings"
            element={
              <div className="p-8">
                <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-600">
                    Settings
                  </h3>
                  <p className="text-gray-500">Coming soon...</p>
                </div>
              </div>
            }
          />
        </Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  </StrictMode>
);
