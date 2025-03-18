import axios from "axios";

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get("https://dummyjson.com/products");
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
