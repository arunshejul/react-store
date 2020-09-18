import { combineReducers } from "redux";
import products from "./products";
import visibilityFilter from "./visibilityFilter";

export default combineReducers({
  products,
  visibilityFilter,
});
