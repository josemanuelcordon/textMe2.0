import { Column, Grid, FileUploader, Button, Layer, Tile } from "@carbon/react";
import React, { useEffect, useState } from "react";
import UserService from "../../service/UserService";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Locked } from "@carbon/icons-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";
import { Notification } from "../../domain/Notification";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [friends, setFriends] = useState([]);
  const [profileImage, setProfileImage] = useState(
    `http://localhost:3000/profile-image/${user.id}`
  );

  const { addNotification } = useNotifications();

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const renamedFile = new File(
        [file],
        `profile-${user.id}${file.name.substring(file.name.lastIndexOf("."))}`,
        {
          type: file.type,
        }
      );
      setSelectedFile(renamedFile);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();

    formData.append("image", selectedFile);
    try {
      setProfileImage("");
      const response = await fetch(
        "http://localhost:3000/upload/profile-image",
        {
          method: "POST",
          body: formData,
        }
      );
      setTimeout(() => {
        setProfileImage(
          `http://localhost:3000/profile-image/${
            user.id
          }?timestamp=${new Date().getTime()}`
        );
        addNotification(
          new Notification("Imagen cambiada con éxito", "success")
        );
      }, [5000]);
    } catch (error) {
      setProfileImage(
        `http://localhost:3000/profile-image/${
          user.id
        }?timestamp=${new Date().getTime()}`
      );
      console.error("Error al subir la imagen", error);
      alert("Error al subir la imagen");
    }
  };

  useEffect(() => {
    const getFriends = async () => {
      const friends = await UserService.getUserFriends(user.id);
      setFriends(friends);
    };

    getFriends();
  }, []);

  return (
    <>
      <main className="profile--template">
        <Grid narrow fullWidth>
          <Column lg={16} md={8} sm={4} className="profile-title">
            <h1>Perfil</h1>
          </Column>
          <Column lg={5} md={8} sm={4}>
            <section className="profile-image">
              <img
                style={{ width: "264px", height: "264px", borderRadius: "50%" }}
                src={profileImage}
              />
              <section className="upload-buttons">
                <FileUploader
                  labelTitle=""
                  buttonLabel="Subir imagen"
                  buttonKind="ghost"
                  size="sm"
                  filenameStatus="edit"
                  accept={[".jpg", ".png"]}
                  multiple={false}
                  iconDescription="Eliminar archivo"
                  onChange={handleFileChange}
                />
                <Button onClick={uploadFile}>CAMBIAR FOTO</Button>
              </section>
            </section>
          </Column>
          <Column lg={11} md={8} sm={4}>
            <figure className="profile-info--container">
              <Tile className="profile-data">
                <h2>{user.username}</h2>
                <p>{user.email}</p>
                <Button className="delete-account--button" kind="danger">
                  Borrar cuenta
                </Button>
                <Layer>
                  <Tile>
                    <p>
                      <Locked /> Esta aplicación manda los mensajes de manera
                      cifrada
                    </p>
                  </Tile>
                </Layer>
              </Tile>
            </figure>
            <Tile className="friend-list">
              <h2>Amigos</h2>
              <ul>
                {friends.map((friend) => {
                  return (
                    <Layer>
                      <Tile className="friend-card" key={friend.id}>
                        <img
                          style={{ height: "32px" }}
                          src={`http://localhost:3000/profile-image/${friend.id}`}
                        />
                        <h4>{friend.username}</h4>
                      </Tile>
                    </Layer>
                  );
                })}
              </ul>
            </Tile>
          </Column>
        </Grid>
        <span className="back--icon">
          <ArrowLeft onClick={() => navigate("/")} />
        </span>
      </main>
    </>
  );
};

export default Profile;
