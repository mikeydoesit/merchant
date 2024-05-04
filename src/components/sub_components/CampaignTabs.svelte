<script>
    import { show_active_campaigns, show_draft_campaigns } from '$lib/store.js'

    const toggle_active_tab = () => {
        show_active_campaigns.set(true)
        show_draft_campaigns.set(false)
    }
    const toggle_drafts_tab = () => {
        show_draft_campaigns.set(true)
        show_active_campaigns.set(false)
    }
</script>

<style lang="postcss">
    .campaign_tabs {
        @apply mx-auto flex flex-row justify-center;
    }
    .active_tab, .draft_tab {
        @apply py-3 px-8 cursor-pointer;
    }
    .active_tab span, .draft_tab span {
        @apply font-semibold text-lg;
    }
</style>

<section class="campaign_tabs">
    {#if $show_active_campaigns}
        <div class="active_tab border-b-2 border-accent_bg" on:click={toggle_active_tab}>
            <span class="text-accent_bg">Active</span>
        </div>
    {:else}
        <div class="active_tab" on:click={toggle_active_tab}>
            <span>Active</span>
        </div>
    {/if}
    {#if $show_draft_campaigns}
        <div class="draft_tab border-b-2 border-accent_bg" on:click={toggle_drafts_tab}>
            <span class="text-accent_bg">Draft</span>
        </div>
    {:else}
        <div class="draft_tab" on:click={toggle_drafts_tab}>
            <span>Draft</span>
        </div>
    {/if}
</section>