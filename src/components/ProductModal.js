import React from "react";
import { Modal, Table, Button } from "antd";

const ProductModal = ({ visible, onClose, products, onSelect }) => {
  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Price (₹)",
      dataIndex: "price",
      key: "price",
      render: (price) => <span style={{ color: "#1890ff", fontWeight: "bold" }}>₹{price}</span>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button type="primary" size="small" onClick={() => onSelect(record)}>
          Add
        </Button>
      ),
    },
  ];

  return (
    <Modal
      title="Add More Products"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      style={{ padding: "20px" }}
    >
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
        size="middle"
        style={{ marginTop: "10px" }}
      />
    </Modal>
  );
};

export default ProductModal;
