import httpService from './httpService'

const userEndPoint = 'stat/'

const statService = {
  getTasksStat: async () => {
    const { data } = await httpService.get(userEndPoint + 'tasks')
    return data
  }
}

export default statService
