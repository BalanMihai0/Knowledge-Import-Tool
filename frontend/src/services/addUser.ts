import axios from "axios";
import config from "../../config.json";

const addUser = (username: string, password: string) => {
  return axios
    .post(`${config.localhost}/auth/register`, {
      username: username,
      password: password,
    })
    .then((response) => {
      if (response.status === 202) return true;
      else return false;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export default addUser;