<script>
    export let status = '';
    export let edit_date = '';
    export let main_action_text = '';
</script>

<style lang="postcss">
    .campaign_preview_lg {
        @apply px-4 mt-8;
    }
    .card {
        @apply border border-border_grey py-4 px-6 rounded-lg;
    }
    .card_heading {
        @apply flex flex-row items-center justify-between mb-4;
    }
    .card_heading .status_label {
        @apply bg-accent_bg bg-opacity-30 px-3 py-1 rounded-lg flex justify-center items-center;
    }
    .card_heading .status_label span {
        @apply font-medium text-black text-sm;
    }
    .card_heading .img_wrapper {
        @apply h-5 w-5 cursor-pointer;
    }
    .card_main h4 {
        @apply font-semibold mb-1;
    }
    .card_main .edit_date {
        @apply text-sm;
    }
    .card_footer {
        @apply mt-5;
    }
    .main_action_btn {
        @apply border-2 border-border_grey rounded-full w-fit px-4 py-2 ease-in-out duration-300 cursor-pointer flex items-center justify-center hover:border-accent_bg;
    }
    .main_action_btn span {
        @apply text-sm;
    }
</style>

<section class="campaign_preview_lg">
    <div class="card">
        <div class="card_heading">
            <div class="status_label">
                <span>{status}</span>
            </div>
            <div class="img_wrapper">
                <img src="/images/more_dots.png" alt="icon"/>
            </div>
        </div>
        <div class="card_main">
            <h4>Up to 40% Off on Scale and Polish (Dental Services) - All Smiles Dental</h4>
            <span class="edit_date">Last modified on: {edit_date}</span>
        </div>
        <div class="card_footer">
            <div class="main_action_btn">
                <span>{main_action_text}</span>
            </div>
        </div>
    </div>
</section>