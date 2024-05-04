<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import SectionTitleXl from './sub_components/SectionTitleXL.svelte';
	import MoreMenuList from './sub_components/MoreMenuList.svelte';
</script>

<style lang="postcss">
    .more_component {
        @apply h-full w-full pt-16;
    }
</style>

<div transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }} class="more_component">
    <SectionTitleXl
        title={'Menu'}
    />
    <MoreMenuList />
</div>