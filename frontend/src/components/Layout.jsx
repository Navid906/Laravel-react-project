import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaUsers,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";

const Layout = ({ children, user }) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div style={{ display: "flex" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: open ? "240px" : "80px",
          height: "100vh",
          background: "#111827",
          color: "white",
          transition: "0.3s",
          paddingTop: "20px",
          position: "fixed",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          {open && <h2>Dashboard</h2>}

          <button
            onClick={() => setOpen(!open)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div style={{ marginTop: "40px" }}>
          <SidebarLink
            to="/dashboard"
            icon={<FaHome />}
            text="Home"
            open={open}
          />

          <SidebarLink
            to="/my-profile"
            icon={<FaUser />}
            text="My Profile"
            open={open}
          />

          {user?.role === "admin" && (
            <>
              <SidebarLink
                to="/users"
                icon={<FaUsers />}
                text="Users"
                open={open}
              />

              <SidebarLink
                to="/notifications"
                icon={<FaBell />}
                text="Notifications"
                open={open}
              />
            </>
          )}

          <button
            onClick={logout}
            style={{
              width: "100%",
              padding: "15px",
              background: "none",
              border: "none",
              color: "white",
              textAlign: "left",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <FaSignOutAlt />
            {open && "Logout"}
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div
        style={{
          marginLeft: open ? "240px" : "80px",
          width: "100%",
          transition: "0.3s",
          minHeight: "100vh",
          background: "#f3f4f6",
          padding: "30px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, text, open }) => {
  return (
    <Link
      to={to}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "white",
        textDecoration: "none",
        padding: "15px 20px",
      }}
    >
      {icon}
      {open && text}
    </Link>
  );
};

export default Layout;