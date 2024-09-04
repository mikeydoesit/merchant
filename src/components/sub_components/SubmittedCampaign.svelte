<script>
    import CampaignPreviewWide from "./CampaignPreviewWide.svelte";
    import { pocketbase, currentUser } from "$lib/pocketbase";
    console.log($currentUser)
</script>

<style lang="postcss">
    .campaign_list {
        @apply flex flex-col;
    }
    .campaign {
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

<section class="campaign_list">
        <!-- <div class="campaign">
            <div class="img_wrapper">
                <img src="/images/add.png" alt="icon" />
            </div>
            <div class="add_btn_text">
                <h5>Click here to add a new campaign</h5>
                <p>Get started</p>
            </div>
        </div> -->
        <CampaignPreviewWide
            pb={pocketbase}
            merchant={$currentUser}
        />
</section>