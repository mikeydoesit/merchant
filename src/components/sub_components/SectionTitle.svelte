<script>
    export let title = ''
</script>

<style lang="postcss">
    .section_title {
        @apply px-4;
    }
    .section_title h4 {
        @apply text-xl font-bold mt-10;
    }
</style>

<section class="section_title">
    <h4>{title}</h4>
</section>