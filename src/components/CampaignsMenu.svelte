<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import CampaignsMenuHeading from './sub_components/CampaignsMenuHeading.svelte';
	import CampaignTabs from './sub_components/CampaignTabs.svelte';
	import CreateCampaignBtn from './sub_components/CreateCampaignBtn.svelte';
	import CampaignPreviewLg from './sub_components/CampaignPreviewLg.svelte';
    import { show_active_campaigns, show_draft_campaigns, show_campaign_action, draft_result_list, active_result_list } from '$lib/store.js' 
    import { pocketbase, currentUser } from "$lib/pocketbase";
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
            merchant={$currentUser}
            pb={pocketbase}
        />
    {/if}
    {#if $show_active_campaigns}
        <CampaignPreviewLg
            merchant={$currentUser}
            pb={pocketbase}
        />
    {/if}
    {#if $show_campaign_action}
        <CampaignActionMenu
            pb={pocketbase}
            sub_category_list={$currentUser.sub_categories}
        />
    {/if}
</div>