import axios, { AxiosRequestConfig } from "axios";
import { baseUrl, NextUrl } from "./constant";

const config: AxiosRequestConfig = { baseURL: baseUrl };
const NextConfig: AxiosRequestConfig = { baseURL: NextUrl };
export const axiosInstance = axios.create(config);
export const axiosInstanceNext = axios.create(NextConfig);
