import axios from 'axios'

const randomImagesService = {
  async getRandomCat() {
    return axios.get('https://aws.random.cat/meow')
  },
  async getRandomFox() {
    return await axios.get('https://randomfox.ca/floof/')
  },
  async getRandomDog() {
    const { url } = await axios.get('https://random.dog/woof.json')
    if (/.*mp4$/.test(url)) {
      return await randomImagesService.getRandomDog()
    }
    return { url }
  }
}

export default randomImagesService
