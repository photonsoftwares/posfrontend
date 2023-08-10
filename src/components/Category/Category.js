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
  const [category, setCategory] = useState([]);
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

  console.log("CATEGORIES", get_all_catrgory_data);
  return (
    <div>
      {get_categories.map((el) => (
        <Button
          size="lg"
          variant="primary"
          onClick={() => {
            dispatch(handleAllDataByCategoryRequest({ el }));
          }}
        >
          {el}
        </Button>
      ))}
      {get_all_catrgory_data && get_all_catrgory_data.length > 0 ? (
        <DataByCategory get_all_catrgory_data={get_all_catrgory_data} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Category;
