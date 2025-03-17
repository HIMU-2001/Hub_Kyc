// src/components/ProductTable.js

import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Tooltip } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const ProductTable = ({ onCompare }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("https://dummyjson.com/products");
        setData(result.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: {
        showTitle: false,
      },
      render: (desc) => (
        <Tooltip title={desc}>
          <Text ellipsis style={{ maxWidth: "150px", display: "block" }}>
            {desc}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Price (₹)",
      dataIndex: "price",
      key: "price",
      render: (price) => <Text style={{ color: "#1890ff", fontWeight: "bold" }}>₹{price}</Text>,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (text) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <Text type="success">{text}</Text>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => {
            onCompare(record);
            navigate("/compare"); // Navigate to comparison page
          }}
        >
          Compare
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      bordered
      size="middle"
      style={{ marginTop: "20px" }}
    />
  );
};

export default ProductTable;
