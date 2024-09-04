<script>
    import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
    import { show_business_profile_action, show_logo_edit, show_business_name_edit, show_business_registration_edit, show_contact_number_edit, show_location_edit, show_opening_hours_edit } from '$lib/store.js'
    export let merchant;

    const toggle_logo_action = () => {
        show_business_profile_action.set(true)
        show_logo_edit.set(true)
    }
    const toggle_business_name_action = () => {
        show_business_profile_action.set(true)
        show_business_name_edit.set(true)
    }
    const toggle_business_registration = () => {
        show_business_profile_action.set(true)
        show_business_registration_edit.set(true)
    }
    const toggle_contact_number = () => {
        show_business_profile_action.set(true)
        show_contact_number_edit.set(true)
    }
    const toggle_location = () => {
        show_business_profile_action.set(true)
        show_location_edit.set(true)
    }
    const toggle_opening_hours = () => {
        show_business_profile_action.set(true)
        show_opening_hours_edit.set(true)
    }
    console.log(merchant)
</script>
<style lang="postcss">
    .business_profile_menu {
        @apply  h-auto;
    }
    .list_item {
        @apply px-7 flex flex-row justify-between items-center py-6 border-t border-border_grey bg-main_bg text-black;
    }
    .list_item:last-of-type {
        @apply border-b border-border_grey;
    }
    .left_col {
        @apply flex flex-col items-start justify-center;
    }
    .left_col p {
        @apply mt-0.5 text-border_grey_four;
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
    .right_col {
        @apply flex items-center justify-center;
    } 
    .right_col .img_wrapper {
        @apply h-8 w-auto;
    } 
    .right_col .img_wrapper img {
        @apply h-full w-auto;
    }
</style>

<section class="business_profile_menu">
    <ul class="menu_list">
        <li class="list_item" on:click={toggle_logo_action}>
            <div class="left_col">
                <h5 class="list_item_title">Logo</h5>
            </div>
            <div class="right_col">
                <div class="img_wrapper">
                    {#if merchant.logo}
                        <img src={`${PUBLIC_POCKETBASE_URL}/api/files/merchants/${merchant.id}/${merchant.logo}`} alt="logo" />
                    {:else}
                        <img src="/images/upload.png" alt="logo" />
                    {/if}
                </div>
            </div>
        </li>
        <li class="list_item" on:click={toggle_business_name_action}>
            <div class="left_col">
                <h5 class="list_item_title">Business name</h5>
                <p>{merchant.business_name}</p>
            </div>
        </li>
        <li class="list_item" on:click={toggle_business_registration}>
            <div class="left_col">
                <h5 class="list_item_title">Business registration</h5>
                <p>{merchant.registration_number}</p>
            </div>
        </li>
        <li class="list_item" on:click={toggle_contact_number}>
            <div class="left_col">
                <h5 class="list_item_title">Contact number</h5>
                {#if merchant.contact_number}
                    <p>{merchant.contact_number}</p>
                {:else}
                    <p><i>No contact number saved!</i></p>
                {/if}
            </div>
        </li>
        <li class="list_item" on:click={toggle_location}>
            <div class="left_col">
                <h5 class="list_item_title">Location</h5>
                <p>{merchant.location}</p>
            </div>
        </li>
        <!-- <li class="list_item" on:click={toggle_opening_hours}>
            <div class="left_col">
                <h5 class="list_item_title">Opening hours</h5>
            </div>
        </li> -->
    </ul>
</section>