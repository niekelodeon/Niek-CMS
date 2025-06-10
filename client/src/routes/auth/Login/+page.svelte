<div class="">

    <!-- grid grid-cols-[45%_55%] h-screen -->

    <div class="blob">

        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25%" id="blobSvg">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color: rgb(81, 226, 252);"></stop>
                    <stop offset="100%" style="stop-color: rgb(81, 226, 252);"></stop>
                </linearGradient>
            </defs>
            <path fill="url(#gradient)">
                <animate class=""
                attributeName="d"
                dur="7500ms"
                repeatCount="indefinite"
                values="M426.5,301.5Q372,353,326,387.5Q280,422,216.5,420.5Q153,419,102,371Q51,323,58,253Q65,183,113.5,140.5Q162,98,222,82Q282,66,320.5,112.5Q359,159,420,204.5Q481,250,426.5,301.5Z;
                
                M394.5232,301.5Q372,353,325.59523,385.07138Q279.19046,417.14276,229.45263,394.18997Q179.7148,371.23718,120.6194,345.09474Q61.52401,318.9523,76.21463,255.42862Q90.90526,191.90493,115.11908,125.11875Q139.3329,58.33257,214.71415,39.90396Q290.09539,21.47534,356.92927,63.1181Q423.76314,104.76087,420.40477,177.38043Q417.04639,250,394.5232,301.5Z;

                M426.5,295Q358,340,323.5,405.5Q289,471,212,460.5Q135,450,78.5,391.5Q22,333,60,264Q98,195,130.5,147Q163,99,227.5,56Q292,13,353,62.5Q414,112,454.5,181Q495,250,426.5,295Z;

                M426.5,295Q358,340,323.5,405.5Q289,471,212,460.5Q135,450,78.5,391.5Q22,333,60,264Q98,195,130.5,147Q163,99,227.5,56Q292,13,353,62.5Q414,112,454.5,181Q495,250,426.5,295Z;

                M426.5,301.5Q372,353,326,387.5Q280,422,216.5,420.5Q153,419,102,371Q51,323,58,253Q65,183,113.5,140.5Q162,98,222,82Q282,66,320.5,112.5Q359,159,420,204.5Q481,250,426.5,301.5Z;
                "
                ></animate>
            </path>
        </svg>

    </div>

    <!-- <div class="flex flex-col justify-between items-center py-[20%] bg-blue-200">
    
        <div class="">
            App Name
        </div>

        <div class="">
            Some very nice text should be here
        </div>

    </div>
    
    <div class="flex justify-center items-center pb-[25%]">
    
        <form class="flex flex-col h-[10%]" on:submit={login}>

            <label class="mb-1" for="username">Email</label>
            <input class="mb-5 px-2 py-1 rounded-xs outline outline-gray-400 focus:outline-gray-700 focus:bg-gray-100 duration-200" type="email" id="email" bind:value={email} required>
            
            <label class="mb-1" for="password">Password</label>
            <input class="mb-5 px-2 py-1 rounded-xs outline outline-gray-400 focus:outline-gray-700 focus:bg-gray-100 duration-200" type="password" id="password" bind:value={password} required>
            
            {#if responseData != null}
                <div class="mb-5">{responseData.message}</div>
            {/if}

            <button class="mb-5 px-2 py-2 text-white rounded-l bg-blue-200 hover:bg-blue-300 duration-200" type="submit">Login</button>

            <div class="">

                <a class="" href="/auth/Register">Register here</a>

            </div>

        </form>
    
    </div> -->

</div>

<script lang="ts">
    let email: string = ''
    let password: string = ''
    let responseData: any = null

    async function login (event: any) {
        event.preventDefault()

        responseData = ''

        const data = { email, password }

        try {
            const response = await fetch('http://localhost:8000/auth/Login', {
                method: 'POST',
                
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
           
            responseData = await response.json()

            if (response.ok) {
                responseData.message || `Login succesfull`

                const token = responseData.token
                document.cookie = `token=${token}; path=/; max-age=8640000; secure; SameSite=Strict`

                window.location.href = '/edit/Dashboard'
            } else {
                responseData.message || `Login failed`
            }
        } catch (err) {
            responseData = `An error occured. Please try again.`
        } finally {
            responseData = null
        }
    }
</script>



