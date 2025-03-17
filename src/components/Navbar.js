import React from "react";
import { Layout, Menu, Dropdown, Input, Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, SearchOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navbar = () => {
  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">View Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        background: "#1890ff",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo */}
      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#fff" }}>
      CompareWise
      </div>

      {/* Navigation Links */}
      <Menu
        mode="horizontal"
        style={{ background: "transparent", flex: 1, justifyContent: "center" }}
      >
        <Menu.Item key="home" style={{ color: "white", textDecoration: "none" }}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="compare" style={{ color: "white", textDecoration: "none" }}>
          <Link to="/compare">Compare</Link>
        </Menu.Item>
        <Menu.Item key="about" style={{ color: "white", textDecoration: "none" }}>
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="contact" style={{ color: "white", textDecoration: "none" }}>
          <Link to="/contact">Contact</Link>
        </Menu.Item>
      </Menu>

      {/* Search Bar */}
      <Input
        placeholder="Search products..."
        prefix={<SearchOutlined />}
        style={{
          width: 200,
          marginRight: "15px",
          borderRadius: "5px",
          background: "#fff",
        }}
      />

      {/* User Profile Dropdown */}
      <Dropdown overlay={menu} placement="bottomRight">
        <Button type="text" style={{ color: "#fff" }}>
          <Avatar icon={<UserOutlined />} style={{ marginRight: "5px" }} />
          User
        </Button>
      </Dropdown>
    </Header>
  );
};

export default Navbar;
