<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { show_more_component, show_settings_menu } from '$lib/store.js'
    import SettingsMenuHeading from "./sub_components/SettingsMenuHeading.svelte";
	import SettingsMenuList from './sub_components/SettingsMenuList.svelte';

    const back_to_more_menu = () => {
        show_settings_menu.set(false);
        show_more_component.set(true);
    }
</script>

<style lang="postcss">
    .settings_menu {
        @apply h-dvh w-full;
    }
</style>

<div transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }} class="settings_menu">
    <SettingsMenuHeading
        back_btn={true}
        page_title={'Settings'}
        back_to_prev={back_to_more_menu}
    />
    <SettingsMenuList />
</div>