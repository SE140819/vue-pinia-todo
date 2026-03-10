import { defineStore } from "pinia"

//
export const useTodoStore = defineStore("todos", {
    state: () => ({
        todos: []
    }),
    getters: {
        totalTodos: (state) => state.todos.length,

        completedTodos: (state) => state.todos.filter(todo => todo.done).length,
    },

    actions: {
        addTodo(text) {
            this.todos.push({
                id: Date.now(),
                text,
                done: false
            })
        },

        toggleTodo(id) {
            const todo = this.todos.find(t => t.id === id)
            if (todo) {
                todo.done = !todo.done
            }
        },

        deleteTodo(id) {
            this.todos = this.todos.filter(t => t.id !== id)
        }
    }

});


