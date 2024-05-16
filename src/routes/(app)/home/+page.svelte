<script>
    // import FeaturedSlider from "../../../components/FeaturedSlider.svelte";
    // import HomepageFilterTabs from "../../../components/HomepageFilterTabs.svelte";
    // import SectionTitle from "../../../components/SectionTitle.svelte";
    // import HomepageOfferCardsWide from "../../../components/HomepageOfferCardsWide.svelte";
    // import FullWidthLinkBtn from "../../../components/FullWidthLinkBtn.svelte";
    // import HomepageOfferCardsNarrow from "../../../components/HomepageOfferCardsNarrow.svelte";
    import { goto } from '$app/navigation'
    import { currentUser } from "../../../lib/pocketbase";
    import Homepage from "../../../components/Homepage.svelte";
    import MoreComponent from "../../../components/MoreComponent.svelte";
    import SettingsMenu from "../../../components/SettingsMenu.svelte";
    import { show_homepage, show_more_component, show_settings_menu, show_campaigns_menu, show_add_campaign } from '$lib/store.js';
	import CampaignsMenu from "../../../components/CampaignsMenu.svelte";
    import AddCampaignPage from '../../../components/AddCampaignPage.svelte';

    if(!$currentUser?.verified) {
        goto('/auth')
    }
</script>

<style lang="postcss">
    .home_main {
        @apply bg-main_bg h-full w-full mb-16 relative;
    }
</style>

<main class="home_main">
    {#if $show_homepage}
        <Homepage />
    {/if}
    {#if $show_more_component}
        <MoreComponent />
    {/if}
    {#if $show_settings_menu}
        <SettingsMenu />
    {/if}
    {#if $show_campaigns_menu}
        <CampaignsMenu />
    {/if}
    {#if $show_add_campaign}
        <AddCampaignPage />
    {/if}
</main>