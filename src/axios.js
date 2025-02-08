// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://sky-scrapper.p.rapidapi.com/api/v1",
  headers: {
    "X-RapidAPI-Key": "cebe1bfd79msh2c66d98179fe4b7p1b49cdjsn6077dcce1e02",
    "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
  },
});

export default instance;
