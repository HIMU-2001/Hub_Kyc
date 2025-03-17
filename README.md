```markdown
# Product Comparison App

A simple React application that allows users to view product details and compare multiple products side by side. The application fetches product data from a public API and provides a user-friendly interface for comparison.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- View a list of products with details such as title, description, price, brand, and category.
- Select products to compare them side by side.
- Responsive design for optimal viewing on various devices.
- User-friendly interface with navigation between product details and comparison pages.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Ant Design**: A UI design language and React-based implementation for building rich, interactive user interfaces.
- **React Router**: For handling routing and navigation within the application.
- **Axios**: For making HTTP requests to fetch product data from the API.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/product-comparison-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd product-comparison-app
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

1. On the **Product Details** page, you will see a list of products fetched from the API.
2. Click the **Compare** button next to any product to add it to the comparison list.
3. Navigate to the **Compare Products** page to view the selected products side by side.
4. You can remove products from the comparison list as needed.

## API

The application fetches product data from the following API:
- **API Endpoint**: [https://dummyjson.com/products](https://dummyjson.com/products)

The API provides a list of products with attributes such as:
- `id`
- `title`
- `description`
- `price`
- `brand`
- `category`

## Folder Structure

```
src/
|-- components/          # Reusable components (Navbar, Sidebar, ProductTable, etc.)
|-- pages/               # Page components (ProductDetails, ComparePage)
|-- App.js               # Main application component
|-- index.js             # Entry point of the application
|-- styles.css           # Global styles
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.