import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ApiRoute, { ApiLogout, Capitalize } from "../config/ApiSettings";
import { Context } from "../App";

export default function AccessRightFeeder({ userData }) {
  // const [ownerDetails, setOwnerDetails] = useState(null);
  // const {
  //   profile: [userProfile, setUserProfile],
  // } = useContext(Context);

  const BASE_URL = ApiRoute.API_DOMAIN;
  // const DETAILS_URL = ApiRoute.TRANSACTION_OWNER_DETAILS_URL;

  // let payLoad;
  // try {
  //   const { payloadString } = props?.brokerdata;
  //   const ownerData = JSON.parse(payloadString);
  //   if ("grant_type" in ownerData) {
  //     payLoad = { ...ownerData };
  //   }
  // } catch (error) {
  //   console.log("$$$$$$$ broker Error @Feeder:", error.message);
  // }

  // useEffect(() => {
  //   async function transactionDetail() {
  //     try {
  //       const response = await fetch(`${DETAILS_URL}`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         credentials: "include",
  //         body: JSON.stringify(payLoad),
  //       });
  //       const content = await response?.json();
  //       if (content?.auth_error) {
  //         await ApiLogout();
  //         throw new Error(JSON.stringify(content));
  //       }
  //       if (content?.grant_type) {
  //         console.log("####DETAILS: ", content);
  //         setOwnerDetails(content);
  //       }
  //     } catch (error) {
  //       console.log("####ERROR: ", error.message);
  //     }
  //   }
  //   const admin =
  //     userProfile?.user?.is_superuser ||
  //     userProfile?.user?.is_staff ||
  //     userProfile?.is_superuser ||
  //     userProfile?.is_staff;
  //   if (admin) {
  //     transactionDetail();
  //   }
  // }, []);
  //
  const { avatar } = userData || "";
  const srcUrl = avatar ? `${BASE_URL}${avatar}` : "";
  // const { username, meal_category } = ownerDetails || '';
  return (
    <Card style={{ height: "172px"}} >
      <Image
        src={srcUrl || "headmug.jpeg"}
        roundedCircle
        width={avatar ? 170 : 150}
        height={avatar ? 170 : 150}
        style={{ marginRight: "auto", marginLeft: "auto" }}
      />
    </Card>
  );
}
