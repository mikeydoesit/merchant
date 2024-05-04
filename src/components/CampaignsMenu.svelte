<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import CampaignsMenuHeading from './sub_components/CampaignsMenuHeading.svelte';
	import CampaignTabs from './sub_components/CampaignTabs.svelte';
	import CreateCampaignBtn from './sub_components/CreateCampaignBtn.svelte';
	import CampaignPreviewLg from './sub_components/CampaignPreviewLg.svelte';
</script>

<div transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }} class="campaigns_menu">
    <CampaignsMenuHeading 
        back_btn={true}
        page_title={'Campaigns'}
    />
    <CampaignTabs />
    <CreateCampaignBtn />
    <CampaignPreviewLg
        status={'Draft'}
        edit_date={'29/01/2024'}
        main_action_text={'Continue building'}
    />
</div>