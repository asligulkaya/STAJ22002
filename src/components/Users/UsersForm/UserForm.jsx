/* eslint-disable react/prop-types */
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { resizeImage } from "../../../helpers/format";
import { getToken } from "../../../utils/auth";

export default function UserForm({ user, onUpdate }) {
  const token = getToken();
  const { id } = useParams();
  const name = user.username;
  const [password, setPassword] = useState("");
  const [base64Photo, setBase64Photo] = useState("");
  const [photoPreview, setPhotoPreview] = useState(user.base64Photo);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setBase64Photo(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateUser = async (e) => {
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
              `http://localhost:5165/api/user/update/${id}`,
              {
                username: name,
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
              console.log("User updated", response.data);
              const updatedUser = response.data.data.user;
              onUpdate(updatedUser);
            }
          } catch (error) {
            console.log("Error: ", error);
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
    <form onSubmit={handleUpdateUser}>
      <div className="form-row">
        <div className="d-flex flex-column align-items-start mb-3">
          <label className="font-weight-bold">Username</label>
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder={name}
              maxLength="10"
              disabled
            />
          </div>
        </div>

        <div className="d-flex flex-column align-items-start mb-3">
          <label className="font-weight-bold">Password</label>
          <div className="col-12">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              maxLength="10"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex flex-column align-items-start mb-3">
          <label className="font-weight-bold">Role</label>
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder={user.role}
              disabled
            />
          </div>
        </div>

        <div className="d-flex flex-column align-items-start mb-3">
          <label className="font-weight-bold">Photo</label>
          <div className="col-12">
            <input
              type="file"
              className="form-control"
              onChange={handlePhotoChange}
            />
          </div>
        </div>
      </div>
      {photoPreview && (
        <div className="d-flex">
          <h6>Photo Preview: </h6>
          <img
            src={photoPreview}
            alt="Preview"
            style={{ maxWidth: "200px", marginLeft: "5%" }}
          />
        </div>
      )}
      <div className="col-12 d-flex justify-content-end">
        <button className="btn btn-primary">Edit</button>
      </div>
    </form>
  );
}
