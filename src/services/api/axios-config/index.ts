import axios from "axios";
import { errorInteceptor, responseInterceptor } from "./interceptors";

const Api = axios.create({
    baseURL: "https://swapi.dev/api/",
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInteceptor(error),
);

export { Api };