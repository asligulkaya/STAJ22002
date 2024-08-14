import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);
import { getToken } from "../../utils/auth";
import Header from "../../components/Header/Header";
import classes from "./Reports.module.css";

const ReportsPage = () => {
  const [messages, setMessages] = useState([]);
  const [messageCountByCountry, setMessageCountByCountry] = useState({});
  const [messageCountByGender, setMessageCountByGender] = useState({});
  const token = getToken();

  useEffect(() => {
    axios
      .get("http://localhost:5165/api/messages", {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const fetchedMessages = response.data.data?.messages || [];
        setMessages(fetchedMessages);
      })
      .catch((error) => {
        console.error("There was an error fetching the messages!", error);
      });
    const countryCount = {};
    const genderCount = { male: 0, female: 0 };

    messages.forEach((message) => {
      if (message.country) {
        countryCount[message.country] =
          (countryCount[message.country] || 0) + 1;
      }
      if (message.gender) {
        genderCount[message.gender] = (genderCount[message.gender] || 0) + 1;
      }
    });

    setMessageCountByCountry(countryCount);
    setMessageCountByGender(genderCount);
  }, [messages, token]);

  const countryData = {
    labels: Object.keys(messageCountByCountry),
    datasets: [
      {
        label: "Message Count by Country",
        data: Object.values(messageCountByCountry),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const genderData = {
    labels: Object.keys(messageCountByGender),
    datasets: [
      {
        label: "Message Count by Gender",
        data: Object.values(messageCountByGender),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <h1>Admin Reports</h1>
      <div>
        <div className={`${classes.reports}`}>
          <section style={{ width: "100%", maxWidth: "800px" }}>
            <div className="d-flex flex-column align-items-center mt-5">
              <h2>Message Count by Country</h2>
              <Bar data={countryData} />
            </div>
          </section>
          <section className="genderSection">
            <div>
              <h2>Message Count by Gender</h2>
              <Pie data={genderData} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ReportsPage;
