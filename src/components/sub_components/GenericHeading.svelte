<script>
    export let page_title = '';
    export let back_btn;
    export let back_to_prev;

</script>

<style lang="postcss">
    .generic_heading {
        @apply flex justify-center py-5 relative items-center;
    }
    .generic_heading h1 {
        @apply text-black text-2xl font-bold;
    }
    .back_btn {
        @apply h-9 w-9 absolute left-6 rounded-full flex justify-center items-center p-2.5;
    }
</style>

<section class="generic_heading">
    {#if back_btn}
        <div class="back_btn" on:click={back_to_prev}>
            <img src="/images/back_chevron.png" alt='back' />
        </div>
    {/if}
    <h1>{page_title}</h1>
</section>