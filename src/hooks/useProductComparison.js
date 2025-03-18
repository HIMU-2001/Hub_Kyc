import { toast } from "react-toastify";
import { fetchProducts } from "../api/product";
import { useEffect, useState } from "react";

const useProductComparison = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadProducts = async () => {
        setLoading(true);
        const productList = await fetchProducts();
        setProducts(productList);
        setLoading(false);
      };
      loadProducts();
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
  
    return {
      products,
      setProducts, // ✅ Add this
      selectedProducts,
      modalVisible,
      loading,
      setLoading, // ✅ Add this
      setModalVisible,
      handleCompare,
      handleRemove,
    };
  };
  
  export default useProductComparison;
  