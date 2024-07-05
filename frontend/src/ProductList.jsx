import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState({
    featured: "",
    company: [],
    name: "",
    sort: "",
    fields: "",
    numericFilters: "",
    page: 1,
    limit: 10,
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/products",
        { params: query }
      );
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [query]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuery((prevQuery) => ({
      ...prevQuery,
      [name]: type === "checkbox" ? checked.toString() : value,
    }));
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const value = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setQuery((prevQuery) => ({ ...prevQuery, [name]: value }));
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    setQuery((prevQuery) => ({ ...prevQuery, sort: value }));
  };

  const handlePageChange = (newPage) => {
    setQuery((prevQuery) => ({ ...prevQuery, page: newPage }));
  };

  return (
    <Container>
      <h1>Product List</h1>
      <FilterSection>
        <FilterGroup>
          <label>
            <Checkbox
              type="checkbox"
              name="featured"
              checked={query.featured === "true"}
              onChange={handleInputChange}
            />
            Featured
          </label>
        </FilterGroup>
        <FilterGroup>
          <label>Company:</label>
          <Select
            name="company"
            multiple
            value={query.company}
            onChange={handleMultiSelectChange}
          >
            <option value="ikea">Ikea</option>
            <option value="liddy">Liddy</option>
            <option value="caressa">Caressa</option>
            <option value="marcos">Marcos</option>
          </Select>
        </FilterGroup>
        <FilterGroup>
          <label>Name:</label>
          <Input
            type="text"
            name="name"
            value={query.name}
            onChange={handleInputChange}
            placeholder="Search by name"
          />
        </FilterGroup>
        <FilterGroup>
          <label>Sort by:</label>
          <Select name="sort" value={query.sort} onChange={handleSortChange}>
            <option value="">Default</option>
            <option value="price">Price (Low to High)</option>
            <option value="-price">Price (High to Low)</option>
            <option value="name">Name (A-Z)</option>
            <option value="-name">Name (Z-A)</option>
          </Select>
        </FilterGroup>
        <FilterGroup>
          <label>Price range:</label>
          <Input
            type="text"
            name="numericFilters"
            value={query.numericFilters}
            onChange={handleInputChange}
            placeholder="e.g. price>50,price<200"
          />
        </FilterGroup>
      </FilterSection>
      <ProductGrid>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id}>
              <h2>{product.name}</h2>
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>Featured: {product.featured ? "Yes" : "No"}</p>
              <p>Rating: {product.rating}</p>
              <p>Company: {product.company}</p>
            </ProductCard>
          ))
        ) : (
          <p>No products found</p>
        )}
      </ProductGrid>
      <Pagination>
        <Button
          onClick={() => handlePageChange(query.page - 1)}
          disabled={query.page === 1}
        >
          Previous
        </Button>
        <span>Page {query.page}</span>
        <Button onClick={() => handlePageChange(query.page + 1)}>Next</Button>
      </Pagination>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Checkbox = styled.input`
  margin-right: 5px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default ProductList;
