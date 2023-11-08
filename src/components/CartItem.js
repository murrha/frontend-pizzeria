import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shop-context";
// import foodData from "../products.json";

const CartItem = (props) => {
  let { index } = props;
  const { foodData } = useContext(ShopContext);

  let foodDataList;
  if (foodData == null || foodData == undefined) {
    foodDataList = JSON.parse(window.localStorage.getItem("MENU_DATA"));
  } else {
    foodDataList = foodData;
  }

  // console.log(">>>foodData<<<: ", foodData); viewed as undefined
  console.log(">>>index in cartItem<<<: ", index);

  if(foodDataList[index - 1].id == index){
    console.log(">>>foodDataList: " + foodDataList[index - 1].name); 
  }
  

  // console.log(foodData[10].name, foodData[10].price);
  const { addToCart, removeFromCart, getCartItemCount, updateCartItemCount } =
    useContext(ShopContext);

  // let [foodData, setFoodData] = useState();
  // const { cartItems } = useContext(ShopContext);
  // console.log("cartItems at app.js: ", cartItems);

  // useEffect(() => {
  //   const getAllProducts = async () => {
  //     // let resp =  await fetch('./json/products.json');
  //     // let data = await resp.json();
  //     let data;
  //     do {
  //       let resp = await axios.get("http://localhost:3002/menu");
  //       data = await resp.data;
  //     } while (data == null);
  //     console.log("data: ", data);
  //     setFoodData(data);
  //   };
  //   getAllProducts();
  // }, []);

  return (
    <>
      <div>
        <div className="card">
              <img
                className="img-fluid rounded-start p-2"
                src={`${foodDataList[index - 1].image}`}
                alt={`${foodDataList[index - 1].name}`}
              />

              <div className="card-body">
                <h5 className="card-title">{foodDataList[index - 1].name}</h5>
                <h5>{foodDataList[index - 1].price}</h5>
              </div>
        </div>
      </div>
      <div className="input-group mb-3 mt-3">
        {getCartItemCount(index) <= 0 ? (
          <button className="btn btn-outline-secondary disabled px-2">-</button>
        ) : (
          <button
            className="btn btn-secondary px-2"
            onClick={() => removeFromCart(index)}
          >
            -
          </button>
        )}
        <input
          className="text-center col-sm-3"
          value={getCartItemCount(index)}
          onChange={(e) => {
            // console.log("e.target.value: ", e.target.value);
            updateCartItemCount(Number(e.target.value), index);
          }}
        />
        <button
          className="btn btn-secondary px-2"
          onClick={() => addToCart(index)}
        >
          +
        </button>
      </div>
    </>
  );
};

export default CartItem;
