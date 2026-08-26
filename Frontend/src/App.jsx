import { useState } from "react";
import { Route, Routes } from "react-router";
import { useEffect } from "react";

import { getCurrentUser, logout } from "./services/authService";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

import CompanyNavBar from "./components/CompanyNavBar";
import HomepageNavBar from "./components/HomepageNavBar"
import HrNavBar from "./components/HrNavBar";
import RootLayout from "./components/RootLayout";

import Navbar from "./components/Navbar";

import Homepage from "./pages/Homepage";
import SignupPage from "./pages/Auth/SignupPage";
import SignInPage from "./pages/Auth/SigninPage";

import HrListPage from "./pages/Company/HrListPage"
import ShowRulesPage from "./pages/Rules/ShowRulesPage"
import EditRulesPage from "./pages/Rules/EditRulesPage"

import DashboardPage from "./pages/Records/DashboardPage"
import UploadPunchPage from "./pages/Punch/UploadPunchesPage"
import EmployeeRecordsPage from "./pages/Records/EmployeeRecordsPage"

import PageNotFound from "./pages/PageNotFound"

function App() {
  return (
    <div>

      <Routes>
        <Route element={<RootLayout />}>
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* Landing Page */}
        <Route element={<HomepageNavBar />}>
          <Route path="/" element={<Homepage />} />
          <Route path='/sign-up-company' element={<SignupPage />} />
          <Route path='/sign-in' element={<SignupPage />} />
        </Route>

        {/* Compnay Pages */}
        <Route element={<CompanyNavBar />}>
          <Route path='/hr-list' element={<ProtectedRoute><HrListPage /></ProtectedRoute>} />
          <Route path='/company-rules' element={<ProtectedRoute><ShowRulesPage /></ProtectedRoute>} />
          <Route path='/company-rules/edit' element={<ProtectedRoute><EditRulesPage /></ProtectedRoute>} />
        </Route>

        {/* HR Pages */}
        <Route element={<HrNavBar />}>
          <Route path='/dashboard' element={<ProtectedRoute></ProtectedRoute>} />
          <Route path='/punches' element={<ProtectedRoute><UploadPunchPage /></ProtectedRoute>} />
          <Route path='/employees-records' element={<ProtectedRoute><EmployeeRecordsPage /></ProtectedRoute>} />
          <Route path='/rules' element={<ProtectedRoute><ShowRulesPage /></ProtectedRoute>} />
        </Route>
      </Routes >

    </div >
  );
}

export default App;
