<script>
    export let title;
    export let subtitle;
    import { show_password_reset_form } from '$lib/store.js'
</script>

<style lang="postcss">
    .auth_greeting {
        @apply px-4 mt-8;
    }
    .auth_greeting h3 {
        @apply text-xl font-bold mb-1.5;
    }
    .auth_greeting p {
        @apply text-border_grey font-semibold;
    }
</style>

<section class="auth_greeting">
    <h3>{title} {#if $show_password_reset_form } {:else}&#128075;{/if}</h3>
    <p>{subtitle}</p>
</section>