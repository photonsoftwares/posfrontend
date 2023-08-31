import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handelGetCategoryRequest,
  handleAllDataByCategoryRequest,
  handleCategoriesRequest,
  handeleCategoriesHomeRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { Badge, Button, Stack, Card, Image } from "react-bootstrap";
import Product from "../Product";
import DataByCategory from "../DataByCategory/DataByCategory";
import { AiOutlineMail, AiOutlineSearch } from "react-icons/ai";
import { FcSalesPerformance, FcSpeaker } from "react-icons/fc";
import axios from "axios";
import { Link } from "react-router-dom";

const Category = ({
  setSearchValue,
  data,
  cartData,
  setSearchedData,
  setData,
  setCartData,
  setUpdatecart,
  updatecart,
  searchValue,
  handleVoiceCommand,
}) => {


  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://3.111.70.84:8088/test/api/v1/category/get-list/8/80001")
      .then((res) => setCategory(res.data.data));
  }, []);

 
  // console.log("this is category data",category)
  // const [category, setCategory] = useState([]);
  // // get_categories
  // const { get_categories, get_all_catrgory_data, home_category } = useSelector(
  //   (e) => e.ComponentPropsManagement
  // );
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(handleCategoriesRequest());
  // }, []);
  // console.log("CATEGORY DD", get_categories);

  // useEffect(() => {
  //   if (get_categories && get_categories.data) {
  //     setCategory(get_categories.data);
  //   }
  //   get_categories.map((el) => console.log("PLPL", el));
  // }, [get_categories]);
  // useEffect(() => {
  //   dispatch(handeleCategoriesHomeRequest());
  // }, []);

  // console.log("CATEGORIES", get_all_catrgory_data);
  return (

    <div>
      <div>
        {/* <div
          style={{
            marginTop: "5px",
            display: "flex",
            widows: "100%",
            alignItems: "center",
            justifyContent: "space-around",
          }}>
          {home_category.map((el) => (
            <Button
              size="lg"
              variant="warning"
              className="mx-2"
              style={{ width: "60%" }}
              onClick={() => {
                dispatch(
                  handleAllDataByCategoryRequest({ el: el.category_name })
                );
              }}>
              {el.category_name}
            </Button>
          ))}
        </div> */}
        <div>
          {/* <FilterCategory /> */}
        </div>


        <div>
        <div className="d-flex justify-content-center gap-5 m-auto">
      
        {category.map((ele) => {
          return (
           
              <Link to={`/DataByCategory/${ele.category_name}`}>
                    <div className="m-2 d-flex j-center">
                    <Image src={ele.image_path} className="cardCategory" roundedCircle style={{width:"100px",height:'100px',margin:'3px',padding:"1px" ,boxShadow:'0 4px 6px rgba(0, 0, 0, 0.)'}} />
                    </div>
                    <div className="cardCategory d-flex justify-content-center">
                  
                    <h6 className="cardCategoryBtn">{ele.category_name}</h6>
                   
                    </div>
                 
                   
              </Link>
           
          );
        })}
       
        </div>
            </div>









        {/* <div>
          {category.map((ele) => {
            return (
              <div>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
                {ele.data.id}
              </div>
            );
          })}
        </div> */}
      </div>
      <div
        style={
          {
            // display: "grid",
            // gridTemplateColumns: "repeat(2,1fr)",
            // placeItems: "center",
          }
        }>
        {/* {get_all_catrgory_data && get_all_catrgory_data.length > 0 ? (
          <DataByCategory
            get_all_catrgory_data={get_all_catrgory_data}
            setSearchValue={setSearchValue}
            setData={setSearchedData}
            cartData={cartData}
            setCartData={setCartData}
            // data={searchedData}
            setUpdatecart={setUpdatecart}
            updatecart={updatecart}
          />
        ) : (
          ""
        )} */}
      </div>

     
    </div>
  );
};


export default Category;
