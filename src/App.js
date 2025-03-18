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
import { fetchProducts } from "./api/product";
import useProductComparison from "./hooks/useProductComparison";
import LoadingSpinner from "./components/LoadingSpinner";
import axios from "axios";




const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const App = () => {

  const [collapsed, setCollapsed] = useState(false);

  const {
    products,
    selectedProducts,
    modalVisible,
    loading,
    setLoading,
    setProducts,
    setModalVisible,
    handleCompare,
    handleRemove,
  } = useProductComparison();
  

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const productList = await fetchProducts();
      setProducts(productList);
      setLoading(false);
    };
    getProducts();
  }, []);


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
                ( <LoadingSpinner /> )

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