import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );

      window.dispatchEvent(new Event("notification-update"));
    } catch (err) {
      console.log(err);
    }
  };

  const markAll = async () => {
    try {
      await api.put("/notifications/read-all");

      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );

      window.dispatchEvent(new Event("notification-update"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Notifications</h2>

        <button onClick={markAll}>
          Mark all as read
        </button>
      </div>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((n) => (
          <motion.div
            key={n.id}
            onClick={() => markAsRead(n.id)}
            style={{
              padding: "15px",
              marginTop: "10px",
              background: n.read ? "#eee" : "#fff",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {n.message}
          </motion.div>
        ))
      )}
    </div>
  );
};

export default Notifications;