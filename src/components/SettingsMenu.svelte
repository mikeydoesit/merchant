<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import SettingsMenuHeading from "./sub_components/SettingsMenuHeading.svelte";
	import SettingsMenuList from './sub_components/SettingsMenuList.svelte';
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
    />
    <SettingsMenuList />
</div>