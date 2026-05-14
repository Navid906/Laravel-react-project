import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "user",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      role: "user",
    });
    setEditId(null);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (editId) {
      await api.put(`/users/${editId}`, form);
    } else {
      await api.post("/users", form);
    }

    resetForm();
    fetchUsers();
  };

  const editUser = (u) => {
    setEditId(u.id);
    setForm({
      name: u.name,
      email: u.email,
      password: "",
      phone: u.phone || "",
      address: u.address || "",
      role: u.role,
    });
  };

  const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <h1>👥 User Management</h1>

      {/* STATS CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <Card title="Total Users" value={users.length} />
        <Card
          title="Admins"
          value={users.filter((u) => u.role === "admin").length}
        />
        <Card
          title="Normal Users"
          value={users.filter((u) => u.role === "user").length}
        />
      </div>

      {/* FORM */}
      <form
        onSubmit={submit}
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "white",
          borderRadius: "12px",
        }}
      >
        <h3>{editId ? "Update User" : "Create User"}</h3>

        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} />
        <input name="email" placeholder="Email" onChange={handleChange} value={form.email} />

        {!editId && (
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={form.password}
          />
        )}

        <input name="phone" placeholder="Phone" onChange={handleChange} value={form.phone} />
        <input name="address" placeholder="Address" onChange={handleChange} value={form.address} />

        <select name="role" onChange={handleChange} value={form.role}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button>{editId ? "Update" : "Create"}</button>
        {editId && <button onClick={resetForm}>Cancel</button>}
      </form>

      {/* SEARCH */}
      <input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginTop: "20px",
          padding: "10px",
          width: "300px",
        }}
      />

      {/* USER GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {filtered.map((u) => (
          <div
            key={u.id}
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{u.name}</h3>
            <p>{u.email}</p>
            <span>{u.role}</span>

            <div style={{ marginTop: "10px" }}>
              <button onClick={() => editUser(u)}>Edit</button>
              <button onClick={() => deleteUser(u.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

const Card = ({ title, value }) => (
  <div
    style={{
      background: "#111827",
      color: "white",
      padding: "20px",
      borderRadius: "12px",
    }}
  >
    <h4>{title}</h4>
    <h2>{value}</h2>
  </div>
);

export default Users;