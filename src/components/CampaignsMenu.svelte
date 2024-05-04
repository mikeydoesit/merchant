<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import CampaignsMenuHeading from './sub_components/CampaignsMenuHeading.svelte';
	import CampaignTabs from './sub_components/CampaignTabs.svelte';
	import CreateCampaignBtn from './sub_components/CreateCampaignBtn.svelte';
	import CampaignPreviewLg from './sub_components/CampaignPreviewLg.svelte';
    import { show_active_campaigns, show_draft_campaigns, show_campaign_action } from '$lib/store.js' 
	import CampaignActionMenu from './sub_components/CampaignActionMenu.svelte';
</script>

<style lang="postcss">
    .campaigns_menu {
        @apply relative;
    }
</style>

<div transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }} class="campaigns_menu">
    <CampaignsMenuHeading 
        back_btn={true}
        page_title={'Campaigns'}
    />
    <CampaignTabs />
    <CreateCampaignBtn />
    {#if $show_draft_campaigns}
        <CampaignPreviewLg
            status={'Draft'}
            edit_date={'29/01/2024'}
            main_action_text={'Continue building'}
        />
    {/if}
    {#if $show_active_campaigns}
        {#each Array(2) as _}
            <CampaignPreviewLg
                status={'Active'}
                edit_date={'14/12/2023'}
                main_action_text={'Edit'}
            />
        {/each}
    {/if}
    {#if $show_campaign_action}
        <CampaignActionMenu />
    {/if}
</div>