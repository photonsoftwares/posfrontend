import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAllDataByCategoryRequest,
  handleCategoriesRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { Badge, Button, Stack } from "react-bootstrap";
import Product from "../Product";
import DataByCategory from "../DataByCategory/DataByCategory";

const Category = () => {
  // const [category, setCategory] = useState([]);
  // get_categories
  const { get_categories, get_all_catrgory_data } = useSelector(
    (e) => e.ComponentPropsManagement
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleCategoriesRequest());
  }, []);

  useEffect(() => {
    // if (get_categories && get_categories.data) {
    //   setCategory(get_categories.data);
    // }
    get_categories.map((el) => console.log("PLPL", el));
  }, [get_categories]);

  // console.log("CATEGORIES", get_all_catrgory_data);
  return (
    <div>
      <div
        style={{
          // position: "absolute",
          left: 0,
          // zIndex: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          // gap: 20,
          flexDirection: "row",
          // backgroundColor: "yellow",
        }}
      >
        {/* <p style={{ fontWeight: "bold", fontSize: "20px" }}>Categories</p> */}
        {get_categories.map((el) => (
          <Button
            size="sm"
            className="mx-2"
            variant="success"
            onClick={() => {
              dispatch(handleAllDataByCategoryRequest({ el }));
            }}
          >
            {el}
          </Button>
        ))}
      </div>

      <h5 className="mt-5">Recommanded Items</h5>
      {get_all_catrgory_data && get_all_catrgory_data.length > 0 ? (
        <DataByCategory get_all_catrgory_data={get_all_catrgory_data} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Category;
