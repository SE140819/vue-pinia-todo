import { defineStore } from "pinia"

export const useTodoStore = defineStore("todo", {

    state: () => ({
        todos: []
    }),

    actions: {

        loadTodos() {

            const data = localStorage.getItem("todos")

            if (data) {
                this.todos = JSON.parse(data)
            }

        },

        addTodo(text) {

            this.todos.push({
                id: Date.now(),
                text,
                done: false
            })

            localStorage.setItem("todos", JSON.stringify(this.todos))

        },

        toggleTodo(id) {

            const todo = this.todos.find(t => t.id === id)

            if (todo) {
                todo.done = !todo.done
            }

            localStorage.setItem("todos", JSON.stringify(this.todos))

        }

    }

})