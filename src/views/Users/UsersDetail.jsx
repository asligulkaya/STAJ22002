/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../utils/auth";
import Header from "../../components/Header/Header";
import UsersCard from "../../components/Users/UsersCard/UsersCard";
import UserForm from "../../components/Users/UsersForm/UserForm";

export default function UsersDetail({ initialUser }) {
  const { id } = useParams();
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState(null);
  const token = getToken();

  useEffect(() => {
    axios
      .get(`http://localhost:5165/api/user/${id}`, {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUser(res.data.data.user);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "An error occurred");
        console.error(err);
      });
  }, [id, token]);
  console.log(user);

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <>
      <Header />
      <h1>Users Detail</h1>
      <div className="d-flex" style={{ height: "65vh" }}>
        <section className="w-50 d-flex flex-column align-items-center justify-content-center">
          {user ? <UsersCard user={user} /> : <p>Loading</p>}
          {error && <p>{error}</p>}
        </section>
        <section className="w-50 d-flex flex-column align-items-center justify-content-center">
          {user && <UserForm user={user} onUpdate={handleUserUpdate} />}
        </section>
      </div>
    </>
  );
}
