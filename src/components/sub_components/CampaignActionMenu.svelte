<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { show_campaign_action } from '$lib/store.js'

    const hide_element = () => {
        show_campaign_action.set(false)
    }
</script>

<style lang="postcss">
    .campaign_action_menu {
        @apply h-screen bg-black bg-opacity-30 absolute top-0 left-0 bottom-0 right-0;
    }
    .campaign_action_menu_inner_wrapper {
        @apply h-full w-full relative bg-transparent flex flex-col justify-end;
    }
    .campaign_action_menu_inner {
        @apply bg-main_bg h-auto w-full rounded-t-3xl z-20 px-8 py-8;
    }
    .campaign_action_menu_header {
        @apply flex flex-row justify-between items-center mb-8;
    }
    .campaign_action_menu_header h3 {
        @apply text-2xl font-semibold;
    }
    .campaign_action_menu_header .img_wrapper {
        @apply h-5 w-5 cursor-pointer;
    }
    .campaign_action_menu_content .link {
        @apply mb-6 font-semibold text-lg cursor-pointer;
    }
</style>

<section class="campaign_action_menu">
    <div class="campaign_action_menu_inner_wrapper" on:click|self={hide_element}>
        <div class="campaign_action_menu_inner" transition:slide={{ delay: 150, duration: 200, easing: quintOut, axis: 'y' }}>
            <div class="campaign_action_menu_header">
                <h3>More actions</h3>
                <div class="img_wrapper" on:click={hide_element}>
                    <img src="/images/close.png" alt="icon" />
                </div>
            </div>
            <div class="campaign_action_menu_content">
                <div class="edit_btn link">
                    <span>Edit</span>
                </div>
                <div class="preview_btn link">
                    <span>Preview</span>
                </div>
                <div class="delete_btn link">
                    <span>Delete</span>
                </div>
            </div>
        </div>
    </div>
</section>