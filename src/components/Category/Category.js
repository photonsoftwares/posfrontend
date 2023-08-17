import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handelGetCategoryRequest,
  handleAllDataByCategoryRequest,
  handleCategoriesRequest,
  handeleCategoriesHomeRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { Badge, Button, Stack } from "react-bootstrap";
import Product from "../Product";
import DataByCategory from "../DataByCategory/DataByCategory";

const Category = () => {
  // const [category, setCategory] = useState([]);
  // get_categories
  const { get_categories, get_all_catrgory_data, home_category } = useSelector(
    (e) => e.ComponentPropsManagement
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleCategoriesRequest());
  }, []);
  console.log("CATEGORY DD", home_category);

  useEffect(() => {
    // if (get_categories && get_categories.data) {
    //   setCategory(get_categories.data);
    // }
    get_categories.map((el) => console.log("PLPL", el));
  }, [get_categories]);
  useEffect(() => {
    dispatch(handeleCategoriesHomeRequest());
  }, []);

  // console.log("CATEGORIES", get_all_catrgory_data);
  return (
    <div>
      <div
        style={{
          display: "flex",
          widows: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {home_category.map((el) => (
          <Button
            size="sm"
            variant="success"
            className="mx-2"
            onClick={() => {
              dispatch(
                handleAllDataByCategoryRequest({ el: el.category_name })
              );
            }}
          >
            {el.category_name}
          </Button>
        ))}
      </div>

      <div
        style={
          {
            // display: "grid",
            // gridTemplateColumns: "repeat(2,1fr)",
            // placeItems: "center",
          }
        }
      >
        {get_all_catrgory_data && get_all_catrgory_data.length > 0 ? (
          <DataByCategory get_all_catrgory_data={get_all_catrgory_data} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Category;
