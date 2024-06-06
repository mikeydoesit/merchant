<script>
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { onMount } from 'svelte';
    import { show_campaign_action, show_campaign_action_main, show_campaign_action_edit, show_campaign_action_preview, show_campaign_action_delete, show_product_name_field, show_product_name_input, show_category_field, show_category_input, show_original_price_field, show_original_price_input, show_discount_type_value_field, show_discount_type_value_input, show_product_images_field, show_product_images_input, discount_type, discount_percentage } from '$lib/store.js'

    export let pb = {}
    let campaign = {}
    let show_percent_slider = false

    const hide_element = () => {
        show_campaign_action.set(false)
    }
    let campaign_id = sessionStorage.getItem('selected_campaign')

    const campaign_obj = async () => {
        try {
            const current_campaign = await pb.collection('campaigns').getOne(campaign_id);
            console.log(current_campaign)
            campaign = current_campaign
        } catch (error) {
            console.log(error)
        }
    }
    const toggle_edit_form = () => {
        campaign_obj()
        show_campaign_action_main.set(false) 
        show_campaign_action_preview.set(false)
        show_campaign_action_delete.set(false)
        show_campaign_action_edit.set(true)
    }
    const toggle_preview_view = () => {
        show_campaign_action_main.set(false) 
        show_campaign_action_edit.set(false)
        show_campaign_action_delete.set(false)
        show_campaign_action_preview.set(true)
    }
    const toggle_delete_confirm = () => {
        show_campaign_action_main.set(false) 
        show_campaign_action_edit.set(false)
        show_campaign_action_preview.set(false)
        show_campaign_action_delete.set(true)
    }
    const back_to_action_main = () => {
        show_campaign_action_edit.set(false)
        show_campaign_action_preview.set(false)
        show_campaign_action_delete.set(false)
        show_campaign_action_main.set(true) 
    }

    // EDIT FORM FIELD FUNCTIONS
    const toggle_product_name_field = () => {
        show_product_name_field.set(!$show_product_name_field)
        show_product_name_input.set(!$show_product_name_input)

        // close other fields
        show_category_field.set(true)
        show_category_input.set(false)
        show_original_price_field.set(true)
        show_original_price_input.set(false)
        show_discount_type_value_field.set(true)
        show_discount_type_value_input.set(false)

    }
    const toggle_category_field = () => {
        show_category_field.set(!$show_category_field)
        show_category_input.set(!$show_category_input)

        // close other fields
        show_product_name_field.set(true)
        show_product_name_input.set(false)
        show_original_price_field.set(true)
        show_original_price_input.set(false)
        show_discount_type_value_field.set(true)
        show_discount_type_value_input.set(false)
    }
    const toggle_original_price_field = () => {
        show_original_price_field.set(!$show_original_price_field)
        show_original_price_input.set(!$show_original_price_input)

        // close other fields
        show_product_name_field.set(true)
        show_product_name_input.set(false)
        show_category_field.set(true)
        show_category_input.set(false)
        show_discount_type_value_field.set(true)
        show_discount_type_value_input.set(false)
    }
    const toggle_discount_type_value_field = () => {
        show_discount_type_value_field.set(!$show_discount_type_value_field)
        show_discount_type_value_input.set(!$show_discount_type_value_input)

        // close other fields
        show_product_name_field.set(true)
        show_product_name_input.set(false)
        show_category_field.set(true)
        show_category_input.set(false)
        show_original_price_field.set(true)
        show_original_price_input.set(false)
    }
    const update_field_value = (e) => {

    }

    const set_discount_percentage = (e) => {
        discount_percentage.set(e.target.value)
    }
</script>

<style lang="postcss">
    .campaign_action_menu {
        @apply h-screen bg-black bg-opacity-30 absolute top-0 left-0 bottom-0 right-0;
    }
    .campaign_action_menu_inner_wrapper {
        @apply h-full w-full relative bg-transparent flex flex-col justify-end;
    }
    .campaign_action_menu_inner {
        @apply bg-main_bg h-auto w-full rounded-t-3xl z-20 px-8 py-8;
    }
    .campaign_action_menu_main, .campaign_action_menu_edit, .campaign_action_menu_preview {
        @apply h-auto w-full;
    }
    .campaign_action_menu_header, .campaign_action_menu_edit_header {
        @apply flex flex-row justify-between items-center mb-8;
    }
    .campaign_action_menu_header h3, .campaign_action_menu_edit_header h3 {
        @apply text-2xl font-semibold;
    }
    .campaign_action_menu_header .img_wrapper, .campaign_action_menu_edit_header .img_wrapper {
        @apply h-5 w-5 cursor-pointer;
    }
    .campaign_action_menu_content .link {
        @apply mb-6 font-semibold text-lg cursor-pointer;
    }
    .campaign_action_menu_edit_content {
        @apply flex flex-col gap-4;
    }
    .list_item_content_wrapper {
        @apply flex flex-row justify-between items-center border border-border_grey rounded-md px-3 py-1.5 gap-4;
    }
    .edit_icon {
        @apply h-9 w-9 cursor-pointer flex justify-center items-center p-2 rounded-md;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }
    .list_item_content h6 {
        @apply text-black font-semibold mb-1;
    }
    .list_item_content span {
        @apply text-border_grey_four font-semibold;
    }

    .list_item_form_field_wrapper {
        @apply flex flex-row justify-between items-center gap-6 w-full px-2;
    }
    .field_wrapper {
        @apply flex flex-col justify-between w-8/12;
    }
    .field_wrapper label, .list_item_form_field_wrapper h5 {
        @apply pl-1 mb-1.5 text-sm font-semibold;
    }
    .field_wrapper #product_name_input {
        @apply border-2 border-border_grey py-2 px-4 text-sm rounded-md focus:outline-accent_bg placeholder:text-xs;
    }
    .btns_wrapper {
        @apply flex flex-col gap-1.5 w-auto;
    }
    .back_btn, .save_btn {
        @apply bg-accent_bg text-main_bg text-sm px-4 py-1 rounded-md font-medium flex justify-center cursor-pointer;
    }


    /* discount styling */


    .discount_select {
        @apply flex flex-col gap-2 justify-evenly w-full;
    }
    .discount_type_wrapper {
        @apply relative flex justify-center items-center py-1 px-2 inline border-accent_bg border-2 rounded-full;
    }
    .discount_type_wrapper input[type="radio"]{
        @apply opacity-0 w-0 h-0;
    }
    .discount_type_wrapper label{
        @apply font-medium text-sm mb-0 text-accent_bg z-10;
    }
    .discount_type_wrapper .cell-bg {
        @apply h-full w-full absolute top-0 bottom-0 left-0 right-0 rounded-full;
    }
    .discount_type_wrapper input:checked ~ label {
        @apply text-white;
    }
    .discount_type_wrapper input:checked + .cell-bg {
        @apply text-white bg-accent_bg;
    }
    .percent_slider {
        @apply mt-6;
    }
    .PB-range-slider {
        @apply h-1 w-full bg-accent_bg opacity-70;
        -webkit-appearance: none;
        outline: none;
        -webkit-transition: .2s;
        transition: opacity .2s;
    }

    .PB-range-slider::-webkit-slider-thumb {
        @apply h-4 w-4 rounded-full cursor-pointer bg-accent_bg;
        -webkit-appearance: none;
        appearance: none;
        transition: 0.3s ease-in-out;
    }

    .PB-range-slider::-webkit-slider-thumb:hover {
        box-shadow: 0px 0px 0px 8px rgba(0, 129, 175, 0.16);
        transition: 0.3s ease-in-out;
    }

    .PB-range-slider::-moz-range-thumb {
        @apply h-4 w-4 rounded-full cursor-pointer bg-accent_bg;
    }

    .PB-range-slider-div {
        @apply flex flex-row justify-center items-center gap-4 py-4 px-6 rounded-full;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    .PB-range-slidervalue {
        @apply font-black text-accent_bg text-nowrap;
    }
</style>

<section class="campaign_action_menu">
    <div class="campaign_action_menu_inner_wrapper" on:click|self={hide_element}>
        <div class="campaign_action_menu_inner" transition:slide={{ delay: 150, duration: 200, easing: quintOut, axis: 'y' }}>
            {#if $show_campaign_action_main}
                <div class="campaign_action_menu_main">
                    <div class="campaign_action_menu_header">
                        <h3>More actions</h3>
                        <div class="img_wrapper" on:click={hide_element}>
                            <img src="/images/close.png" alt="icon" />
                        </div>
                    </div>
                    <div class="campaign_action_menu_content">
                        <div class="edit_btn link" on:click={toggle_edit_form}>
                            <span>Edit</span>
                        </div>
                        <div class="preview_btn link" on:click={toggle_preview_view}>
                            <span>Preview</span>
                        </div>
                        <div class="delete_btn link" on:click={toggle_delete_confirm}>
                            <span>Delete</span>
                        </div>
                    </div>
                </div>
            {/if}
            {#if $show_campaign_action_edit}
                <div class="campaign_action_menu_edit">
                    <div class="campaign_action_menu_edit_header">
                        <h3>Edit campaign</h3>
                        <div class="img_wrapper" on:click={back_to_action_main}>
                            <img src="/images/close.png" alt="icon" />
                        </div>
                    </div>
                    <ul class="campaign_action_menu_edit_content">

                        <!-- PRODUCT NAME -->
                        <li class="campaign_list_item">
                            {#if $show_product_name_field}
                                <div class="list_item_content_wrapper" transition:slide={{ delay: 0, duration: 100, easing: quintOut, axis: 'x' }}>
                                    <div class="list_item_content">
                                        <h6>Product/service name</h6>
                                        <span>{campaign.product_name}</span>
                                    </div>
                                    <div class="edit_icon" on:click={toggle_product_name_field}>
                                        <img src="/images/edit.png" />
                                    </div>
                                </div>
                            {/if}
                            {#if $show_product_name_input}
                                <div class="list_item_form_field_wrapper" transition:slide={{ delay: 0, duration: 100, easing: quintOut, axis: 'x' }}>
                                    <div class="field_wrapper">
                                        <label for="product_name_input">Product/service name</label>
                                        <input id="product_name_input" type="text" placeholder="Update the product name"/>
                                    </div>
                                    <div class="btns_wrapper">
                                        <div class="back_btn" on:click={toggle_product_name_field}>
                                            <span>Back</span>
                                        </div>
                                        <div class="save_btn">
                                            <span>Save</span>
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        </li>

                        <!-- CATEGORY -->
                        <li class="campaign_list_item">
                            {#if $show_category_field}
                                <div class="list_item_content_wrapper" transition:slide={{ delay: 0, duration: 0, easing: quintOut, axis: 'x' }}>
                                    <div class="list_item_content">
                                        <h6>Category</h6>
                                        <span>{campaign.sub_category}</span>
                                    </div>
                                    <div class="edit_icon" on:click={toggle_category_field}>
                                        <img src="/images/edit.png" />
                                    </div>
                                </div>
                            {/if}
                            {#if $show_category_input}
                                <div class="list_item_form_field_wrapper" transition:slide={{ delay: 0, duration: 0, easing: quintOut, axis: 'x' }}>
                                    <div class="field_wrapper">
                                        <label for="product_name_input">Category</label>
                                        <input id="product_name_input" type="text" placeholder="Update the product name"/>
                                    </div>
                                    <div class="btns_wrapper">
                                        <div class="back_btn" on:click={toggle_category_field}>
                                            <span>Back</span>
                                        </div>
                                        <div class="save_btn">
                                            <span>Save</span>
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        </li>

                        <!-- ORIGINAL PRICE -->
                        <li class="campaign_list_item">
                            {#if $show_original_price_field}
                                <div class="list_item_content_wrapper" transition:slide={{ delay: 0, duration: 0, easing: quintOut, axis: 'x' }}>
                                    <div class="list_item_content">
                                        <h6>Original price</h6>
                                        <span>{campaign.original_price}</span>
                                    </div>
                                    <div class="edit_icon" on:click={toggle_original_price_field}>
                                        <img src="/images/edit.png" />
                                    </div>
                                </div>
                            {/if}
                            {#if $show_original_price_input}
                                <div class="list_item_form_field_wrapper" transition:slide={{ delay: 0, duration: 0, easing: quintOut, axis: 'x' }}>
                                    <div class="field_wrapper">
                                        <label for="original_price_input">Original price</label>
                                        <input id="original_price_input" type="number" placeholder="Update the original price"/>
                                    </div>
                                    <div class="btns_wrapper">
                                        <div class="back_btn" on:click={toggle_original_price_field}>
                                            <span>Back</span>
                                        </div>
                                        <div class="save_btn">
                                            <span>Save</span>
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        </li>

                        <!-- DISCOUNT TYPE & VALUE -->
                        <li class="campaign_list_item">
                            {#if $show_discount_type_value_field}
                                <div class="list_item_content_wrapper" transition:slide={{ delay: 0, duration: 0, easing: quintOut, axis: 'x' }}>
                                    <div class="list_item_content">
                                        <h6>Discount</h6>
                                        <span>{campaign.discount}</span>
                                    </div>
                                    <div class="edit_icon" on:click={toggle_discount_type_value_field}>
                                        <img src="/images/edit.png" />
                                    </div>
                                </div>
                            {/if}
                            {#if $show_discount_type_value_input}
                                <div class="list_item_form_field_wrapper" transition:slide={{ delay: 0, duration: 0, easing: quintOut, axis: 'x' }}>
                                    <h5>Discount</h5>
                                    <div class="field_wrapper">
                                        <div class="discount_select">
                                            <div class="discount_type_wrapper" on:click={() => show_percent_slider = false}>
                                                <input id="bogof" type="radio" name="discount_type" bind:group={$discount_type} value="BOGOF"/>
                                                <div class="cell-bg"></div>
                                                <label for="bogof">Buy one get one free</label>
                                            </div>
                                            <div class="discount_type_wrapper" on:click={() => show_percent_slider = true}>
                                                <input id="percent" type="radio" name="discount_type" bind:group={$discount_type} value="Percentage"/>
                                                <div class="cell-bg"></div>
                                                <label for="percent">Percentage</label>
                                            </div>
                                        </div>
                                        {#if show_percent_slider}
                                            <div class="percent_slider" transition:fade>
                                                <div class="PB-range-slider-div">
                                                    <input type="range" step="5" min="5" max="90" class="PB-range-slider" id="myRange" bind:value={$discount_percentage} on:change={set_discount_percentage}>
                                                    <p class="PB-range-slidervalue">{$discount_percentage} %</p>
                                                </div>
                                            </div>
                                        {/if}
                                    </div>


                                    <div class="btns_wrapper">
                                        <div class="back_btn" on:click={toggle_discount_type_value_field}>
                                            <span>Back</span>
                                        </div>
                                        <div class="save_btn">
                                            <span>Save</span>
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        </li>
                    </ul>
                </div>
            {/if}
            {#if $show_campaign_action_preview}
                <div class="campaign_action_menu_preview">
                    
                </div>
            {/if}
        </div>
    </div>
</section>