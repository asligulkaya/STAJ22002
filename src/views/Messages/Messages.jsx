import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../utils/auth";
import { formatDate, truncateMessage } from "../../helpers/format";
import Header from "../../components/Header/Header";
import read from "../../assets/read.svg";
import unread from "../../assets/unread.svg";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const token = getToken();

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

  return (
    <div>
      <Header />
      <h1 className="mt-5">Messages</h1>
      <table className="w-100">
        <thead>
          <tr>
            <th>Name</th>
            <th>Message</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Read</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id}>
              <td>{msg.name}</td>
              <td>{truncateMessage(msg.message, 50)}</td>
              <td>{msg.gender}</td>
              <td>{msg.country}</td>
              <td>
                <img
                  src={msg.read === "true" ? read : unread}
                  alt="read status"
                  style={{ width: "20px" }}
                />
              </td>
              <td>{formatDate(msg.creationDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
