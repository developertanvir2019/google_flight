// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://sky-scrapper.p.rapidapi.com/api/v1",
  headers: {
    "X-RapidAPI-Key": "0cd161ff64msh82df3e7f167e259p1c18e1jsn441cbae62942",
    "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
  },
});

export default instance;
