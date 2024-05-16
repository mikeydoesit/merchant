<script>
    import { goto } from '$app/navigation'
    import { show_login_form, show_register_form, email, password, show_registration_success } from '$lib/store.js'
    let show_email_login_error = false;
    let show_password_login_error =  false;
    export let pb;
    export let user;

    if(user?.verified) {
        goto('/home')
    }

    const go_to_register_form = () => {
        show_login_form.set(false)
        show_register_form.set(true)
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
    .email_error_text, .password_error_text {
        @apply text-red text-sm;
    }
    .form_item #login_btn {
        @apply bg-accent_bg py-4 rounded-md text-white font-bold text-lg mt-2 cursor-pointer;
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
    </div>
    <div class="form_item" on:click={login}>
        <input type="button" id="login_btn" value="Login"/>
    </div>
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