import axios from "./index";
import { API_SERVER } from "config/constant";

export const GetCourseList = (data) => {
  return axios.get(`${API_SERVER}Course/List`);
};
