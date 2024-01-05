import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ApiRoute from "../ApiSettings";

export default function RightCardLayout() {
  const [profilePix, setProfilePix] = useState("");
  const [profilePixValue, setProfilePixValue] = useState("");
  const [fileObject, setFileObject] = useState({});


  // const BASE_URL = "http://localhost:8000"
  // const AVATAR_PATH = "api/avatar";
  const BASE_URL = ApiRoute.API_DOMAIN
  const AVATAR_URL = ApiRoute.AVATAR_PATH
  const IMAGE_PATH = ""


  // useEffect(() => {
  //   console.log("Profile Pix: ", profilePix);
  //   console.log("File Object: ", fileObject);
  // },[]);

  const getFile = (e) => {
    e.preventDefault();
    setProfilePixValue(e.target.value);
    setFileObject(e.target.files[0]);
    try {
      const fileObjUrl = URL.createObjectURL(e.target.files[0]);
      setProfilePix(fileObjUrl);
    } catch (error) {
      setProfilePix("");
    }
  };

  const uploadPix = async (e) => {
    e.preventDefault();
    const fData = new FormData();
    fData.append('profile_image', fileObject);
    const response = await fetch(`${AVATAR_URL}`, {
      method: "PATCH",
      // headers: { "Content-Type": "multipart/form-data" },
      credentials: "include",
      body: fData,
    });
    const {profile_image} = await response.json();
    console.log("Content: ", profile_image);
    console.log("API Pix: ", `${BASE_URL}${profile_image}`);
    setProfilePix(`${BASE_URL}${profile_image}`)
  };

  return (
    <Card>
      <Image
        src={profilePix ? profilePix : "headmug.jpeg"}
        roundedCircle
        width={profilePix ? 170 : 150}
        height={profilePix ? 170 : 150}
        style={{ marginRight: "auto", marginLeft: "auto" }}
      />
      <Card.Body>
        <Card.Text>
          <em>Avatar</em>
        </Card.Text>
        <Form onSubmit={uploadPix}>
          <Form.Group controlId="formFileSm" className="mb-3">
            {/* <Form.Label>Avatar</Form.Label> */}
            <Form.Control
              type="file"
              size="sm"
              name="profile_image"
              onChange={getFile}
              value={profilePixValue}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            style={{
              width: "100%",
            }}
            onClick={() => setProfilePixValue("")}
          >
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
