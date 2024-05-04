<script>
    import { show_homepage, show_more_component } from '$lib/store.js';

    const toggle_homepage_component = () => {
        show_homepage.set(true)
        show_more_component.set(false)
    }
    const toggle_more_component = () => {
        show_homepage.set(false)
        show_more_component.set(true)
    }
</script>
<style lang="postcss">
    .tapbar_wrapper {
        @apply fixed bottom-0 w-[-webkit-fill-available] bg-main_bg;
    }
    .tapBarMenu {
        @apply  grid grid-cols-tapbarmenu grid-rows-tapbarmenu z-20 max-w-[576px] relative;
    }
    .menuItem {
        @apply w-full flex justify-center items-center py-5 z-20;
    }
    .menuItem_inner {
        @apply flex flex-col justify-center items-center;
    }
    .menuItem_inner span {
        @apply text-xs font-semibold mt-1;
    }
    .home_label {
        @apply text-[#000000];
    }
    .more_label {
        @apply text-black;
    }
    img {
        @apply w-7 h-7;
    }
</style>


<section class='tapbar_wrapper'>
    <div class="tapBarMenu">
        {#if $show_homepage}
            <div on:click={toggle_homepage_component} class="menuItem border-t-4 border-[#000000]">
                <div class="menuItem_inner">
                    <img src="/images/home_active.png" alt="icon" />
                    <span class="home_label">Home</span>
                </div>
            </div>
        {:else}
            <div on:click={toggle_homepage_component} class="menuItem border-t border-border_grey">
                <div class="menuItem_inner">
                    <img src="/images/home_active.png" alt="icon" />
                    <span class="home_label">Home</span>
                </div>
            </div>
        {/if}
        {#if $show_more_component}
            <div on:click={toggle_more_component} class="menuItem border-t-4 border-[#000000]">
                <div class="menuItem_inner">
                    <img src="/images/more.png" alt="icon" />
                    <span class="more_label">More</span>
                </div>
            </div>
        {:else}
            <div on:click={toggle_more_component} class="menuItem border-t border-border_grey">
                <div class="menuItem_inner">
                    <img src="/images/more.png" alt="icon" />
                    <span class="more_label">More</span>
                </div>
            </div>
        {/if}
    </div>
</section>