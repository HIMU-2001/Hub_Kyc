// src/components/ProductTable.js

import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Tooltip, Image } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const ProductTable = ({ onCompare }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      align: "center",
      render: (image) => (
        <Image
          src={image}
          alt="Product"
          width={50}
          height={50}
          style={{ borderRadius: "8px", objectFit: "cover" }}
          preview={false}
        />
      ),
    },
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
        <Tooltip title={desc} placement="topLeft">
          <Text ellipsis style={{ maxWidth: "200px", display: "block", color: "#595959" }}>
            {desc}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Price (₹)",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) => <Text style={{ color: "#ff4d4f", fontWeight: "bold" }}>₹{price}</Text>,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      align: "center",
      render: (text) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
      render: (text) => <Text style={{ color: "#52c41a", fontWeight: "500" }}>{text}</Text>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          size="middle"
          shape="round"
          style={{ backgroundColor: "#1890ff", border: "none" }}
          onClick={() => {
            onCompare(record);
            navigate("/compare");
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
      pagination={{ pageSize: 8 }}
      bordered
      size="large"
      style={{
        marginTop: "20px",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    />
  );
};

export default ProductTable;
