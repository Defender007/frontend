import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import LeftCardLayout from "../components/LeftCardLayout";
import { Context } from "../App";
import AccessRightFeeder from '../components/AccessRightFeeder'

function Access() {
  const { mqttclient } = useContext(Context);
  const [brokerMessage, setBrokerMessage] = useState(null)

  console.log("***#### MqClient @Access:", mqttclient);

  useEffect(() => {
    if (mqttclient) {
        mqttclient.onMessageArrived = (message) => {
        console.log(
          `Received message on topic ${message?.destinationName}: ${message?.payloadString}`
        );
        setBrokerMessage(message);
      };
    }
  }, [mqttclient]);

  return (
    <div>
      {" "}
      <Container>
        <Row className="" style={{ backgroundColor: "#726d6d" }}>
          <Col>
            <LeftCardLayout><AccessRightFeeder brokerdata={brokerMessage}/>
            Section A {brokerMessage?.destinationName}</LeftCardLayout>
          </Col>
          <Col>
            <LeftCardLayout>Section B {brokerMessage?.payloadString}</LeftCardLayout>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Access;
