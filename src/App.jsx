import { useState, useEffect } from "react";
import Plane from "./components/Plane/Plane";
import Speedometer from "./components/Speedometer/Speedometer";
import Battery from "./components/Battery/Battery";
import "./App.css"
// import useWebSocket from 'react-use-websocket';

function App() {
  const [angle, setAngle] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [battery, setBattery] = useState(100);

  const socketUrl = "ws://localhost:5175";
  const [socket, setSocket] = useState(null);
  
  const connectWebSocket = () => {
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
      console.log("WebSocket connection established.");
    };

    ws.onmessage = (message) => {
      // Parse the received message and update the corresponding state
      const { eventName, data } = JSON.parse(message.data);
      switch (eventName) {
        case "PLANE_ANGLE":
          setAngle(data.angle);
          break;
        case "PLANE_SPEED":
          setSpeed(data.speed);
          break;
        case "PLANE_BATTERY":
          setBattery(data.battery);
          break;
        default:
          break;
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    setSocket(ws);
  };

  // Function to handle the "Start" button click
  const handleStart = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      // Send "START" command to the backend
      socket.send("START");
    } else {
      console.error("WebSocket is not open.");
    }
  };

  // Function to handle the "Stop" button click
  const handleStop = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      // Send "STOP" command to the backend
      socket.send("STOP");
    } else {
      console.error("WebSocket is not open.");
    }
  };

  // Connect WebSocket on component mount
  useEffect(() => {
    connectWebSocket();
    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <div className="app-container">
      <Plane angle={angle} />
      <Speedometer speed={speed} />
      <Battery level={battery} />
      <div className="controls">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
}

export default App;
