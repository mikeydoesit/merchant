<style lang="postcss">
    .campaign_list {
        @apply px-4 mt-4 flex flex-col gap-4;
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
    {#each Array(5) as _}
        <div class="campaign">
            <div class="img_wrapper">
                <img src="/images/add.png" alt="icon" />
            </div>
            <div class="add_btn_text">
                <h5>Click here to add a new campaign</h5>
                <p>Get started</p>
            </div>
        </div>
    {/each}
</section>