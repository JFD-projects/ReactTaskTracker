import httpService from "../../../graduation-project/src/services/httpService"
import {objectToArray} from "../utils/converter";

const columnEndPoint = "column/"

const columnService = {
    update: async (id, content) => {
        const {data} = await httpService.put(columnEndPoint + id, content)
        return data
    },
    get: async (id) => {
        const {data} = await httpService.get(columnEndPoint + id)
        return data
    },
    fetchAll: async () => {
        const {data} = await httpService.get(columnEndPoint)
        return {...data, content: objectToArray(data.content).filter(item => item !== null)}
    },
    create: async (content) => {
        const {data} = await httpService.post(columnEndPoint, content)
        return data
    },
    delete: async (id) => {
        const {data} = await httpService.delete(columnEndPoint + id)
        return data
    }
}

export default columnService
