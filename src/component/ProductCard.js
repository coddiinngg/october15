import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ items }) => {
    const navigate =useNavigate()
    const goToDetail = ()=>{
        navigate(`/products/${items.id}`)
    }
  return (
    <div onClick={goToDetail} className="product-card">
      <img src={items?.img} alt={items?.title}></img>
      <div>{items.choice ? "Conscious choice" :  "\u00A0"}</div>
      <div>{items.title}</div>
      <div>₩{items.price}</div>
      <div>{items.new ? "new" : "\u00A0"}</div>
    </div>
  );
};

export default ProductCard;
