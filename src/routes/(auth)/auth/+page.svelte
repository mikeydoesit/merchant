<script>
	import { onMount } from 'svelte'
	import { fade, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import '../../../styles/global.css'
    import { show_login_form, show_register_form, show_password_reset_form, show_registration_success, email } from '$lib/store.js'
    import GenericHeading from '../../../components/sub_components/GenericHeading.svelte';
	import AuthGreeting from '../../../components/sub_components/AuthGreeting.svelte';
	import LoginForm from '../../../components/sub_components/LoginForm.svelte';
	import RegisterForm from '../../../components/sub_components/RegisterForm.svelte';
    import { pocketbase, currentUser } from '../../../lib/pocketbase';
	import RegistrationSuccess from '../../../components/sub_components/RegistrationSuccess.svelte';
</script>

<style lang="postcss">
	.auth_page {
		@apply h-auto w-full flex flex-col relative mb-12;
	}
</style>

<main class="auth_page">
    {#if $show_login_form}
        <div class="login_form_wrapper" transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}>
            <GenericHeading 
                page_title={'Login'}
                back_btn={false}
            />
            <AuthGreeting 
                title={'Welcome back'}
                subtitle={'Glad to see you back, please login here.'}
            />
            <LoginForm 
                pb={pocketbase}
                user={$currentUser}
            />
        </div>
    {/if}
    {#if $show_register_form}
        <div class="register_form_wrapper" transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}>
            <GenericHeading 
                page_title={'Register'}
                back_btn={false}
            />
            <AuthGreeting
                title={'Welcome'}
                subtitle={'First, let\'s create your account.'}
            />
            <RegisterForm 
                pb={pocketbase}
            />
        </div>
    {/if}
    {#if $show_registration_success}
        <RegistrationSuccess
            unverified_email={sessionStorage.getItem("unverified_email")}
            pb={pocketbase}
        />
    {/if}
</main>