import axios from "axios";
import config from "../../config.json";

const getAllArticles = async (): Promise<ArticleHistory[]> => {
  return axios
    .get(`${config.localhost}/article`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => {
      return response.data as ArticleHistory[];
    })
    .catch((error) => {
      console.error(error.message);
      return [];
    });
};

export default getAllArticles;
