<script>

</script>

<style lang="postcss">
    .create_campaign_btn {
        @apply py-5 bg-border_grey_two w-full;
    }
    .create_campaign_btn_inner {
        @apply flex flex-row justify-center items-center bg-main_bg w-fit py-3 px-8 rounded-lg mx-auto ease-in-out duration-300 cursor-pointer hover:scale-95;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    }
    .create_campaign_btn_inner:hover {
        box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
    }
    .create_campaign_btn_inner p {
        @apply text-sm;
    }
    .create_campaign_btn_inner img {
        @apply w-3 h-3 mr-1;
    }
</style>

<section class="create_campaign_btn">
    <div class="create_campaign_btn_inner">
        <img src="/images/add_dark.png" alt="add icon"/>
        <p class="create_campaign_btn_text">Create a New Campaign</p>
    </div>
</section>