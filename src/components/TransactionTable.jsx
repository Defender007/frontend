import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Table from "react-bootstrap/Table";
import ApiRoute from "../config/ApiSettings";

export default function TransactionTable(props) {
  const [transactions, setTransactions] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    const TRANSACTIONS_URL = ApiRoute.TRANSACTION_LIST_PATH;

    async function fetchData() {
      try {
        const response = await fetch(TRANSACTIONS_URL, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const content = await response.json();
        if (content?.detail) {
          setTransactions([]);
        }
        if (content?.auth_error) {
          console.log("#####Transaction Auth_Error:", content);
          localStorage.removeItem("profile");
          throw new Error(JSON.stringify(content));
        }
        if (content?.length > 0) {
          setTransactions(content);
          console.log("Transaction List:", content);
        }
      } catch (error) {
        window.location.assign(`${ApiRoute.FRONTEND_DOMAIN}/login`);
      }
    }

    const admin =
      props?.userprofile?.user?.is_superuser ||
      props?.userprofile?.is_superuser;
    if (admin) {
      fetchData();
    }
  }, []);

  const columns = [
    "#",
    "Holder",
    "UID",
    "Access Point",
    "Swipe Count",
    "Raw Payload",
    "Authorized By",
    "Transaction Date",
    "Grant Type",
  ];
  return (
    <Table striped="columns">
      <thead>
        <tr style={{ fontSize: "x-small" }} key={'tr-0'}>
          {columns?.map((column, idx) => (
            <th key={`${column}-${idx}`}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody style={{ fontSize: "x-small" }}>
        {transactions
          ? transactions.map((xtion, idx) => (
              <tr key={xtion?.id}>
                <td>{idx}</td>
                <td>{xtion?.owner?.user?.username}</td>
                <td>{xtion?.reader_uid}</td>
                <td>{xtion?.access_point}</td>
                <td>{xtion?.swipe_count}</td>
                <td>{xtion?.raw_payload}</td>
                <td>{xtion?.authorizer?.user?.username}</td>
                <td>{xtion?.grant_type}</td>
                <td>{xtion?.date}</td>
              </tr>
            ))
          : null}
      </tbody>
    </Table>
  );
}
