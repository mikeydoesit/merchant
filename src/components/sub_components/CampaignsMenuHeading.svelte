<script>
    import { show_more_component, show_campaigns_menu } from '$lib/store.js';
    export let page_title = '';
    export let back_btn;

    const back_to_prev = () => {
        show_campaigns_menu.set(false);
        show_more_component.set(true);
    }
</script>

<style lang="postcss">
    .campaigns_menu_heading {
        @apply flex justify-center py-5 relative items-center;
    }
    .campaigns_menu_heading h1 {
        @apply text-black text-2xl font-bold;
    }
    .back_btn {
        @apply h-9 w-9 absolute left-6 rounded-full flex justify-center items-center p-2.5;
    }
</style>

<section class="campaigns_menu_heading">
    {#if back_btn}
        <div class="back_btn" on:click={back_to_prev}>
            <img src="/images/back_chevron.png" alt='back' />
        </div>
    {/if}
    <h1>{page_title}</h1>
</section>