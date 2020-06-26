import React, { useEffect, useState, useContext } from "react";
import { axiosWithAuth } from "../utilites/axiosWithAuth";
import { Card, Button } from "semantic-ui-react";

import { ItemContext } from "../context/ItemContext";
import ProductCard from "./ProductCard";

const SellList = () => {
  const [state, setState] = useContext(ItemContext);

  const [productsList, setProductsList] = useState([]);
  const [update, setUpdate] = useState("");
  const [position, setPosition] = useState(0);
  const [edited, setEdited] = useState("");
  const [editing, setEditing] = useState(false);

  console.log(state);

  useEffect(() => {
    axiosWithAuth()
      .get("/products/")
      .then((res) => {
        setState(res.data.length);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(`Position was switched to: ${position}`);
  }, [position]);

  const id = localStorage.getItem("userID");

  useEffect(() => {
    getSomeProducts(position);
  }, [update, position, edited]);

  const getData = () => {
    axiosWithAuth()
      .get("/products/")
      .then((res) => {
        console.log("List of global products received: ", res.data);
        setProductsList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getLocalData = () => {
    axiosWithAuth()
      .get(`/products/${id}`)
      .then((res) => {
        console.log("List of local products received: ", res.data);
        setProductsList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getSomeProducts = (positions) => {
    if (positions === 0) {
      return getLocalData();
    } else {
      return getData();
    }
  };

  const toLocal = () => {
    setPosition(0);
  };
  const toGlobal = () => {
    setPosition(1);
    setEditing(false);
  };

  return (
    <div className="SellList">
      <div className="SellTop">
        <h2>Choose selling items</h2>
        <Button primary onClick={toLocal}>
          Local
        </Button>
        <Button secondary onClick={toGlobal}>
          Global
        </Button>
      </div>
      <Card.Group centered>
        {productsList.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            productName={product.productName}
            price={product.price}
            description={product.description}
            setUpdate={setUpdate}
            position={position}
            setEdited={setEdited}
          />
        ))}
      </Card.Group>
      <h2>Global items: {state}</h2>
    </div>
  );
};

export default SellList;
