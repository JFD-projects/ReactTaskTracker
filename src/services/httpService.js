import axios from "axios"
import { toast } from "react-toastify"
import configFile from "../config.json"
import localStorageService from "./localStorageService";

const http = axios.create({
    baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(
    (config) => {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url)
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json"
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.url += '?auth=' + accessToken
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: res.data }
        }
        return res
    },
    (error) => {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500
        if (!expectedErrors) {
            console.log("Unexpected error")
            toast.info("Something was wrong. Try it later")
        }
        return Promise.reject(error)
    }
)

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
}
export default httpService
