// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://sky-scrapper.p.rapidapi.com/api/v1",
  headers: {
    "X-RapidAPI-Key": "129355bfe2msh0a42ed4c79b6dc6p13f4cejsnd9ce0ab09bfe",
    "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
  },
});

export default instance;
