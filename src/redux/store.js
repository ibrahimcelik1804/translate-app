import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./selices/languageSlice";
import translateSlice from "./selices/translateSlice";

export default configureStore({
  reducer: { languageSlice,translateSlice },
});
