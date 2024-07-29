<script>
    import { show_login_form, show_register_form, show_registration_success, show_password_reset_form, email } from '$lib/store.js'
    let show_email_login_error = false;
    let submitting_password_reset = false;
    export let pb;

    const set_email = (e) => {
        email.set(e.target.value)
        validate_email(e)
    }

    const validate_email = (e) => {
        let email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email_pattern.test(e.target.value)) {
            show_email_login_error = true
        } else {
            show_email_login_error = false
        }
    }
    const reset_password = async () => {

        submitting_password_reset = true

        try {
            await pb.collection('merchants').requestPasswordReset($email);
        } catch (error) {
            console.log(error)
        } finally {
            submitting_password_reset = false;
            setTimeout(() => {
                show_password_reset_form.set(false)
                show_register_form.set(false)
                show_registration_success.set(false)
                show_login_form.set(true)
            }, 3000)
        }

    }
</script>

<style lang="postcss">
    .password_reset_form {
        @apply px-4 mt-8;
    }
    .form_item {
        @apply flex flex-col mb-8;
    }
    .form_item label {
        @apply pl-1 mb-1.5 text-sm font-semibold;
    }
    .form_item #email {
        @apply border-2 border-border_grey py-3 px-4 rounded-md focus:outline-accent_bg;
    }
    .email_reset_error {
        @apply mt-2 border border-red bg-red/10 rounded-md px-4 py-2.5;
    }
    .email_reset_error_text {
        @apply text-red text-sm;
    }
    .form_item.submit_btn {
        @apply bg-accent_bg py-4 mt-2 rounded-md text-white font-bold text-lg cursor-pointer flex justify-center items-center;
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

<form class="password_reset_form">
    <div class="form_item">
        <label for="email">Email</label>
        <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your email address" 
            on:input={set_email}
            on:blur={validate_email}
        />
        {#if show_email_login_error}
            <div class="email_reset_error">
                <span class="email_reset_error_text">Looks like you haven't entered a valid email.</span>
            </div>
        {/if}
    </div>
    {#if submitting_password_reset}
            <div class="form_item submit_btn">
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
            </div>
    {:else}
        <div class="form_item submit_btn" on:click={reset_password}>
            <span>Send password reset email</span>
        </div>
    {/if}
</form>