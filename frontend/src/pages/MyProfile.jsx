import React, { useEffect, useState } from "react";

import Layout from "../components/Layout";

import api from "../api/axios";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");

      setUser(response.data);

      const nameParts =
        response.data.name.split(" ");

      setFirstName(nameParts[0] || "");

      setLastName(
        nameParts.slice(1).join(" ")
      );
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        `/my-profile/${user.id}`,
        {
          name:
            firstName + " " + lastName,

          email: user.email,

          phone: user.phone,

          address: user.address,

          role: user.role,
        }
      );

      alert(
        "Profile updated successfully"
      );

      fetchProfile();

    } catch (error) {

      console.log(error);

      alert("Update failed");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Layout user={user}>
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
          }}
        >
          My Profile
        </h1>

        <form onSubmit={updateProfile}>
          {/* FIRST + LAST NAME */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              <label>
                First Name
              </label>

              <input
                type="text"
                value={firstName}
                onChange={(e) =>
                  setFirstName(
                    e.target.value
                  )
                }
                style={inputStyle}
              />
            </div>

            <div>
              <label>
                Last Name
              </label>

              <input
                type="text"
                value={lastName}
                onChange={(e) =>
                  setLastName(
                    e.target.value
                  )
                }
                style={inputStyle}
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label>Email</label>

            <input
              type="email"
              value={user?.email || ""}
              disabled
              style={disabledStyle}
            />
          </div>

          {/* PHONE */}
          <div>
            <label>Phone</label>

            <input
              type="text"
              value={user?.phone || ""}
              disabled
              style={disabledStyle}
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label>Address</label>

            <textarea
              value={
                user?.address || ""
              }
              disabled
              style={{
                ...disabledStyle,
                height: "100px",
              }}
            />
          </div>

          {/* ROLE */}
          <div>
            <label>Role</label>

            <input
              type="text"
              value={user?.role || ""}
              disabled
              style={disabledStyle}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              padding:
                "12px 25px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Update Profile
          </button>
        </form>
      </div>
    </Layout>
  );
};

const inputStyle = {
  width: "100%",

  padding: "12px",

  marginTop: "10px",

  marginBottom: "20px",

  borderRadius: "10px",

  border: "1px solid #ccc",

  fontSize: "15px",
};

const disabledStyle = {
  ...inputStyle,

  background: "#f3f4f6",

  cursor: "not-allowed",
};

export default MyProfile;