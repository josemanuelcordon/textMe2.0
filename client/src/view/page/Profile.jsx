import { Column, Grid, FileUploader, Button } from "@carbon/react";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);

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
      const response = await fetch(
        "http://localhost:3000/upload/profile-image",
        {
          method: "POST",
          body: formData,
        }
      );
    } catch (error) {
      console.error("Error al subir la imagen", error);
      alert("Error al subir la imagen");
    }
  };

  return (
    <Grid className="page--template">
      <Column lg={16}>
        <h1>Perfil</h1>
        <h2>{user.name}</h2>
        <img
          style={{ width: "264px", height: "264px", borderRadius: "50%" }}
          src={`http://localhost:3000/profile-image/${user.id}`}
        />
        <FileUploader
          labelTitle="Subir imagen de perfil"
          buttonLabel="Subir imagen"
          buttonKind="ghost"
          size="sm"
          filenameStatus="edit"
          accept={[".jpg", ".png"]}
          multiple={false}
          iconDescription="Eliminar archivo"
          onChange={handleFileChange}
        />
        <Button onClick={uploadFile}>SUBIR</Button>
      </Column>
    </Grid>
  );
};

export default Profile;
