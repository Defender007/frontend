import React, { useState, useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ApiRoute from "../config/ApiSettings";

export default function TransactionTable() {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const TRANSACTIONS_URL = ApiRoute.TRANSACTION_PATH;
try {
      async function fetchData() {
        const response = await fetch(TRANSACTIONS_URL, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const content = await response.json();
        if (content?.detail) {
          setTransactions(null);
        }
        if (content?.length > 0) {
          setTransactions(content);
          console.log("Transaction List:", content)
        }
      }
      fetchData();
} catch (error) {
  console.log("Transaction List Error:", error)
}
    
  }, []);

  const columns = [
    "#",
    "Owner",
    "UID",
    "Access Point",
    "Swipe Count",
    "Raw Payload",
    "Requested By",
    "Transaction Date",
  ];
  return (
    <Table striped="columns">
      <thead>
        <tr style={{fontSize: "small"}}>
          {columns?.map((column, idx) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody style={{fontSize: "x-small"}}>
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
                <td>{xtion?.date}</td>
              </tr>
            ))
          : null}
      </tbody>
    </Table>
  );
}
