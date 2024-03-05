import axios from "axios";
import config from "../../config.json";
import { NavigateFunction } from "react-router";
import User from "../models/User";

const callHome = (navigate: NavigateFunction): Promise<string> => {
  return axios
    .get(`${config.localhost}/home`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    .then((response) => {
      const user: User = response.data;
      if (user) return user.username;
      else return "no email found";
    })
    .catch((error) => {
      console.log("Error in receiving mail: ", error);
      localStorage.removeItem("jwt");
      navigate("/");
      return error;
    });
};

export default callHome;
