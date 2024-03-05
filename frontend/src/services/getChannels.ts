import axios from "axios";
import config from "../../config.json";

const getChannels = async (): Promise<{ [key: string]: string }> => {
  return axios
    .get(`${config.localhost}/iqadot/channels`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return undefined;
    });
};

export default getChannels;
