import { useState, useEffect } from "react";
import { formatDate, truncateMessage } from "../../helpers/format";
import read from "../../assets/svg/read.svg";
import unread from "../../assets/svg/unread.svg";
import { getToken, hasPermission } from "../../utils/auth";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import DeleteBtn from "../DeleteBtn/DeleteBtn";

export default function MessagesTable() {
  const [messages, setMessages] = useState([]);
  const token = getToken();
  const isAdmin = hasPermission("admin");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5165/api/messages", {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const fetchedMessages = res.data.data?.messages || [];
        setMessages(fetchedMessages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  const handleRowClick = (id) => {
    navigate(`/messages/${id}`);
  };

  const handleDelete = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== messageId)
    );
  };

  return (
    <div>
      <h1 className="mt-5">Messages</h1>
      <table className="w-100">
        <thead className="border-bottom-1">
          <tr>
            <th>Name</th>
            <th>Message</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Read</th>
            <th>Date</th>
            {isAdmin && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr
              key={msg.id}
              onClick={() => handleRowClick(msg.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{msg.name}</td>
              <td>{truncateMessage(msg.message, 50)}</td>
              <td>
                {msg.gender.charAt(0).toUpperCase() + msg.gender.slice(1)}
              </td>
              <td>{msg.country}</td>
              <td>
                <img
                  src={msg.read === "true" ? read : unread}
                  alt="read status"
                  style={{ width: "20px" }}
                />
              </td>
              <td>{formatDate(msg.creationDate)}</td>
              {isAdmin && (
                <td>
                  <DeleteBtn messageId={msg.id} onDelete={handleDelete} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
