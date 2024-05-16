<script>
    import { show_login_form, show_register_form, show_registration_success } from '$lib/store.js'
    

    export let unverified_email = '';
    export let pb;

    const back_to_login = () => {
        show_register_form.set(false)
        show_registration_success.set(false)
        show_login_form.set(true)
    }
    const resend_verification = async () => {
        const verify = await pb.collection('merchants').requestVerification(unverified_email);
    }
</script>

<style lang="postcss">
    .registration_success {
        @apply flex flex-col items-center px-8 py-16;
    }
    .img_wrapper {
        @apply h-20 w-20 mb-6;
    }
    .title {
        @apply text-2xl font-bold text-accent_bg;
    }
    .subtitle {
        @apply text-accent_bg;
    }
    .back_to_login_btn {
        @apply my-5 bg-accent_bg w-[-webkit-fill-available] mx-8 py-3 flex justify-center items-center cursor-pointer rounded-md;
    }
    .back_to_login_btn span {
        @apply text-main_bg font-semibold text-lg;
    }
    .resend_wrapper {
        @apply text-accent_bg;
    }
    .resend_wrapper strong {
        @apply cursor-pointer;
    }
</style>

<section class="registration_success">
    <div class="img_wrapper">
        <img src="/images/check_mail.png" alt="check mail" />
    </div>
    <h1 class="title">Check your email</h1>
    <p class="subtitle">We sent a verification link to</p>
    <p class="subtitle">{unverified_email}</p>

    <div class="back_to_login_btn" on:click={back_to_login}>
        <span>Login</span>
    </div>

    <div class="resend_wrapper">
        <p>Didn't receive the email? <strong on:click={resend_verification}>Click to resend</strong></p>
    </div>
</section>