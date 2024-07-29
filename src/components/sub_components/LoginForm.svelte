<script>
    import { goto } from '$app/navigation'
    import { show_login_form, show_register_form, email, password, show_registration_success, show_password_reset_form } from '$lib/store.js'
    let show_email_login_error = false;
    let show_password_login_error =  false;
    export let pb;
    export let user;

    let submitting_login = false;

    if(user?.verified) {
        goto('/home')
    }

    const go_to_register_form = () => {
        show_login_form.set(false)
        show_register_form.set(true)
    }
    const go_to_password_reset_form = () => {
        show_login_form.set(false)
        show_register_form.set(false)
        show_registration_success.set(false)
        show_password_reset_form.set(true)
    }
    const set_email = (e) => {
        email.set(e.target.value)
        validate_email(e)
    }
    const set_password = (e) => {
        password.set(e.target.value)
    }

    // Validation
    const validate_email = (e) => {
        let email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email_pattern.test(e.target.value)) {
            show_email_login_error = true
        } else {
            show_email_login_error = false
        }
    }

    const login = async () => {
        try {
            submitting_login = true
            const authData = await pb.collection('merchants').authWithPassword(
                $email,
                $password,
            );
        
            if(user.verified) {
                goto('/home')
            } else {
                show_login_form.set(false)
                show_registration_success.set(true)
            }
        } catch (error) {
            console.log(error)
        } finally {
            submitting_login = false
        }

    }
</script>

<style lang="postcss">
    .login_form {
        @apply px-4 mt-8;
    }
    .form_item {
        @apply flex flex-col mb-8;
    }
    .form_item label {
        @apply pl-1 mb-1.5 text-sm font-semibold;
    }
    .form_item #email, .form_item #password {
        @apply border-2 border-border_grey py-3 px-4 rounded-md focus:outline-accent_bg;
    }
    .email_login_error, .password_login_error {
        @apply mt-2 border border-red bg-red/10 rounded-md px-4 py-2.5;
    }
    .email_login_error_text, .password_login_error_text {
        @apply text-red text-sm;
    }
    .password_reset_wrapper {
        @apply w-full flex flex-row justify-end mt-1.5 pr-1;
    }
    .password_reset_wrapper span {
        @apply text-sm font-semibold cursor-pointer text-red/70;
    }
    .form_item.submit_btn {
        @apply bg-accent_bg py-4 rounded-md text-white font-bold text-lg cursor-pointer flex justify-center items-center;
    }
    .form_item.submit_btn {
        @apply mt-2;
    }
    .register_redirect {
        @apply flex items-center justify-center;
    }
    .register_redirect .register_redirect_text {
        @apply text-sm;
    }
    .register_redirect .register_redirect_link {
        @apply text-accent_bg font-medium cursor-pointer;
    }
    .login_divider {
        @apply flex flex-row justify-center items-center mt-6 px-8;
    }
    .login_divider span {
        @apply text-nowrap mx-3 text-border_grey font-semibold text-sm;
    }
    .login_divider hr {
        @apply w-[-webkit-fill-available] border border-border_grey;
    }
    .social_login {
        @apply flex flex-row justify-center items-center mt-6 gap-8;
    }
    .social_login_link {
        @apply h-14 w-14 p-2.5 rounded-lg cursor-pointer;
    }
    .social_login_link img {
        @apply h-full w-full;
    }
    .facebook, .twitter {
        @apply bg-accent_bg/20;
    }
    .google {
        @apply bg-highlight_bg/20;
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

<form class="login_form">
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
            <div class="email_login_error">
                <span class="email_login_error_text">Looks like you haven't entered a valid email.</span>
            </div>
        {/if}
    </div>
    <div class="form_item">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" on:input={set_password}/>
        {#if show_password_login_error}
            <div class="password_login_error">
                <span class="password_login_error_text">This password is incorrect</span>
            </div>
        {/if}
        <div class="password_reset_wrapper" on:click={go_to_password_reset_form}>
            <span>Forgot password</span>
        </div>
    </div>


    {#if submitting_login}
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
        <div class="form_item submit_btn" on:click={login}>
            <span>Login</span>
        </div>
    {/if}
    <div class="register_redirect">
        <p class="register_redirect_count">Don't have an account? <span class="register_redirect_link" on:click={go_to_register_form}>Register</span></p>
    </div>
    <div class="login_divider">
        <hr/><span>Or Login With</span><hr/>
    </div>
    <div class="social_login">
        <div class="social_login_link facebook">
            <img src="/images/facebook.png" />
        </div>
        <div class="social_login_link google">
            <img src="/images/google.png" />
        </div>
        <div class="social_login_link twitter">
            <img src="/images/twitter.png" />
        </div>
    </div>
</form>