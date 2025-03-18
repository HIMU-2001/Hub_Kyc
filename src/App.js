// src/App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Button, Spin, Typography } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductDetails from "./pages/ProductDetails";
import ComparePage from "./pages/ComparePage";
import ProductModal from "./components/ProductModal";
import axios from "axios";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://dummyjson.com/products");
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const handleCompare = (product) => {
    if (selectedProducts.some((p) => p.id === product.id)) {
      toast.warn("This product is already selected for comparison.");
      return;
    }

    if (selectedProducts.length >= 4) {
      toast.warn("You can only compare up to 4 products.");
      return;
    }

    setSelectedProducts((prev) => [...prev, product]);
  };

  const handleRemove = (id) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddMore = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <Router>
      <Layout style={{ minHeight: "100vh", background: "#f4f4f4" }}>
        <Navbar />
        <Layout>
          <Sider
            width={260}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            style={{ background: "#fff", boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)" }}
          >
            <Sidebar />
          </Sider>
          <Layout style={{ padding: "24px" }}>
            <Content
              style={{
                background: "#fff",
                padding: "24px",
                borderRadius: "8px",
                minHeight: "80vh",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              {loading ? (
                <div style={{ textAlign: "center", padding: "50px" }}>
                  <Spin size="large" />
                  <Title level={4} style={{ marginTop: "10px", color: "#555" }}>
                    Loading products...
                  </Title>
                </div>
              ) : (
                <Routes>
                  <Route path="/" element={<ProductDetails products={products} onCompare={handleCompare} />} />
                  <Route
                    path="/compare"
                    element={
                      <>
                        <ComparePage selectedProducts={selectedProducts} onRemove={handleRemove} />
                        <div style={{ textAlign: "center", marginTop: "20px" }}>
                          <Button type="primary" size="large" onClick={handleAddMore}>
                            + Add More Products
                          </Button>
                        </div>
                        <ProductModal
                          visible={modalVisible}
                          onClose={handleCloseModal}
                          products={products}
                          onSelect={handleCompare}
                        />
                      </>
                    }
                  />
                </Routes>
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <ToastContainer /> {/* Add ToastContainer to render the toasts */}
    </Router>
  );
};

export default App;