import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProducts] = useState(null);
  const getProductDetail = async () => {
    let url = `https://my-json-server.typicode.com/coddiinngg/october15/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    setProducts(data);
  };
  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col lg={6}>
            {" "}
            <img className="product-detail-img" src={product?.img} alt={product?.title}></img>
          </Col>
          <Col lg={6} className="product-detail-menu">
          <h1>{product?.title}</h1>
          <h2>₩{product?.price}</h2>
          <div>{product?.choice?"Conscious choice": ""}</div>
          <h2><Button variant="warning">S</Button> <Button variant="warning">M</Button> <Button variant="warning">L</Button> <Button variant="warning">XL</Button></h2>
          <h3><Button variant="dark">추가</Button></h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;
