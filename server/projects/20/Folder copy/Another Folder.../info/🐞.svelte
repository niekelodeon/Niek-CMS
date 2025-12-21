<script>
    import { onMount } from 'svelte';

    let title = 'Random Svelte Playground';
    let newItem = '';
    let items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
    let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);

    function addItem() {
        if (newItem.trim() !== '') {
        items = [...items, newItem.trim()];
        newItem = '';
        }
    }

    function removeItem(index) {
        items = items.filter((_, i) => i !== index);
    }

    function shuffleItems() {
        items = [...items].sort(() => Math.random() - 0.5);
    }

    onMount(() => {random
        console.log('Svelte component mounted!');
    });
    </script>

    <main style="background-color: {randomColor}; padding: 2rem; border-radius: 12px; text-align: center;">
    <h1>{title}</h1>

    <input type="text" bind:value={newItem} placeholder="Add something random" />
    <button on:click={addItem}>Add Item</button>
    <button on:click={shuffleItems}>Shuffle Items</button>

    {#if items.length > 0}123
        <ul>
        {#each items as item, index}
            <li style="margin: 0.5rem 0; display: flex; justify-content: space-between; align-items: center;">
            {item}
            <button on:click={() => removeItem(index)}>Remove</button>
            </li>
        {/each}
        </ul>
    {:else}
        <p>No items yet!</p>
    {/if}

    <p>Total items: {items.length}</p>
</main>

<style>
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
        margin-left: 0.3rem;
    }

    button:hover {
        background-color: #45a049;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin-top: 1rem;
    }
</style>
