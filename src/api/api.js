let columns = [
  { id: 1, title: "Новые", color: "#03a9f4" },
  { id: 2, title: "Анализ", color: "yellow" },
  { id: 3, title: "Разработка", color: "red" },
  { id: 4, title: "Тестирование", color: "orange" },
  { id: 5, title: "Готовые", color: "green" },
]

let tasks = [
  { id: 1, text: "Нужно срочно доделать проект", title: "Срочная задача", columnId: 1, active: 1 },
  { id: 2, text: "Второй проект по-приколу сдлеать", title: "Вторая задача", columnId: 1, active: 1 },
  { id: 3, text: "Пример готовой задчи", title: "Готовая задачка", columnId: 5, active: 1 },
]

let users = [{ id: 1, login: "demo", password: "demo", token: "73y4287rt687r36", name: "DEMO" }]

const Api = {
  getTasks: (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(tasks)
      }, 100)
    })
  },
  getTaskById: (taskId) => {
    taskId = Number(taskId)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(tasks.find((task) => task.id === taskId))
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
  addTask: (title, text, columnId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = Math.max(...tasks.map((item) => item.id)) + 1
        tasks = [...tasks, { id: index, text: text, title: title, columnId: columnId, active: 1 }]
        resolve(true)
      }, 100)
    })
  },
  updateTask: (id, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        id = Number(id)
        const findIndex = tasks.findIndex((item) => item.id === id)
        if (findIndex !== undefined) {
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
}

export default Api
