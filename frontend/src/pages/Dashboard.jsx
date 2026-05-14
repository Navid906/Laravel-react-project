import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import api from "../api/axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [usersCount, setUsersCount] = useState(0);
  const [notificationsCount, setNotificationsCount] =
    useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();

    // 🔥 GLOBAL REAL-TIME LISTENER (FIXED)
    const handleNotificationUpdate = () => {
      fetchNotifications();
    };

    window.addEventListener(
      "notification-update",
      handleNotificationUpdate
    );

    return () => {
      window.removeEventListener(
        "notification-update",
        handleNotificationUpdate
      );
    };
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      setUser(response.data);

      if (response.data.role === "admin") {
        fetchUsers();
        fetchNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsersCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotifications = async () => {
    try {
    const res = await api.get("/notifications");

    const unread = res.data.filter((n) => !n.read).length;

    setNotificationsCount(unread);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <Layout user={user}>
      <h1 style={{ marginBottom: "30px", fontSize: "32px" }}>
        Welcome {user?.name}
      </h1>

      {/* ADMIN DASHBOARD */}
      {user?.role === "admin" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {/* USERS CARD */}
          <AnimatedCard
            title="Total Users"
            value={usersCount}
            icon={<FaUsers size={35} />}
          />

          {/* NOTIFICATIONS CARD */}
          <motion.div
            onClick={() => navigate("/notifications")}
            whileHover={{ scale: 1.05 }}
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              boxShadow:
                "0 5px 20px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>Notifications</h3>
                <h1>{notificationsCount}</h1>
              </div>

              <FaBell size={35} />
            </div>
          </motion.div>
        </div>
      )}

      {/* USER DASHBOARD */}
      {user?.role === "user" && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <FaUserCircle size={120} color="#2563eb" />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </motion.div>
      )}
    </Layout>
  );
};

const AnimatedCard = ({ title, value, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "20px",
        boxShadow:
          "0 5px 20px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3>{title}</h3>
          <h1>{value}</h1>
        </div>
        {icon}
      </div>
    </motion.div>
  );
};

export default Dashboard;