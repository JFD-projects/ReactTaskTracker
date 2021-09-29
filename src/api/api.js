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
        console.log(tasks)
        resolve(true)
      }, 100)
    })
  },
}

export default Api
