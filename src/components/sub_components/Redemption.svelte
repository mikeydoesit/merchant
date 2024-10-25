<script>
    import { pocketbase, currentUser } from "$lib/pocketbase";
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
    import { onMount } from "svelte";

    let new_code = "";
    let regenerating = false;

    const EXPIRATION_TIME = 2 * 60 * 1000;
    
    const generate_new_otp = async () => {

        regenerating = true

        const regen_body = {
            merchant: $currentUser.id
        }

        // Generate new otp code
        try {
            const response = await fetch(`${PUBLIC_POCKETBASE_URL}/api/regen`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(regen_body)
            });

            const data = response;

            // Generate new otp code
            try {
                const record = await pocketbase.collection('merchants').getOne($currentUser.id);

                new_code = record.current_otp
            } catch (error) {
                console.error(error)
            }

        } catch (error) {
            console.log(error)
        } finally {
            regenerating = false
        }
    }

    // Function to check if OTP is still valid
    const isOTPValid = (last_updated) => {
        const now = Date.now();
        return (now - last_updated) < EXPIRATION_TIME;
    }

    const init_regen = async () => {
        try {
            const record = await pocketbase.collection('merchants').getOne($currentUser.id);

            new_code = record.current_otp


            if(new_code.current_otp == "" || !isOTPValid(record.otp_last_updated)) {
                generate_new_otp()
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    init_regen();
</script>

<style lang="postcss">
    .redemption {
        @apply flex justify-center items-center mt-6 flex-col;
    }
    .redemption .new_code {
        @apply font-bold text-black text-4xl tracking-widest;
    }
    .redemption_btn {
        @apply mt-6 w-full px-8;
    }
    .regenerate {
        @apply rounded-lg text-main_bg w-full flex justify-center items-center py-3 cursor-pointer font-semibold bg-accent_bg text-xl;
    }
    /* Button loader */

    .loader {
        position: relative;
        width: 30px;
        height: 30px;
        border-radius: 10px;
    }

    .loader div {
        width: 8%;
        height: 24%;
        background: rgb(255, 255, 255);
        position: absolute;
        left: 50%;
        top: 30%;
        opacity: 0;
        border-radius: 50px;
        box-shadow: 0 0 3px rgba(0,0,0,0.2);
        animation: fade458 1s linear infinite;
    }

    @keyframes fade458 {
    from {
        opacity: 1;
    }

    to {
        opacity: 0.25;
    }
    }

    .loader .bar1 {
        transform: rotate(0deg) translate(0, -130%);
        animation-delay: 0s;
    }

    .loader .bar2 {
        transform: rotate(30deg) translate(0, -130%);
        animation-delay: -1.1s;
    }

    .loader .bar3 {
        transform: rotate(60deg) translate(0, -130%);
        animation-delay: -1s;
    }

    .loader .bar4 {
        transform: rotate(90deg) translate(0, -130%);
        animation-delay: -0.9s;
    }

    .loader .bar5 {
        transform: rotate(120deg) translate(0, -130%);
        animation-delay: -0.8s;
    }

    .loader .bar6 {
        transform: rotate(150deg) translate(0, -130%);
        animation-delay: -0.7s;
    }

    .loader .bar7 {
        transform: rotate(180deg) translate(0, -130%);
        animation-delay: -0.6s;
    }

    .loader .bar8 {
        transform: rotate(210deg) translate(0, -130%);
        animation-delay: -0.5s;
    }

    .loader .bar9 {
        transform: rotate(240deg) translate(0, -130%);
        animation-delay: -0.4s;
    }

    .loader .bar10 {
        transform: rotate(270deg) translate(0, -130%);
        animation-delay: -0.3s;
    }

    .loader .bar11 {
        transform: rotate(300deg) translate(0, -130%);
        animation-delay: -0.2s;
    }

    .loader .bar12 {
        transform: rotate(330deg) translate(0, -130%);
        animation-delay: -0.1s;
    }
</style>

<section class="redemption">
    {#if regenerating}
        <h3 class="new_code">######</h3>
    {:else}
        <h3 class="new_code">{new_code}</h3>
    {/if}


    <div class="redemption_btn">
        <div class="regenerate" on:click={generate_new_otp}>
            {#if regenerating}
                <div class="loader">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                    <div class="bar4"></div>
                    <div class="bar5"></div>
                    <div class="bar6"></div>
                    <div class="bar7"></div>
                    <div class="bar8"></div>
                    <div class="bar9"></div>
                    <div class="bar10"></div>
                    <div class="bar11"></div>
                    <div class="bar12"></div>
                </div>
            {:else}
                <span>Regenerate</span>
            {/if}
        </div>
    </div>


</section>