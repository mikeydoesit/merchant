<script>
    import { show_homepage, show_more_component, show_campaigns_menu, show_add_campaign } from '$lib/store.js'

    const go_to_add_campaign = () => {
        show_homepage.set(false)
        show_more_component.set(false)
        show_campaigns_menu.set(false)
        show_add_campaign.set(true)
    }
</script>

<style lang="postcss">
    .add_campaign_btn {
        @apply px-4 mt-4;
    }
    .add_campaign_btn_inner {
        @apply border border-border_grey p-3 flex flex-row rounded-md;
    }
    .img_wrapper {
        @apply bg-accent_bg h-28 w-28 flex flex-row justify-center items-center mr-5;
    }
    .add_btn_text {
        @apply flex flex-col justify-center;
    }
    .add_btn_text h5 {
        @apply text-sm font-bold mb-3;
    }
    .add_btn_text p {
        @apply text-sm text-accent_bg;
    }
</style>

<section class="add_campaign_btn">
    <div class="add_campaign_btn_inner" on:click={go_to_add_campaign}>
        <div class="img_wrapper">
            <img src="/images/add.png" alt="icon" />
        </div>
        <div class="add_btn_text">
            <h5>Click here to create a new campaign</h5>
            <p>Get started</p>
        </div>
    </div>
</section>