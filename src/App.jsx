import React from "react";
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import {
  AllApartmentsPage,
  BuildingPage,
  CommercialPage,
  FloorPage,
  GeneralBuildingPage,
  HomePage,
  ParkingPage,
  SingleApartmentPage,
  WishlistPage,
  ConditionalLayout,
  ErrorPage,
  AllCommercialPage,
  VirtualPage,
  AllParkingPage,
} from "./pages";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./components/auth/AuthProvider";
import AdminPage from "./pages/admin/AdminPage";
import FloorSvgPage from "./pages/FloorSvgPage";
import SingleCommercialPage from "./pages/SingleCommercialPage";

function App() {
  return (
    <Router>
      <ConditionalLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apartments" element={<AllApartmentsPage />} />
          <Route path="/apartments/:id" element={<SingleApartmentPage />} />
          <Route path="/buildings" element={<GeneralBuildingPage />} />
          <Route path="/buildings/:mode/:id" element={<BuildingPage />} />
          <Route path="/buildings/:id/floor/:floorId" element={<FloorPage />} />
          <Route path="/afarizmi" element={<AllCommercialPage />} />
          <Route path="/afarizmi/:id" element={<CommercialPage />} />
          <Route path="/afarizmi/njesia/:id" element={<SingleCommercialPage />} />
          <Route path="/parking" element={<AllParkingPage />} />
          <Route path="/parking/:id" element={<ParkingPage />} />
          <Route path="/floorsvg/:id" element={<FloorSvgPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/360-virtual" element={<VirtualPage />} />
          <Route
            path="/admin/*"
            element={
              <AuthProvider>
                <AdminPage />
              </AuthProvider>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ConditionalLayout>
      <ToastContainer />
    </Router>
  );
}

export default App;
