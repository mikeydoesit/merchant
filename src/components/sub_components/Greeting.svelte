<script>
    export let merchant = ''
</script>

<style lang="postcss">
    .greeting {
        @apply px-4;
    }
    .greeting h3 {
        @apply text-2xl font-bold;
    }
</style>

<section class="greeting">
    <h3>Hello, {merchant}</h3>
</section>