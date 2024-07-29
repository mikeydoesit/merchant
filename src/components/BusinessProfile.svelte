<script>
    import { currentUser, pocketbase } from '../lib/pocketbase';
    import accra_locations from '$lib/data/Accra_locations.js'
    import { show_business_profile, show_settings_menu, show_business_profile_action } from '$lib/store.js'
    import SettingsMenuHeading from './sub_components/SettingsMenuHeading.svelte'
	import BusinessProfileMenu from './sub_components/BusinessProfileMenu.svelte';

    import { slide } from 'svelte/transition'
    import { quintOut } from 'svelte/easing';
	import BusinessProfileAction from './sub_components/BusinessProfileAction.svelte';

    const back_to_settings_menu = () => {
        show_business_profile.set(false)
        show_settings_menu.set(true)
    }
</script>
<style lang="postcss">
    .business_profile {
        @apply h-screen bg-border_grey_two;
    }
</style>
<div transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }} class="business_profile">
    <SettingsMenuHeading
        back_btn={true}
        page_title={'Business profile'}
        back_to_prev={back_to_settings_menu}
    />
    <BusinessProfileMenu 
        merchant={$currentUser}
    />
    {#if $show_business_profile_action}
        <BusinessProfileAction
            pb={pocketbase}
            merchant={$currentUser}
            locations={accra_locations}
        />
    {/if}
</div>