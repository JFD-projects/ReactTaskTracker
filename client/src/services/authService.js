import localStorageService, {setTokens} from "./localStorageService";
import axios from "axios";
import configFile from "../config.json";

const httpAuth = axios.create({
    baseURL: configFile.apiEndPoint
})

const refreshToken = async () => {
    const url = `auth/refreshToken`
    const refreshToken = localStorageService.getRefreshToken()
    try {
        const {data} = await httpAuth.post(url, {
            refreshToken: refreshToken
        })
        setTokens(data)
        return data
    } catch (e) {
        return Promise.reject(e)
    }
}

const checkToken = async () => {
    try {
        const expired = localStorageService.getExpireDate();
        if (Date.now() > expired) {
            await refreshToken()
        }
    } catch (e) {
        return Promise.reject(e)
    }
}
const authService = {refreshToken, checkToken}
export default authService