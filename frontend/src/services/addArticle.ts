import axios from "axios";
import config from "../../config.json";
import SubjectAndChannel from "../models/ArticleData";

const addArticle = (
  subandchan: SubjectAndChannel,
  file?: File
): Promise<boolean> => {
  const formData = new FormData();
  formData.append("sub", JSON.stringify(subandchan));
  if (file)
    formData.append("pdf", file, file.name);
    return axios
    .post(`${config.localhost}/iqadot/article`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    .then((response) => {
      if (response.status === 201) return true;
      else return false;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

export default addArticle;
