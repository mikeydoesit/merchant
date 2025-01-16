<script>
    export let title = "";
    export let content;
    export let is_open = false;
    export let split_content;
    import { createEventDispatcher } from "svelte";
    import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

    const dispatch = createEventDispatcher()

    const handle_click = () => {
        dispatch("click")
    }
</script>

<style lang="postcss">
    .accordion_item {
        @apply border-l-[2px] mb-5 pl-3 py-0.5 text-text_primary flex flex-col justify-between;
    }
    .accordion_header h4 {
        @apply text-lg font-semibold leading-none;
    }
    .accordion_item p {
        @apply mt-2.5 leading-tight;
    }
</style>

{#if split_content}
    <div class={`accordion_item ${is_open ? 'border-accent_bg' : 'border-border_grey_four'}`} on:click={handle_click}>
        <div class="accordion_header">
            <h4>{title}</h4>
        </div>
        {#if is_open}
            {#each content as para}
                <p transition:slide>{para}</p>
            {/each}
        {/if}
    </div>
{:else}
    <div class={`accordion_item ${is_open ? 'border-accent_bg' : 'border-border_grey_four'}`} on:click={handle_click}>
        <div class="accordion_header">
            <h4>{title}</h4>
        </div>
        {#if is_open}
            <p transition:slide>{content}</p>
        {/if}
    </div>
{/if}