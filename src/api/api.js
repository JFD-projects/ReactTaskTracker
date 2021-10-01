import Auth from "../services/auth"
let columns = [
  { id: 1, title: "Новые", color: "#03a9f4" },
  { id: 2, title: "Анализ", color: "yellow" },
  { id: 3, title: "Разработка", color: "red" },
  { id: 4, title: "Тестирование", color: "orange" },
  { id: 5, title: "Готовые", color: "green" },
]

let tasks = [
  {
    id: 1,
    text: "Нужно срочно доделать проект",
    title: "Срочная задача",
    columnId: 1,
    active: 1,
    responsible: "Иванов",
    deadLine: "2022-01-01",
    userId: 1,
  },
  {
    id: 2,
    text: "Второй проект по-приколу сдлеать",
    title: "Вторая задача",
    columnId: 1,
    active: 1,
    responsible: "Иванов",
    deadLine: "2022-01-01",
    userId: 1,
  },
  {
    id: 3,
    text: "Пример готовой задчи",
    title: "Готовая задачка",
    columnId: 5,
    active: 1,
    responsible: "Иванов",
    deadLine: "2022-01-01",
    userId: 1,
  },
  {
    id: 4,
    text: "Пример готовой задчи",
    title: "Готовая задачка",
    columnId: 5,
    active: 1,
    responsible: "Иванов",
    deadLine: "2022-01-01",
    userId: 2,
  },
]

let users = [{ id: 1, login: "demo", password: "demo", token: "73y4287rt687r36", name: "DEMO" },
{ id: 2, login: "demo2", password: "demo2", token: "furifjwiurjfi3223", name: "DEMO2" }]

const getUserIdByToken = (token) => {
  const user = users.find((user) => user.token === token)
  if (user) return user.id
  return false
}

const Api = {
  getTasks: () => {
    const token = new Auth().getToken()
    const userId = getUserIdByToken(token)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(tasks.filter((item) => item.userId === userId))
      }, 100)
    })
  },
  getTaskById: (taskId) => {
    const token = new Auth().getToken()
    const userId = getUserIdByToken(token)

    taskId = Number(taskId)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(tasks.find((task) => task.id === taskId && task.userId === userId))
      }, 100)
    })
  },
  getColumns: (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(columns)
      }, 100)
    })
  },
  addTask: (data) => {
    const token = new Auth().getToken()
    const userId = getUserIdByToken(token)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = Math.max(...tasks.map((item) => item.id)) + 1
        tasks = [...tasks, { text: "", title: "", columnId: 1, active: 1, ...data, id: index, userId: userId }]
        resolve(true)
      }, 100)
    })
  },
  updateTask: (id, data) => {
    const token = new Auth().getToken()
    const userId = getUserIdByToken(token)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        id = Number(id)
        const findIndex = tasks.findIndex((item) => item.id === id && item.userId === userId)
        if (findIndex !== -1) {
          tasks[findIndex] = { ...tasks[findIndex], ...data }
        }
        resolve(true)
      }, 100)
    })
  },
  login: (login, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find((user) => user.login === login && user.password === password)
        if (user) {
          resolve(user)
        } else {
          reject("Пользователь не найден")
        }
      }, 1000)
    })
  },
  register: ({ login, password, name }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find((user) => user.login === login)
        if (user) {
          reject("Пользователь с таким логином уже существует")
        } else {
          const newId = Math.max(...users.map((item) => item.id)) + 1
          const user = { id: newId, login, password, token: Date.now(), name }
          users.push(user)
          resolve(user)
        }
      }, 1000)
    })
  },
}

export default Api
