import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../utils/auth";
import Header from "../../components/Header/Header";
import MessagesTable from "../../components/Messages/MessagesTable";
import MessagesCard from "../../components/Messages/MessagesCard";

export default function MessagesDetail() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const token = getToken();

  useEffect(() => {
    axios
      .get(`http://localhost:5165/api/message/${id}`, {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setMessage(res.data.data.message);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "An error occurred");
        console.error(err);
      });
  }, [id, token]);

  if (error) {
    return (
      <div>
        <Header />
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!message) {
    return (
      <div>
        <Header />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="d-flex">
        <section className="w-50">
          <MessagesTable />
        </section>
        <section className="w-50 align-self-center">
          <h1>Message Detail</h1>
          {message ? <MessagesCard msg={message} /> : <p>Loading...</p>}
          {error && <p>{error}</p>}
        </section>
      </div>
    </div>
  );
}
