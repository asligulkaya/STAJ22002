import { useState } from "react";
import axios from "axios";
import { resizeImage } from "../../helpers/format";
import { getToken } from "../../utils/auth";

import Header from "../../components/Header/Header";
import Snackbar from "../../components/Snackbar/Snackbar";

export default function AddUser() {
  const token = getToken();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [base64Photo, setBase64Photo] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setBase64Photo(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (base64Photo) {
      try {
        const resizedImageBlob = await resizeImage(base64Photo, 500, 500, 1);
        console.log("Image resized and compressed");

        const reader = new FileReader();
        reader.readAsDataURL(resizedImageBlob);
        reader.onload = async () => {
          const base64String =
            "data:image/png;base64," + reader.result.split(",")[1];
          console.log("Base64 string created");
          try {
            const response = await axios.post(
              `http://localhost:5165/api/user/add-reader`,
              {
                username: username,
                password: password,
                base64Photo: base64String,
              },
              {
                headers: {
                  token,
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 200) {
              console.log("Reader added", response.data);
              setSnackbarMessage("Reader added successfully!");
              setIsSnackbarVisible(true);
              setTimeout(() => {
                setIsSnackbarVisible(false);
              }, 3000);
            }
          } catch (error) {
            console.log("Error: ", error);
            setSnackbarMessage("Error adding reader");
            setIsSnackbarVisible(true);

            setTimeout(() => {
              setIsSnackbarVisible(false);
            }, 3000);
          }
        };
        reader.onerror = (error) => {
          console.error("Error reading resized image:", error);
        };
      } catch (error) {
        console.log("Error resizing image:", error);
      }
    } else {
      console.log("No file selected");
    }
  };

  return (
    <>
      <Header />
      <h1>Add New User</h1>
      <div className="d-flex align-items-center" style={{ height: "60vh" }}>
        <section className="w-75">
          <form onSubmit={handleAddUser}>
            <div className="form-row d-flex flex-column align-items-center">
              <div className="d-flex align-items-center mb-3 col-9">
                <label className="font-weight-bold col-3">Username</label>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    maxLength="10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex align-items-center mb-3 col-9">
                <label className="font-weight-bold col-3">Password</label>
                <div className="col-6">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    maxLength="10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex align-items-center mb-3 col-9">
                <label className="font-weight-bold col-3">Role</label>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="reader"
                    disabled
                  />
                </div>
              </div>

              <div className="d-flex align-items-center mb-3 col-9">
                <label className="font-weight-bold col-3">Photo</label>
                <div className="col-6">
                  <input
                    type="file"
                    className="form-control"
                    onChange={handlePhotoChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-6 d-flex justify-content-end">
              <button className="btn btn-primary">Add User</button>
            </div>
          </form>
        </section>
        <section className="w-25">
          {photoPreview && (
            <div className="d-flex">
              <h6>Photo Preview: </h6>
              <img
                src={photoPreview}
                alt="Preview"
                style={{ width: "500px", marginLeft: "5%" }}
              />
            </div>
          )}
        </section>
        <Snackbar message={snackbarMessage} isVisible={isSnackbarVisible} />
      </div>
    </>
  );
}
