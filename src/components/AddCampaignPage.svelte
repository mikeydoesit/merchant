<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { show_add_campaign, show_campaigns_menu } from '$lib/store'
    import AddCampaign from "./sub_components/AddCampaign.svelte";
    import GenericHeading from './sub_components/GenericHeading.svelte';
    import { currentUser, pocketbase } from '$lib/pocketbase'

    const back_to_campaign_menu = () => {
        show_add_campaign.set(false)
        show_campaigns_menu.set(true)
    }
    console.log($currentUser)
</script>

<style lang="postcss">

</style>

<div transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }} class="create_campaigns">
    <GenericHeading
        back_btn
        page_title={'Add new campaign'}
        back_to_prev={back_to_campaign_menu}
    />
    <AddCampaign
        sub_category_list={$currentUser.sub_categories}
        pb={pocketbase}
        merchant_id={$currentUser.id}
        merchant_category={$currentUser.business_category}
    />
</div>