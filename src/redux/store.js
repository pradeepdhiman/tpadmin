import rootReducer from "./rootReducer";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore(rootReducer)

export default store