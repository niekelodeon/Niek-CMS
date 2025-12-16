<template>
  <div class="app-container">
    <h1>{{ title }}</h1>

    <input v-model="newItem" placeholder="Add something random" />
    <button @click="addItem">Add Item</button>

    <ul>
      <li v-for="(item, index) in shuffledItems" :key="index">
        {{ item }}
        <button @click="removeItem(index)">Remove</button>
      </li>
    </ul>

    <p>Total items: {{ itemCount }}</p>
  </div>
</template>

<script setup>
    import { ref, computed } from 'vue'

    const title = ref('Random Vue Playground')
    const newItem = ref('')
    const items = ref(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'])

    function shuffleArray(arr) {
    const result = [...arr]
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
    }

    const shuffledItems = computed(() => shuffleArray(items.value))
    const itemCount = computed(() => items.value.length)

    function addItem() {
    if (newItem.value.trim() !== '') {
        items.value.push(newItem.value.trim())
        newItem.value = ''
    }
    }

    function removeItem(index) {
    items.value.splice(index, 1)
    }
    </script>

    <style scoped>
    .app-container {
    font-family: Arial, sans-serif;
    max-width: 400px;
    margin: 2rem auto;
    padding: 1rem;
    border: 2px solid #ccc;
    border-radius: 12px;
    text-align: center;
    }

    input {
    padding: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 6px;
    border: 1px solid #aaa;
    }

    button {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    }

    button:hover {
    background-color: #45a049;
    }

    ul {
    list-style-type: none;
    padding: 0;
    }

    li {
    margin: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
</style>
