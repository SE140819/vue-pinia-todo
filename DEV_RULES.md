# Dev Rules

## 1. Project Structure

```jsx
src
 ├ assets               // Static resources (images, fonts, global styles)
 ├ components           // Reusable UI components
 ├ composables          // Reusable business logic using Composition API
 ├ constants            // Global constant values
 ├ layouts              // Application layouts (Header, Sidebar, Footer structure)
 ├ plugins              // Third-party plugin setup
 ├ router               // Route definitions and navigation guards
 ├ stores               // Global state management using Pinia
 ├ types                // Global TypeScript types and interfaces
 ├ utils                // Utility helper functions
 ├ views                // Page-level components
 └ main.ts              // Application entry point
```

## 2. Component Rules

### A. Component Structure

Example:
```vue
<script setup lang="ts">
    1. import
    2. props
    3. emits
    4. state (ref/reactive)
    5. computed
    6. methods
    7. lifecycle
</script>

<template>
</template>

<style scoped>
</style>
```

### B. Component size

- Component should not exceed **200–300** lines of code.
- Large components should be split into smaller components.

## 3. Naming Convention

### A. Components (PascalCase)

Example:
- `UserCard.vue`
- `ProductItem.vue`
- `LoginForm.vue`

### B. Variables (camelCase)

Example:
- `userName`
- `productList`
- `isLoading`
- `totalPrice`

### C. Constants (UPPER_CASE)

Example:
- `API_URL`
- `DEFAULT_TIMEOUT`
- `MAX_RETRY`

### D. Composable (prefix use)

Example:
- `useAuth.ts`
- `useFetch.ts`
- `usePagination.ts`

## 4. Best Practices

### A. Avoid complex logic in template, use computed for derived values

Example:
❌ Avoid: `<div v-if="user.age > 18 && user.status === 'active'">`
✅ Prefer: `<div v-if="isActiveAdult">`

```ts
const isActiveAdult = computed(() => {
  return user.age > 18 && user.status === 'active'
})
```

### B. Use alias @ when importing from src

Example:
❌ Avoid: `import UserCard from '../../components/UserCard.vue'`
✅ Prefer: `import UserCard from '@/components/UserCard.vue'`

### C. Keep template clean and readable

Example:
❌ Avoid: `<button @click="() => deleteUser(user.id)">`
✅ Prefer: `<button @click="handleDelete(user.id)">`

```ts
function handleDelete(id: number) {
  deleteUser(id)
}
```

### D. Always use key in v-for

Example:
❌ Avoid:
```vue
<div v-for="user in users">
  {{ user.name }}
</div>
```
✅ Prefer:
```vue
<div v-for="user in users" :key="user.id">
  {{ user.name }}
</div>
```

### E. Avoid deeply nested templates

Example:
❌ Avoid: `div > div > div > div`
✅ Prefer:
```
UserPage
 ├ UserFilter
 ├ UserTable
 └ UserPagination
```

### F. Use v-if and v-show appropriately

- `v-if` → element is conditionally rendered.
- `v-show` → element always rendered but toggled with CSS.

### G. Use v-bind shorthand (`:`)
### H. Use v-on shorthand (`@`)
### I. Use scoped styles in components
### J. Do not modify props inside child components
### K. Use the correct communication pattern between components
- Parent → Child: props
- Child → Parent: emits
- Global state: Pinia
- Reusable logic: composables

### L. Error Handling Rules
Always use `try-catch` for async operations.

## 5. Git Rules

### A. Branch Naming: `<type>/<issue-id>-<short-description>`
Types: `feature`, `bugfix`, `hotfix`, `refactor`, `chore`.

### B. Commit Message Convention: `<type>(<scope>): <issue-id> <message>`
Types: `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`.
