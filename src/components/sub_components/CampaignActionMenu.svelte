<script>
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { onMount } from 'svelte';
    import { createApi } from 'unsplash-js';
    import { PUBLIC_POCKETBASE_URL, PUBLIC_UNSPLASH_ACCESS_KEY, PUBLIC_CAMPAIGN_BASE_URL } from '$env/static/public';
    import { show_active_campaigns, show_draft_campaigns, show_campaign_action, show_campaign_action_main, show_campaign_action_edit, show_campaign_action_preview, show_campaign_action_delete, show_product_name_field, show_product_name_input, show_category_field, updated_product_service_name, show_updated_product_category_list, has_updated_product_category, selected_updated_product_category_to_display, show_category_input, show_original_price_field, show_original_price_input, updated_original_price, show_discount_type_value_field, show_discount_type_value_input, show_product_images_field, show_product_images_input, updated_internal_storage_images, show_edit_stock_images, edit_stock_images, edit_stock_images_array, updated_stock_images_ids, updated_stock_images, discount_type, discount_percentage, updated_discount_type, updated_discount_percentage } from '$lib/store.js'

    export let sub_category_list = [];
    export let pb = {}
    let updated_campaign = new FormData();
    let campaign = {}
    let stock_media = []
    let internal_media = []
    let show_percent_slider = false
    let submitting_product_name = false
    let submitting_product_category = false
    let submitting_original_price = false
    let submitting_discount = false
    let submitting_images = false
    let deleting_campaign = false

    const hide_element = () => {
        show_campaign_action.set(false)
    }
    let campaign_id = sessionStorage.getItem('selected_campaign')

    const campaign_obj = async () => {
        try {
            const current_campaign = await pb.collection('campaigns').getOne(campaign_id);
            campaign = current_campaign
            stock_media = current_campaign.stock_images
            internal_media = current_campaign.images
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
    const go_to_live_view = () => {
        window.location.assign(PUBLIC_CAMPAIGN_BASE_URL)
    }

    // EDIT FORM FIELD FUNCTIONS
    const set_updated_product_service_name = (e) => {
        updated_product_service_name.set(e.target.value)
    }
    const submit_updated_product_service_name = async () => {

        if(!submitting_product_name) {

            submitting_product_name = true

            updated_campaign.set('product_name', $updated_product_service_name)

            try {
                const record = await pb.collection('campaigns').update(campaign_id, updated_campaign);
            } catch (error) {
                console.log(error)
            } finally {
                campaign_obj()
                submitting_product_name = false
                toggle_product_name_field()
            }
        }

    }
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
    const toggle_updated_product_category_list = () => {
        show_updated_product_category_list.set(!$show_updated_product_category_list)
    }
    const set_updated_product_category = (e) => {
        selected_updated_product_category_to_display.set(e.target.dataset.name)
        has_updated_product_category.set(true)
        toggle_updated_product_category_list()
    }
    const submit_updated_product_category = async () => {

        if(!submitting_product_category) {

            submitting_product_category = true

            updated_campaign.set('sub_category', $selected_updated_product_category_to_display)

            try {
                const record = await pb.collection('campaigns').update(campaign_id, updated_campaign);
            } catch (error) {
                console.log(error)
            } finally {
                campaign_obj()
                submitting_product_category = false
                toggle_category_field()
            }
        }
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
    const set_updated_original_price = (e) => {
        updated_original_price.set(e.target.value)
    }
    const submit_updated_original_price = async () => {

        if(!submitting_original_price) {

            submitting_original_price = true

            updated_campaign.set('original_price', $updated_original_price)

            try {
                const record = await pb.collection('campaigns').update(campaign_id, updated_campaign);
            } catch (error) {
                console.log(error)
            } finally {
                campaign_obj()
                submitting_original_price = false
                toggle_original_price_field()
            }
        }

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
    const set_updated_discount_percentage = (e) => {
        updated_discount_percentage.set(e.target.value)
    }
    const submit_updated_discount = async () => {

        if(!submitting_discount) {

            submitting_discount = true

            updated_campaign.set('discount_type', $updated_discount_type)
            if($updated_discount_type == 'BOGOF' || $updated_discount_type == '') {
                updated_campaign.set('discount_value', null)
            } else if($updated_discount_type == 'Percentage') {
                updated_campaign.set('discount_value', $updated_discount_percentage)
            }

            try {
                const record = await pb.collection('campaigns').update(campaign_id, updated_campaign);
            } catch (error) {
                console.log(error)
            } finally {
                campaign_obj()
                submitting_discount = false
                toggle_discount_type_value_field()
            }
        }
    }
    const toggle_images_field = () => {
        show_product_images_field.set(!$show_product_images_field)
        show_product_images_input.set(!$show_product_images_input)

        // close other fields
        show_product_name_field.set(true)
        show_product_name_input.set(false)
        show_category_field.set(true)
        show_category_input.set(false)
        show_original_price_field.set(true)
        show_original_price_input.set(false)
        show_discount_type_value_field.set(true)
        show_discount_type_value_input.set(false)

    }
    const update_selected_internal_storage_images = (e) => {
        updated_internal_storage_images.set(e.target.files)
    }

    // UNSPLASH INSTANCE

    const unsplash = createApi({
        accessKey: PUBLIC_UNSPLASH_ACCESS_KEY
    });
    const search_unsplash = () => { 
        show_product_images_input.set(false)
        show_edit_stock_images.set(true)
        
        unsplash.search.getPhotos({
            query: campaign.sub_category,
            per_page: 30
        }).then(result => {
            if(result.type == 'success') {
                edit_stock_images.set(result.response.results)
                edit_stock_images_array.set($edit_stock_images.map((item) => {
                    return {
                        id: item.id,
                        name: item.alt_description,
                        url: item.urls.regular
                    }
                }))
            }
        });
    }
    const set_updated_stock_images_list = () => {
        updated_stock_images.set($updated_stock_images_ids.map((id) => {
            return $edit_stock_images_array.find(image => image.id === id)
        }))
    }
    const back_to_image_input = () => {
        show_edit_stock_images.set(false)
        show_product_images_input.set(true)
    }
    const clear_images = () => {
        updated_internal_storage_images.set([])
        updated_stock_images.set([])
        edit_stock_images_array.set([])
        updated_stock_images_ids.set([])
    }
    const submit_updated_images = async () => {

        if(!submitting_images) {

            submitting_images = true

            updated_campaign.delete('images')
            updated_campaign.set('stock_images', JSON.stringify($updated_stock_images));
        
            for (let file of $updated_internal_storage_images) {
                updated_campaign.append('images', file);
            }

            const images_field_reset = {
                "images": null,
                "stock_images": []
            };

            try {
                const reset = await pb.collection('campaigns').update(campaign_id, images_field_reset);

                const record = await pb.collection('campaigns').update(reset.id, updated_campaign);
                console.log(record)
            } catch (error) {
                console.log(error)
                submitting_images = false
            } finally {
                campaign_obj()
                submitting_images = false
                toggle_images_field()
                clear_images()
            }
        }
    }
    const delete_campaign = async () => {
        if(!deleting_campaign) {

            deleting_campaign = true

            try {
                const record = await pb.collection('campaigns').delete(campaign.id);
                console.log(record)
            } catch (error) {
                console.log(error)
                deleting_campaign = false
            } finally {
                campaign = {}
                stock_media = []
                internal_media = []
                deleting_campaign = false
                clear_images()
                hide_element()
            }
        }
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
        @apply bg-main_bg h-auto max-h-[80vh] w-full rounded-t-3xl z-20 px-8 py-8 overflow-y-scroll;
    }
    .campaign_action_menu_main, .campaign_action_menu_edit, .campaign_action_menu_preview, .campaign_action_menu_delete {
        @apply h-auto w-full;
    }
    .campaign_action_menu_header, .campaign_action_menu_edit_header, .campaign_action_menu_delete_header {
        @apply flex flex-row justify-between items-center mb-8;
    }
    .campaign_action_menu_header h3, .campaign_action_menu_edit_header h3, .campaign_action_menu_delete_header h3 {
        @apply text-2xl font-semibold;
    }
    .campaign_action_menu_header .img_wrapper, .campaign_action_menu_edit_header .img_wrapper, .campaign_action_menu_delete_header .img_wrapper {
        @apply h-5 w-5 cursor-pointer;
    }
    .campaign_action_menu_content .link {
        @apply mb-6 font-semibold text-lg cursor-pointer;
    }
    .campaign_action_menu_edit_content, .campaign_action_menu_delete_content {
        @apply flex flex-col gap-4;
    }
    .list_item_content_wrapper {
        @apply flex flex-row justify-between items-center border border-border_grey rounded-md px-3 py-1.5 gap-2;
    }
    .edit_icon {
        @apply h-auto w-auto cursor-pointer flex justify-center items-center p-2 rounded-md;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }
    .edit_icon img {
        @apply w-4;
    }
    .list_item_content {
        @apply w-4/5;
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
    .list_item_form_field_wrapper.images_container {
        @apply flex-col gap-3 ;
    }
    .field_wrapper {
        @apply flex flex-col justify-between w-8/12;
    }
    .discount_select, 
    .field_wrapper label, .list_item_form_field_wrapper h5, .discount_title {
        @apply pl-1 mb-1.5 text-sm font-semibold;
    }
    .discount_title {
        @apply pl-3 mb-4;
    }
    .discount_list_item_content {
        @apply flex flex-row gap-6;
    }
    .field_wrapper #product_name_input, .field_wrapper #original_price_input {
        @apply border-2 border-border_grey py-2 px-4 text-sm rounded-md focus:outline-accent_bg placeholder:text-xs;
    }
    .product_category_select_input_btn_wrapper {
        @apply relative;
    }
    .product_category_select_input_btn {
        @apply border-2 py-2 px-4 rounded-md text-xs;
    }
    .product_category_list {
        @apply absolute top-full mt-2 z-10 bg-main_bg w-full h-32 rounded-lg overflow-y-scroll;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    }
    .product_category_list_item {
        @apply py-2 px-4 hover:bg-border_grey_two text-xs;
    }
    .btns_wrapper {
        @apply flex flex-col gap-1.5 w-auto;
    }
    .back_btn, .save_btn {
        @apply bg-accent_bg text-main_bg text-sm px-4 py-1 rounded-md font-medium flex justify-center cursor-pointer;
    }
    .list_item_content .images_h6 {
        @apply mb-3;
    }
    .images_grid {
        @apply grid grid-cols-upload_thumbnail_grid gap-2 w-full;
    }
    .grid_item_wrapper {
        @apply h-9;
    }
    .grid_item {
        @apply h-full w-full object-center object-cover;
    }
    .image_uploader_field_wrapper {
        @apply w-full mb-3;
    }

    .image_uploader_wrapper {
        @apply w-full flex flex-row items-center justify-evenly;
    }
    #image_uploader_btn {
        @apply h-0 w-0 opacity-0 absolute;
    }
    .image_uploader_btn {
        @apply flex items-center justify-center;
    }
    .image_uploader {
        @apply flex justify-center items-center relative border-2 border-[#606061] rounded-2xl border-dashed w-fit p-2.5;
    }
    .image_uploader label {
        @apply flex  justify-center items-center;
    }
    .image_uploader .upload_icon {
        @apply h-10 w-10;
    }
    .image_uploader_wrapper .mid_text {
        @apply my-2.5 font-semibold text-border_grey_four text-sm;
    }
    .stock_image_btn {
        @apply text-center rounded-3xl;
    }
    .internal_storage_btn, .stock_image_btn {
        @apply bg-accent_bg text-xs text-white px-8 py-2.5 rounded-lg font-semibold;
    }
    .thumbnails_wrapper {
        @apply flex flex-row gap-3 justify-between items-center w-full;
    }
    .clear_btn {
        @apply flex justify-center items-center cursor-pointer;
   }
    .clear_btn img {
        @apply w-6 h-6;
    }
    .thumbnails_placeholder {
        @apply py-4 px-3 text-border_grey_five rounded-lg bg-border_grey_two w-full flex justify-center;
    }
    .thumbnails_placeholder span {
        @apply italic text-sm;
    }
    .stock_image_select {
        @apply h-[25vh] overflow-y-scroll;
    }
    .stock_image_select_inner {
        @apply w-full gap-2;
        column-count: 3;
    }
    .stock_image_item {
        @apply w-full h-fit row-auto relative mb-4 cursor-pointer block;
        -webkit-column-break-inside: avoid;
        break-inside: avoid;
        page-break-inside: avoid;
    }
    .stock_image_item .item_input {
        @apply absolute h-0 w-0 opacity-0;
    }
    .stock_image_item .item_input:checked + .stock_image_overlay img {
        @apply block;
    }
    .stock_image_item .item_input:checked + .stock_image_overlay {
        @apply bg-black/30;
    }
    .stock_image {
        @apply w-full h-full object-center object-cover;
    }
    .stock_image_overlay {
        @apply absolute z-10 top-0 bottom-0 left-0 right-0 flex justify-center items-center cursor-pointer ease-in-out duration-300 hover:bg-black/30;
    }
    .stock_image_overlay img {
        @apply h-9 w-9 hidden;
    }
    .edit_stock_image_back_btn {
        @apply my-3 flex flex-row w-full;
    }
    .edit_stock_image_back_btn .back_btn {
        @apply w-full bg-accent_bg flex justify-center items-center text-main_bg font-semibold py-3 rounded-lg cursor-pointer hover:bg-accent_bg/80;
    }
    .main_edit_image_select_btns {
        @apply mt-3 flex flex-row w-full gap-4 mb-6;
    }
    .upload_btn {
        @apply w-full bg-accent_bg flex justify-center items-center text-main_bg font-semibold py-3 rounded-lg cursor-pointer hover:bg-accent_bg/80;
    }
    .main_edit_image_select_btns .back_btn, .main_edit_image_select_btns .upload_btn {
        @apply w-1/2 bg-accent_bg flex justify-center items-center text-main_bg font-semibold py-3 rounded-lg cursor-pointer hover:bg-accent_bg/80;
    }
    .campaign_action_menu_delete_confirmation {
        @apply flex w-full;
    }
    .confirmation_btn {
        @apply flex justify-center items-center bg-highlight_bg w-full py-2.5 px-1 rounded-md cursor-pointer;
    }
    .confirmation_btn span {
        @apply text-main_bg font-medium;
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
        @apply mt-3;
    }
    .PB-range-slider {
        @apply h-0.5 w-full bg-accent_bg opacity-70;
        -webkit-appearance: none;
        outline: none;
        -webkit-transition: .2s;
        transition: opacity .2s;
    }

    .PB-range-slider::-webkit-slider-thumb {
        @apply h-3 w-3 rounded-full cursor-pointer bg-accent_bg;
        -webkit-appearance: none;
        appearance: none;
        transition: 0.3s ease-in-out;
    }

    .PB-range-slider::-webkit-slider-thumb:hover {
        box-shadow: 0px 0px 0px 5px rgba(0, 129, 175, 0.16);
        transition: 0.3s ease-in-out;
    }

    .PB-range-slider::-moz-range-thumb {
        @apply h-3 w-3 rounded-full cursor-pointer bg-accent_bg;
    }

    .PB-range-slider-div {
        @apply flex flex-row justify-center items-center gap-3 py-2 px-4 rounded-full;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    .PB-range-slidervalue {
        @apply font-black text-accent_bg text-nowrap text-sm;
    }

    /* Button loader */.loader {
        @apply w-[20px] h-[20px] relative rounded-full; 
    }

    .loader div {
        width: 8%;
        height: 24%;
        background: rgb(255, 255, 255);
        position: absolute;
        left: 50%;
        top: 30%;
        opacity: 0;
        border-radius: 33px;
        box-shadow: 0 0 2px rgba(0,0,0,0.2);
        animation: fade458 1s linear infinite;
    }

    @keyframes fade458 {
        from {
            opacity: 1;
        }

        to {
            opacity: 0.25;
        }
    }

    .loader .bar1 {
        transform: rotate(0deg) translate(0, -130%);
        animation-delay: 0s;
    }

    .loader .bar2 {
        transform: rotate(30deg) translate(0, -130%);
        animation-delay: -1.1s;
    }

    .loader .bar3 {
        transform: rotate(60deg) translate(0, -130%);
        animation-delay: -1s;
    }

    .loader .bar4 {
        transform: rotate(90deg) translate(0, -130%);
        animation-delay: -0.9s;
    }

    .loader .bar5 {
        transform: rotate(120deg) translate(0, -130%);
        animation-delay: -0.8s;
    }

    .loader .bar6 {
        transform: rotate(150deg) translate(0, -130%);
        animation-delay: -0.7s;
    }

    .loader .bar7 {
        transform: rotate(180deg) translate(0, -130%);
        animation-delay: -0.6s;
    }

    .loader .bar8 {
        transform: rotate(210deg) translate(0, -130%);
        animation-delay: -0.5s;
    }

    .loader .bar9 {
        transform: rotate(240deg) translate(0, -130%);
        animation-delay: -0.4s;
    }

    .loader .bar10 {
        transform: rotate(270deg) translate(0, -130%);
        animation-delay: -0.3s;
    }

    .loader .bar11 {
        transform: rotate(300deg) translate(0, -130%);
        animation-delay: -0.2s;
    }

    .loader .bar12 {
        transform: rotate(330deg) translate(0, -130%);
        animation-delay: -0.1s;
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
                        {#if $show_draft_campaigns}
                            <div class="edit_btn link" on:click={toggle_edit_form}>
                                <span>Edit</span>
                            </div>
                            <div class="preview_btn link" on:click={toggle_preview_view}>
                                <span>Preview</span>
                            </div>
                        {/if}
                        {#if $show_active_campaigns}
                            <div class="preview_btn link" on:click={go_to_live_view}>
                                <span>View</span>
                            </div>
                        {/if}
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
                                        <input id="product_name_input" type="text" placeholder="Update the product name" on:input={set_updated_product_service_name}/>
                                    </div>
                                    <div class="btns_wrapper">
                                        <div class="back_btn" on:click={toggle_product_name_field}>
                                            <span>Back</span>
                                        </div>
                                        {#if submitting_product_name}
                                            <div class="save_btn" on:click={submit_updated_product_service_name}>
                                                <div class="loader">
                                                    <div class="bar1"></div>
                                                    <div class="bar2"></div>
                                                    <div class="bar3"></div>
                                                    <div class="bar4"></div>
                                                    <div class="bar5"></div>
                                                    <div class="bar6"></div>
                                                    <div class="bar7"></div>
                                                    <div class="bar8"></div>
                                                    <div class="bar9"></div>
                                                    <div class="bar10"></div>
                                                    <div class="bar11"></div>
                                                    <div class="bar12"></div>
                                                </div>
                                            </div>
                                        {:else}
                                            <div class="save_btn" on:click={submit_updated_product_service_name}>
                                                <span>Save</span>
                                            </div>
                                        {/if}
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
                                        <div class="product_category_select_input_btn_wrapper">
                                            <div class={`product_category_select_input_btn ${$show_updated_product_category_list ? 'border-accent_bg' : 'border-border_grey'}`} on:click={toggle_updated_product_category_list}>
                                                <span class={`${$has_updated_product_category ? 'text-black' : 'text-border_grey_four'}`}>{$selected_updated_product_category_to_display}</span>
                                            </div>
                                            {#if $show_updated_product_category_list}
                                                <ul class="product_category_list" transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}>
                                                    {#each sub_category_list as list_item}
                                                    <li class="product_category_list_item" data-name={list_item} on:click={set_updated_product_category}>{list_item}</li>
                                                    {/each}
                                                </ul>
                                            {/if}
                                        </div>
                                    </div>
                                    <div class="btns_wrapper">
                                        <div class="back_btn" on:click={toggle_category_field}>
                                            <span>Back</span>
                                        </div>
                                        {#if submitting_product_category}
                                            <div class="save_btn" on:click={submit_updated_product_category}>
                                                <div class="loader">
                                                    <div class="bar1"></div>
                                                    <div class="bar2"></div>
                                                    <div class="bar3"></div>
                                                    <div class="bar4"></div>
                                                    <div class="bar5"></div>
                                                    <div class="bar6"></div>
                                                    <div class="bar7"></div>
                                                    <div class="bar8"></div>
                                                    <div class="bar9"></div>
                                                    <div class="bar10"></div>
                                                    <div class="bar11"></div>
                                                    <div class="bar12"></div>
                                                </div>
                                            </div>
                                        {:else}
                                            <div class="save_btn" on:click={submit_updated_product_category}>
                                                <span>Save</span>
                                            </div>
                                        {/if}
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
                                        <input id="original_price_input" type="number" placeholder="Update the original price" on:input={set_updated_original_price}/>
                                    </div>
                                    <div class="btns_wrapper">
                                        <div class="back_btn" on:click={toggle_original_price_field}>
                                            <span>Back</span>
                                        </div>
                                        {#if submitting_original_price}
                                            <div class="save_btn" on:click={submit_updated_original_price}>
                                                <div class="loader">
                                                    <div class="bar1"></div>
                                                    <div class="bar2"></div>
                                                    <div class="bar3"></div>
                                                    <div class="bar4"></div>
                                                    <div class="bar5"></div>
                                                    <div class="bar6"></div>
                                                    <div class="bar7"></div>
                                                    <div class="bar8"></div>
                                                    <div class="bar9"></div>
                                                    <div class="bar10"></div>
                                                    <div class="bar11"></div>
                                                    <div class="bar12"></div>
                                                </div>
                                            </div>
                                        {:else}
                                            <div class="save_btn" on:click={submit_updated_original_price}>
                                                <span>Save</span>
                                            </div>
                                        {/if}
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
                                        <div class="discount_list_item_content">
                                            <span>{campaign.discount_type}</span>
                                            {#if campaign.discount_type == 'Percentage'}
                                                <span>{campaign.discount_value}%</span>
                                            {/if}
                                        </div>
                                    </div>
                                    <div class="edit_icon" on:click={toggle_discount_type_value_field}>
                                        <img src="/images/edit.png" />
                                    </div>
                                </div>
                            {/if}
                            {#if $show_discount_type_value_input}
                            <h5 class="discount_title">Discount</h5>
                                <div class="list_item_form_field_wrapper" transition:slide={{ delay: 0, duration: 0, easing: quintOut, axis: 'x' }}>
                                    <div class="field_wrapper">
                                        <div class="discount_select">
                                            <div class="discount_type_wrapper" on:click={() => show_percent_slider = false}>
                                                <input id="bogof" type="radio" name="discount_type" bind:group={$updated_discount_type} value="BOGOF"/>
                                                <div class="cell-bg"></div>
                                                <label for="bogof">Buy one get one free</label>
                                            </div>
                                            <div class="discount_type_wrapper" on:click={() => show_percent_slider = true}>
                                                <input id="percent" type="radio" name="discount_type" bind:group={$updated_discount_type} value="Percentage"/>
                                                <div class="cell-bg"></div>
                                                <label for="percent">Percentage</label>
                                            </div>
                                        </div>
                                        {#if show_percent_slider}
                                            <div class="percent_slider" transition:fade>
                                                <div class="PB-range-slider-div">
                                                    <input type="range" step="5" min="5" max="90" class="PB-range-slider" id="myRange" bind:value={$updated_discount_percentage} on:change={set_updated_discount_percentage}>
                                                    <p class="PB-range-slidervalue">{$updated_discount_percentage} %</p>
                                                </div>
                                            </div>
                                        {/if}
                                    </div>


                                    <div class="btns_wrapper">
                                        <div class="back_btn" on:click={toggle_discount_type_value_field}>
                                            <span>Back</span>
                                        </div>
                                        {#if submitting_discount}
                                            <div class="save_btn" on:click={submit_updated_discount}>
                                                <div class="loader">
                                                    <div class="bar1"></div>
                                                    <div class="bar2"></div>
                                                    <div class="bar3"></div>
                                                    <div class="bar4"></div>
                                                    <div class="bar5"></div>
                                                    <div class="bar6"></div>
                                                    <div class="bar7"></div>
                                                    <div class="bar8"></div>
                                                    <div class="bar9"></div>
                                                    <div class="bar10"></div>
                                                    <div class="bar11"></div>
                                                    <div class="bar12"></div>
                                                </div>
                                            </div>
                                        {:else}
                                            <div class="save_btn" on:click={submit_updated_discount}>
                                                <span>Save</span>
                                            </div>
                                        {/if}
                                    </div>
                                </div>
                            {/if}
                        </li>

                        <!-- IMAGES -->
                        <li class="campaign_list_item">
                            {#if $show_product_images_field}
                                <div class="list_item_content_wrapper" transition:slide={{ delay: 0, duration: 100, easing: quintOut, axis: 'x' }}>
                                    <div class="list_item_content">
                                        <h6 class="images_h6">Images</h6>
                                        <div class="images_grid">
                                            {#if stock_media.length > 0}
                                                {#each stock_media as stock_image_obj}
                                                    <div class="grid_item_wrapper">
                                                        <img class="grid_item" src={stock_image_obj.url} alt={stock_image_obj.name} />
                                                    </div>
                                                {/each}
                                            {/if}
                                            {#if internal_media.length > 0}
                                                {#each internal_media as image_obj}
                                                    <div class="grid_item_wrapper">
                                                        <img class="grid_item" src={`${PUBLIC_POCKETBASE_URL}/api/files/campaigns/${campaign_id}/${image_obj}`} />
                                                    </div>
                                                {/each}
                                            {/if}
                                        </div>
                                    </div>
                                    <div class="edit_icon" on:click={toggle_images_field}>
                                        <img src="/images/edit.png" />
                                    </div>
                                </div>
                            {/if}
                            {#if $show_product_images_input}
                                <div class="list_item_form_field_wrapper images_container" transition:slide={{ delay: 0, duration: 0, easing: quintOut, axis: 'x' }}>
                                    <div class="image_uploader_field_wrapper">
                                        <div class="image_uploader_wrapper">
                                            <div class="image_uploader">
                                                <input id="image_uploader_btn" type="file" on:input={update_selected_internal_storage_images} multiple />
                                                <label for="image_uploader_btn" class="image_uploader_btn">
                                                    <img class="upload_icon" src="/images/upload.png" alt="upload"/>
                                                </label>
                                            </div>
                                            <div class="stock_image_btn" on:click={search_unsplash}>
                                                <span>Stock<br/>images</span>
                                            </div>
                                        </div>
                                    </div>
                                    {#if $updated_internal_storage_images.length > 0 || $updated_stock_images.length > 0}
                                    <div class="thumbnails_wrapper">
                                        <div class="thumbnails_placeholder">
                                            <div class="images_grid">
                                                {#if $updated_stock_images.length > 0}
                                                    {#each $updated_stock_images as stock_image_obj}
                                                        <div class="grid_item_wrapper">
                                                            <img class="grid_item" src={stock_image_obj.url} alt={stock_image_obj.name} />
                                                        </div>
                                                    {/each}
                                                {/if}
                                                {#if $updated_internal_storage_images.length > 0}
                                                    {#each $updated_internal_storage_images as image_obj}
                                                        <div class="grid_item_wrapper">
                                                            <img class="grid_item" src={URL.createObjectURL(image_obj)} />
                                                        </div>
                                                    {/each}
                                                {/if}
                                            </div>
                                        </div>
                                        <div class="clear_btn" on:click={clear_images}>
                                            <img src="/images/bin.png" alt="delete contents" />
                                        </div>
                                    </div>
                                    {/if}
                                    {#if $updated_internal_storage_images.length == 0 && $updated_stock_images.length == 0}
                                    <div class="thumbnails_wrapper">
                                        <div class="thumbnails_placeholder">
                                            <span>Selected images will show up here</span>
                                        </div>
                                        <div class="clear_btn" on:click={clear_images}>
                                            <img src="/images/bin.png" alt="delete contents" />
                                        </div>
                                    </div>
                                    {/if}
                                    <div class="main_edit_image_select_btns">
                                        <div class="back_btn" on:click={toggle_images_field}>
                                            <span>Back</span>
                                        </div>
                                        {#if submitting_images}
                                            <div class="upload_btn" on:click={submit_updated_images}>
                                                <div class="loader">
                                                    <div class="bar1"></div>
                                                    <div class="bar2"></div>
                                                    <div class="bar3"></div>
                                                    <div class="bar4"></div>
                                                    <div class="bar5"></div>
                                                    <div class="bar6"></div>
                                                    <div class="bar7"></div>
                                                    <div class="bar8"></div>
                                                    <div class="bar9"></div>
                                                    <div class="bar10"></div>
                                                    <div class="bar11"></div>
                                                    <div class="bar12"></div>
                                                </div>
                                            </div>
                                        {:else}
                                            <div class="upload_btn" on:click={$updated_stock_images.length > 0 || $updated_internal_storage_images.length > 0 ? submit_updated_images : ()=>{console.log('test')}}>
                                                <span>Add images</span>
                                            </div>
                                        {/if}
                                    </div>
                                    <!-- <div class="btns_wrapper">
                                        <div class="back_btn" on:click={toggle_images_field}>
                                            <span>Back</span>
                                        </div>
                                        {#if submitting_images}
                                            <div class="save_btn" on:click={submit_updated_images}>
                                                <div class="loader">
                                                    <div class="bar1"></div>
                                                    <div class="bar2"></div>
                                                    <div class="bar3"></div>
                                                    <div class="bar4"></div>
                                                    <div class="bar5"></div>
                                                    <div class="bar6"></div>
                                                    <div class="bar7"></div>
                                                    <div class="bar8"></div>
                                                    <div class="bar9"></div>
                                                    <div class="bar10"></div>
                                                    <div class="bar11"></div>
                                                    <div class="bar12"></div>
                                                </div>
                                            </div>
                                        {:else}
                                            <div class="save_btn" on:click={submit_updated_images}>
                                                <span>Save</span>
                                            </div>
                                        {/if}
                                    </div> -->
                                </div>
                            {/if}
                            {#if $show_edit_stock_images}
                                <div class="stock_image_select" transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}>
                                    <div class="stock_image_select_inner">
                                        {#each $edit_stock_images_array as stock_image}
                                            <label for={stock_image.id} class="stock_image_item" >
                                                <img class="stock_image" src={stock_image.url} alt={stock_image.name} />
                                                <input id={stock_image.id} class="item_input" type="checkbox" bind bind:group={$updated_stock_images_ids} value={stock_image.id} on:change={set_updated_stock_images_list}/>
                                                <div class="stock_image_overlay">
                                                    <img src="/images/checkmark.png" />
                                                </div>
                                            </label>
                                        {/each}
                                    </div>
                                </div>
                                <div class="edit_stock_image_back_btn">
                                    <div class="back_btn" on:click={back_to_image_input}>
                                        <span>Back</span>
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
            {#if $show_campaign_action_delete}
                <div class="campaign_action_menu_delete">
                    <div class="campaign_action_menu_delete_header">
                        <h3>Delete campaign</h3>
                        <div class="img_wrapper" on:click={back_to_action_main}>
                            <img src="/images/close.png" alt="icon" />
                        </div>
                    </div>
                    <div class="campaign_action_menu_delete_content">
                        <div class="campaign_action_menu_delete_warning">
                            <p>This action <strong>CANNOT</strong> be undone.  This will permanently delete the campaign.</p>
                        </div>
                        <div class="campaign_action_menu_delete_confirmation">
                            {#if deleting_campaign}
                                <div class="confirmation_btn" on:click={delete_campaign}>
                                    <div class="loader">
                                        <div class="bar1"></div>
                                        <div class="bar2"></div>
                                        <div class="bar3"></div>
                                        <div class="bar4"></div>
                                        <div class="bar5"></div>
                                        <div class="bar6"></div>
                                        <div class="bar7"></div>
                                        <div class="bar8"></div>
                                        <div class="bar9"></div>
                                        <div class="bar10"></div>
                                        <div class="bar11"></div>
                                        <div class="bar12"></div>
                                    </div>
                                </div>
                            {:else}
                                <div class="confirmation_btn" on:click={delete_campaign}>
                                    <span>I understand, delete this campaign</span>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</section>