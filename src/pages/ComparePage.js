// src/pages/ComparePage.js

import React from "react";
import { Table, Button, Typography, Image, Tooltip } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ComparePage = ({ selectedProducts, onRemove }) => {
  const columns = [
    {
      title: "Attribute",
      dataIndex: "attribute",
      key: "attribute",
      width: 150,
      render: (text) => <Text strong>{text}</Text>,
    },
    ...selectedProducts.map((product) => ({
      title: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={60}
            height={60}
            style={{ borderRadius: "8px", marginBottom: "5px" }}
            preview={false}
          />
          <Text strong>{product.title}</Text>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => onRemove(product.id)}
            style={{ color: "#ff4d4f", marginTop: "5px" }}
          >
            Remove
          </Button>
        </div>
      ),
      key: product.id,
      render: (text, record) => record[product.id],
      align: "center",
    })),
  ];

  const data = [
    {
      key: "1",
      attribute: "Price",
      ...selectedProducts.reduce((acc, product) => {
        acc[product.id] = <Text style={{ color: "#ff4d4f", fontWeight: "bold" }}>₹{product.price}</Text>;
        return acc;
      }, {}),
    },
    {
      key: "2",
      attribute: "Brand",
      ...selectedProducts.reduce((acc, product) => {
        acc[product.id] = <Text type="secondary">{product.brand}</Text>;
        return acc;
      }, {}),
    },
    {
      key: "3",
      attribute: "Category",
      ...selectedProducts.reduce((acc, product) => {
        acc[product.id] = <Text style={{ color: "#52c41a", fontWeight: "500" }}>{product.category}</Text>;
        return acc;
      }, {}),
    },
    {
      key: "4",
      attribute: "Description",
      ...selectedProducts.reduce((acc, product) => {
        acc[product.id] = (
          <Tooltip title={product.description} placement="topLeft">
            <Text ellipsis style={{ maxWidth: "200px", display: "block", color: "#595959" }}>
              {product.description}
            </Text>
          </Tooltip>
        );
        return acc;
      }, {}),
    },
  ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
        Compare Products
      </Title>
      {selectedProducts.length === 0 ? (
        <Text type="secondary" style={{ display: "block", textAlign: "center", fontSize: "16px" }}>
          No products selected for comparison.
        </Text>
      ) : (
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          bordered
          size="middle"
          style={{ borderRadius: "8px", overflow: "hidden" }}
        />
      )}
    </div>
  );
};

export default ComparePage;
