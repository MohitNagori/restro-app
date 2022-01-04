import axios from "axios";

export const getItem = () => {
  return axios.get("https://api.jsonbin.io/b/5fdce041dcfb842f3409ee12");
};
