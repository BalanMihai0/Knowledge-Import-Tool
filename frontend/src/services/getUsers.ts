import axios from "axios";
import config from "../../config.json";
import User from "../models/User";

const getUsers = async (): Promise<User[]> => {
  return axios
    .get(`${config.localhost}/auth/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => {
      if (response.status !== 200) throw Error(response.statusText);
      const users: User[] = response.data;
      if (users) return users;
      else return [];
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};

export default getUsers;