// src/App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Button, Spin, Typography } from "antd";
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
  const [collapsed, setCollapsed] = useState(false); // State for sidebar collapse

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("https://dummyjson.com/products");
        setProducts(result.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCompare = (product) => {
    if (!selectedProducts.some((p) => p.id === product.id) && selectedProducts.length < 4) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemove = (id) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
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
        {/* HEADER */}
        <Navbar />

        <Layout>
          {/* SIDEBAR */}
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
              {/* LOADING STATE */}
              {loading ? (
                <div style={{ textAlign: "center", padding: "50px" }}>
                  <Spin size="large" />
                  <Title level={4} style={{ marginTop: "10px", color: "#555" }}>
                    Loading products...
                  </Title>
                </div>
              ) : (
                <Routes>
                  {/* PRODUCT DETAILS PAGE */}
                  <Route path="/" element={<ProductDetails products={products} onCompare={handleCompare} />} />

                  {/* COMPARE PAGE */}
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
                        <ProductModal visible={modalVisible} onClose={handleCloseModal} products={products} onSelect={handleCompare} />
                      </>
                    }
                  />
                </Routes>
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;