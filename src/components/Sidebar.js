import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { AppstoreOutlined, BarChartOutlined } from "@ant-design/icons";

const Sidebar = () => {
  const location = useLocation(); // Get current route

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{
        width: 260,
        borderRadius: "10px",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        background: "#f9f9f9",
        padding: "10px",
        fontSize: "16px",
        fontWeight: "500",
      }}
    >
      <Menu.Item key="/" icon={<AppstoreOutlined />}>
        <Link to="/">Product Details</Link>
      </Menu.Item>
      <Menu.Item key="/compare" icon={<BarChartOutlined />}>
        <Link to="/compare">Compare Products</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
