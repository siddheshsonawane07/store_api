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
      const apiQuery = { ...query };

      if (apiQuery.company && apiQuery.company[0] === "none") {
        delete apiQuery.company;
      }

      const response = await axios.get(
        "http://localhost:3000/api/v1/products",
        { params: apiQuery }
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
      <Title>Product List</Title>
      <Layout>
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
            <FilterLabel>Company:</FilterLabel>
            <Select
              name="company"
              multiple
              value={query.company}
              onChange={handleMultiSelectChange}
            >
              <option value="none">None</option>
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
        </FilterSection>{" "}
        <ProductGrid>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id}>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                <ProductInfo>
                  Featured: {product.featured ? "Yes" : "No"}
                </ProductInfo>
                <ProductInfo>Rating: {product.rating}</ProductInfo>
                <ProductInfo>Company: {product.company}</ProductInfo>
              </ProductCard>
            ))
          ) : (
            <p>No products found</p>
          )}
        </ProductGrid>
      </Layout>
      <Pagination>
        <Button
          onClick={() => handlePageChange(query.page - 1)}
          disabled={query.page === 1}
        >
          Previous
        </Button>
        <PageInfo>Page {query.page}</PageInfo>
        <Button onClick={() => handlePageChange(query.page + 1)}>Next</Button>
      </Pagination>
    </Container>
  );
};

const colors = {
  primary: "#3498db",
  secondary: "#2ecc71",
  accent: "#e74c3c",
  background: "#ecf0f1",
  text: "#2c3e50",
  lightText: "#7f8c8d",
  white: "#ffffff",
  border: "#bdc3c7",
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: "Roboto", sans-serif;
  color: ${colors.text};
  background-color: ${colors.background};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: ${colors.primary};
`;

const Layout = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterSection = styled.div`
  flex: 0 0 250px;
  background-color: ${colors.white};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FilterGroup = styled.div`
  margin-bottom: 20px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: 14px;
  appearance: none;
  background-color: ${colors.white};
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const ProductGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 25px;
`;

const ProductCard = styled.div`
  border: 1px solid ${colors.border};
  border-radius: 8px;
  padding: 20px;
  background-color: ${colors.white};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 15px;
`;

const ProductName = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: ${colors.text};
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.accent};
  margin-bottom: 10px;
`;

const ProductInfo = styled.p`
  font-size: 0.9rem;
  color: ${colors.lightText};
  margin-bottom: 5px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 15px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: ${colors.border};
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 14px;
  color: ${colors.lightText};
`;
export default ProductList;
