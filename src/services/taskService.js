import httpService from "../../../graduation-project/src/services/httpService"
import localStorageService from "./localStorageService";
import {objectToArray} from "../utils/converter";

const taskEndPoint = "task/"

const getEndPoint = () => {
    const userId = localStorageService.getUserId()
    return taskEndPoint + userId + '/'
}

const taskService = {
    update: async (id, content) => {
        const { data } = await httpService.put(getEndPoint() + id, content)
        return data
    },
    get: async (id) => {
        const { data } = await httpService.get(getEndPoint() + id)
        return data
    },
    fetchAll: async () => {
        const { data } = await httpService.get(getEndPoint())
        return {...data, content: objectToArray(data.content)}
    },
    create: async (content) => {
        const { data } = await httpService.post(getEndPoint(), content)
        return data
    },
    delete: async (id) => {
        const { data } = await httpService.delete(getEndPoint() + id)
        return data
    }
}

export default taskService
