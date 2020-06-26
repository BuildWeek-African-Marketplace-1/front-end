import React, { useState, useEffect } from "react";
import Header from "./Header";
import axiosWithAuth from "../utilites/axiosWithAuth";
import NavTab from "./NavigationTab";

const Dashboard = () => {
  const [pricingData, setPricingData] = useState([]);

  //GETTING LIST OF PRODUCT CATEGORIES
  const categories = [];
  const allCategories = [];
  if (pricingData) {
    for (let i = 0; i < pricingData.length; i++) {
      allCategories.push(Object.values(pricingData[i])[3]);
    }
  }

  const uniqueCategorySet = [...new Set(allCategories)];
  for (let k = 0; k < uniqueCategorySet.length; k++) {
    categories.push({ id: k, name: `${uniqueCategorySet[k]}` });
  }

  useEffect(() => {
    axiosWithAuth()
      .get("https://africanmarket.herokuapp.com/api/pricing")
      .then((response) => {
        console.log(response.data);
        setPricingData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <Header
          className="navigation-area"
          uniqueCategorySet={uniqueCategorySet}
        />
        <NavTab
          uniqueCategorySet={uniqueCategorySet}
          pricingData={pricingData}
        />
      </div>
      {/* <ProductList pricingData={pricingData} categories={categories} /> */}
    </>
  );
};

export default Dashboard;
