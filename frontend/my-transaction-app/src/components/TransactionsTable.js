import React from "react";

const TransactionsTable = ({ transactions }) => {
  return (
    <div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              {" "}
              {/* Assuming 'id' as a unique identifier */}
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>
                {transaction.image ? (
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    width="50"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
