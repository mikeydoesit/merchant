<script>
    import { show_business_profile, show_settings_menu } from '$lib/store.js'
    
    const go_to_business_profile = () => {
        show_settings_menu.set(false)
        show_business_profile.set(true)
    }
</script>
<style lang="postcss">
    .list_item {
        @apply px-7 flex flex-row justify-between items-center py-6 border-t border-border_grey;
    }
    .list_item:last-of-type {
        @apply border-b border-border_grey;
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
        @apply w-6 h-6;
    }
</style>

<section class="settings_menu_list">
    <ul class="menu_list">
        <!-- <li class="list_item">
            <div class="left_col">
                <h5 class="list_item_title">Account</h5>
            </div>
        </li> -->
        <li class="list_item" on:click={go_to_business_profile}>
            <div class="left_col">
                <h5 class="list_item_title">Business Profile</h5>
            </div>
        </li>
        <!-- <li class="list_item">
            <div class="left_col">
                <h5 class="list_item_title">About</h5>
            </div>
        </li> -->
        <li class="list_item">
            <div class="left_col">
                <h5 class="list_item_title">Dark mode: Off</h5>
            </div>
        </li>
        <li class="list_item">
            <div class="left_col">
                <h5 class="list_item_title">Terms of Use</h5>
            </div>
        </li>
        <li class="list_item">
            <div class="left_col">
                <h5 class="list_item_title">Data Privacy</h5>
            </div>
        </li>
        <li class="list_item">
            <div class="left_col">
                <h5 class="list_item_title">Rate this App</h5>
            </div>
            <div class="right_col_img_wrapper">
                <img src="/images/new-window.png" alt="icon" />
            </div>
        </li>
    </ul>
</section>