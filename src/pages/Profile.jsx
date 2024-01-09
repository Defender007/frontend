import React from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProfileImageCardLayout from "../components/ProfileImageCardLayout";
import ProfileForm from "../components/ProfileForm";
import LeftCardLayout from "../components/LeftCardLayout";
import TransactionListTableLayout from "../components/TransactionListTableLayout";
import TransactionTable from "../components/TransactionTable";
import AccessControlFormLayout from  "../components/AccessControlFormLayout"

export default function Profile(props) {
  return (
    <div>
      {/* Home{" "} */}
      {props?.profile?.username
        ? `Hi ${props?.profile?.username}`
        : props?.profile?.user
        ? `Hi ${props?.profile?.user?.username}`
        : "You are not authenticated"}
      <Container>
        <Row className="" style={{ backgroundColor: "#726d6d" }}>
          <Col>
            <LeftCardLayout>
              <ProfileForm />
            </LeftCardLayout>
          </Col>
          <Col sm={3} style={{marginBottom: "10px"}}>
            <ProfileImageCardLayout/>
          </Col>
        </Row>
        <Row className="" style={{ backgroundColor: "#726d6d" }}>
          <Col>
            <TransactionListTableLayout>
              <TransactionTable/>
            </TransactionListTableLayout>
          </Col>
          <Col sm={3}>
            <AccessControlFormLayout brokerMessage={props.brokerdata}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

// const URL = "http://localhost:8000/api/register";

// const response = await fetch(URL, {
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(payLoad),
// });
// const content = await response.json();
