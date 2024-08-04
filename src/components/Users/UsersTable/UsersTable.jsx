import classes from "./UsersTable.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { getToken } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5165/api/users", {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const fetchedUsers = res.data.data?.users || [];
        setUsers(fetchedUsers);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  const handleRowClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5165/api/user/${id}`, {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Page navigated to users detail successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      navigate(`/user/${id}`);
    }
  };

  const navigateAddUser = function () {
    navigate("/add-user");
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <h1 className="mt-5 col-10">Users</h1>
        <button
          className={`${classes.addButton} btn btn-primary col-2`}
          onClick={navigateAddUser}
        >
          Add User
        </button>
      </div>
      <table className="w-100">
        <thead className="border-bottom-1">
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => handleRowClick(user.id)}
              style={{ cursor: "pointer" }}
            >
              <td>
                <img
                  src={user.base64Photo}
                  alt="user photo"
                  style={{ width: "40px" }}
                ></img>
              </td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
