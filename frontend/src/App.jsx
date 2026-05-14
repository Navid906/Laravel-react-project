import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import Users from "./pages/Users";

import ProtectedRoute from "./components/ProtectedRoute";

import Notifications from "./pages/Notifications";

import MyProfile from "./pages/MyProfile";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>

                            <Users />

                        </ProtectedRoute>
                    }
                />
                <Route
                      path="/notifications"
                      element={<Notifications />}
                />
                <Route
                    
                      path="/my-profile"
                      element={<MyProfile />}
                />
            </Routes>

        </BrowserRouter>
    );
}

export default App;