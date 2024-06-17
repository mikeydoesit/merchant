<script>
    import HeaderIcons from './sub_components/HeaderIcons.svelte';
    import Greeting from './sub_components/Greeting.svelte';
    import AddCampaignBtn from './sub_components/AddCampaignBtn.svelte';
    import SectionTitle from './sub_components/SectionTitle.svelte';
    import SubmittedCampaign from './sub_components/SubmittedCampaign.svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { currentUser } from '$lib/pocketbase.js'

</script>

<style lang="postcss">
    .homepage_component {
        @apply mb-28;
    }
</style>

<div transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }} class="homepage_component">
    <HeaderIcons />
    <Greeting 
        merchant={$currentUser.business_name}
    />
    <AddCampaignBtn />
    <SectionTitle 
        title={'Submitted Campaigns'}
    />
    <SubmittedCampaign />
</div>