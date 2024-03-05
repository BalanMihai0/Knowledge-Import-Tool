import axios from "axios";
import config from "../../config.json";
import loginDTO from "../models/loginDTO";

const loginUser = (userDetails: loginDTO): Promise<boolean> => {
  return axios
    .post(`${config.localhost}/auth/login`, userDetails)
    .then((response) => {
      if (response.status === 202) {
        console.log("logged in");
        const token = response.data;
        localStorage.setItem("jwt", token);
        return true;
      } else return false;
    })
    .catch((error) => {
      console.log(
        "There has been an error in sending the login details: ",
        error
      );
      return false;
    });
};

export default loginUser;
