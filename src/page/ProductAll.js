import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../component/ProductCard";
import { useSearchParams } from "react-router-dom";

const ProductAll = () => {
  const [products, setProducts] = useState([]);
  let [query, setQuery] = useSearchParams();
  const getProductsAll = async () => {
    let queryValue = query.get("q") || "";
    let url = ` https://my-json-server.typicode.com/coddiinngg/october15/products?q=${queryValue}`;
    let response = await fetch(url);
    let data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    getProductsAll();
  }, [query]);

  return (
    <div>
      <Container>
        <Row>
          {products.map((items) => (
            <Col lg={3} md={6}>
              <ProductCard items={items} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProductAll;
