<script>
    import { show_settings_menu, show_more_component, show_campaigns_menu } from '$lib/store.js';

    const toggle_settings_menu = () => {
        show_more_component.set(false);
        show_settings_menu.set(true);
    }
    const toggle_campaigns_menu = () => {
        show_more_component.set(false);
        show_campaigns_menu.set(true);
    }
</script>

<style lang="postcss">
    .more_menu_list {
        @apply px-4 mt-10;
    }
    .menu_list {
        @apply px-2.5;
    }
    .list_item {
        @apply flex flex-row justify-between items-center mb-10;
    }
    .left_col {
        @apply flex flex-row items-center;
    }
    .img_wrapper {
        @apply w-7 h-7;
    }
    .left_col .img_wrapper {
        @apply mr-5;
    }
    .list_item_title {
        @apply text-xl text-black font-semibold;
    } 
    .right_col_img_wrapper {
        @apply w-4 h-4;
    }
</style>

<section class="more_menu_list">
    <ul class="menu_list">
        <li class="list_item" on:click={toggle_campaigns_menu}>
            <div class="left_col">
                <div class="img_wrapper">
                    <img src="/images/campaign_icon.png" alt="icon" />
                </div>
                <h5 class="list_item_title">Campaigns</h5>
            </div>
            <div class="right_col_img_wrapper">
                <img src="/images/chevron_right.png" alt="icon" />
            </div>
        </li>
        <li class="list_item">
            <div class="left_col">
                <div class="img_wrapper">
                    <img src="/images/support.png" alt="icon" />
                </div>
                <h5 class="list_item_title">Support</h5>
            </div>
            <div class="right_col_img_wrapper">
                <img src="/images/chevron_right.png" alt="icon" />
            </div>
        </li>
        <li class="list_item" on:click={toggle_settings_menu}>
            <div class="left_col">
                <div class="img_wrapper">
                    <img src="/images/setting.png" alt="icon" />
                </div>
                <h5 class="list_item_title">Settings</h5>
            </div>
            <div class="right_col_img_wrapper">
                <img src="/images/chevron_right.png" alt="icon" />
            </div>
        </li>
        <li class="list_item">
            <div class="left_col">
                <div class="img_wrapper">
                    <img src="/images/sign_out.png" alt="icon" />
                </div>
                <h5 class="list_item_title">Sign Out</h5>
            </div>
        </li>
    </ul>
</section>