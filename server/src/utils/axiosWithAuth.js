import Axios from "axios";

export const axiosWithAuth = () => {
  return Axios.create({
    // config object
    baseURL: "https://expatjournalbackend.herokuapp.com/",
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
};
