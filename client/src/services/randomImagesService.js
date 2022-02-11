import axios from "axios"

const randomImagesService = {
    async getRandomCat() {
        return axios.get('https://aws.random.cat/meow');
    },
    async getRandomFox() {
        return await axios.get('https://randomfox.ca/floof/');
    },
}

export default randomImagesService