import React from "react";
import { Button, FormControl, ListGroup } from "react-bootstrap";
import { BASE_Url } from "../../URL";
import { InputLabel, OutlinedInput } from "@mui/material";

const DataByCategory = ({ get_all_catrgory_data }) => {
  console.log("DataByCategory", get_all_catrgory_data);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        // alignItems: "center",
        gap: "0 10px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {get_all_catrgory_data.map((item) => (
        <div
          class="card"
          style={{
            width: "10rem",
            margin: "5px",
            display: "flex",
          }}
        >
          <div style={{ height: "100px", width: "100%" }}>
            <img
              style={{ height: "100%", width: "100%" }}
              src={`${BASE_Url}/item/get-image/${item && item.productId}`}
              class="card-img-top"
              alt="..."
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">{item.itemName}</h5>
            {Number(item.price) === 0 ? (
              <>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel>Amount</InputLabel>
                  <OutlinedInput
                    type="number"
                    size="small"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        item.price = item.new_price;
                        setData([...data]);
                      }
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          // aria-label="toggle password visibility"
                          onClick={() => {
                            item.price = item.new_price;
                            setData([...data]);
                          }}
                          edge="end"
                        >
                          <BsFillCheckCircleFill
                            color={
                              item.new_price === "" || item.new_price === 0
                                ? "#979797"
                                : "green"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Amount"
                    className="w-50"
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val) {
                        setMyPrice({
                          productId: item.productId,
                          price: Number(val),
                        });
                        item.new_price = Number(val);
                        // setMyPrice(Number(val))
                      } else {
                        item.new_price = "";
                        setMyPrice({
                          productId: item.productId,
                          price: val,
                        });
                        // setMyPrice(val)
                      }
                      // setData([...data])
                    }}
                    value={
                      item.productId === myPrice.productId ? myPrice.price : ""
                    }
                  />
                </FormControl>
              </>
            ) : (
              <>
                <p style={{ fontWeight: "400" }}>₹ {item.price}</p>
              </>
            )}
            {/* <a href="#" class="btn btn-sm btn-warning">
                Add to Cart
              </a> */}
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                // justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  display:
                    item.price === 0 || item.price === 0 ? "none" : "block",
                }}
                onClick={() => {
                  const el = JSON.parse(localStorage.getItem("my-cart"));
                  if (el) {
                    console.log("EL", el);
                  } else {
                    // item["discount_menu_is_open"] = false;
                    // item["discount_value"] = "";
                    // item["amount_value"] = "";
                    // item["new_price"] =
                    //   Number(item.price) * Number(item.productQty);
                    // item["zero_price"] =
                    //   Number(item.price) * Number(item.productQty);
                    // localStorage.setItem("my-cart", JSON.stringify([item]));
                    // dispatch(handlecartCount(1));
                  }

                  //   setUpdatecart(!updatecart);
                  //   setSearchValue("");
                }}
              >
                <Button
                  size="sm"
                  // variant={`${item.price === 0 ? "secondary" : "warning"}`}
                  variant={`warning`}
                  style={{
                    width: "100%",
                    fontSize: "10px",
                    display: item.price === 0 ? "hidden" : "block",
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataByCategory;
