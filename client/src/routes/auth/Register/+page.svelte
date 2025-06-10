<script lang="ts">
    let email: string = ''
    let password: string = ''
    let responseData: any = null
    let loading: boolean = false

    async function register (event: any) {
        event.preventDefault()

        loading = true
        responseData = ''

        const data = { email, password }

        try {
            const response = await fetch('http://localhost:8000/auth/Register', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
           
            responseData = await response.json()

            if (!response.ok) {
                responseData || `Register failed`
            } else {
                const token = responseData.token

                document.cookie = `token=${token}; path=/; max-age=8640000; secure; SameSite=Strict`
                responseData || `Register succesfull`
            }
        } catch (err) {
            responseData = `An error occured. Please try again.`
        } finally {
            loading = false
        }
    }
</script>

<div class="grid grid-cols-[45%_55%] h-screen">

    <div class="flex flex-col justify-between items-center py-[20%] bg-blue-200">
    
        <div class="">
            App Name
        </div>

        <div class="">
            Some very nice text should be here
        </div>

    </div>
    
    <div class="flex justify-center items-center pb-[25%]">
    
        <form class="flex flex-col h-[10%]" on:submit={register}>

            <label class="mb-1" for="username">Email</label>
            <input class="mb-5 px-2 py-1 rounded-xs outline outline-gray-400 focus:outline-gray-700 focus:bg-gray-100 duration-200" type="email" id="email" bind:value={email} required>
            
            <label class="mb-1" for="password">Password</label>
            <input class="mb-5 px-2 py-1 rounded-xs outline outline-gray-400 focus:outline-gray-700 focus:bg-gray-100 duration-200" type="password" id="password" bind:value={password} required>
            
            {#if responseData != null}
                <div class="mb-5">{responseData}</div>
            {/if}

            <button class="mb-5 px-2 py-2 text-white rounded-l bg-blue-200 hover:bg-blue-300 duration-200" type="submit">Login</button>

            <div class="">

                <a class="" href="/auth/Login">Login here</a>

            </div>

        </form>
    
    </div>

</div>