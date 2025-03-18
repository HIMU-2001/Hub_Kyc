import { Spin, Typography } from "antd";

const { Title } = Typography;

const LoadingSpinner = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <Spin size="large" />
    <Title level={4} style={{ marginTop: "10px", color: "#555" }}>
      Loading products...
    </Title>
  </div>
);

export default LoadingSpinner;
