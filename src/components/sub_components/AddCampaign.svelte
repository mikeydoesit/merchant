<script>
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { createApi } from 'unsplash-js';
    import { PUBLIC_UNSPLASH_ACCESS_KEY } from '$env/static/public';
    import SectionTitle from './SectionTitle.svelte'
    import { product_service_name, show_product_category_list, has_product_category, selected_product_category_to_display, original_price, discount_type, discount_percentage, show_add_campaign_page_one, show_add_campaign, show_campaigns_menu, show_add_campaign_page_two, show_stock_images, stock_images, stock_images_array, show_percent_slider, selected_stock_images, selected_stock_images_ids, selected_internal_storage_images } from '$lib/store';
	import SelectedImageList from './SelectedImageList.svelte';

    export let sub_category_list = [];
    export let pb = {};
    export let merchant_id = '';
    export let merchant_category = '';

    let show_product_category_error = false
    let uploading_images = false
    let publishing_campaign = false
    const new_campaign = new FormData();

    // UNSPLASH INSTANCE

    const unsplash = createApi({
        accessKey: PUBLIC_UNSPLASH_ACCESS_KEY
    });
    const search_unsplash = () => {
        show_add_campaign_page_one.set(false)
        show_add_campaign_page_two.set(false)
        show_stock_images.set(true)
        unsplash.search.getPhotos({
            query: $selected_product_category_to_display,
            per_page: 30
        }).then(result => {
            if(result.type == 'success') {
                stock_images.set(result.response.results)
                stock_images_array.set($stock_images.map((item) => {
                    return {
                        id: item.id,
                        name: item.alt_description,
                        url: item.urls.regular
                    }
                }))
                console.log($stock_images_array)
            }
        });
    }
    const set_selected_stock_images_list = () => {
        selected_stock_images.set($selected_stock_images_ids.map((id) => {
            return $stock_images_array.find(image => image.id === id)
        }))
    }
    const set_selected_internal_storage_images = (e) => {
        selected_internal_storage_images.set(e.target.files)
        console.log($selected_internal_storage_images)
    }

    const append_stock_images_to_form_data = () => {
        show_stock_images.set(false)
        show_add_campaign_page_one.set(false)
        show_add_campaign_page_two.set(true)
    }
    const back_to_campaign_page_two = () => {
        selected_stock_images_ids.set([])
        selected_stock_images.set([])
        show_stock_images.set(false)
        show_add_campaign_page_one.set(false)
        show_add_campaign_page_two.set(true)
    }


    const go_to_add_campaign_page_two = () => {
        show_add_campaign_page_one.set(false)
        show_add_campaign_page_two.set(true)
    }

    const set_product_service_name = (e) => {
        product_service_name.set(e.target.value)
    }
    const set_original_price = (e) => {
        original_price.set(e.target.value)
    }
    const toggle_product_category_list = () => {
        show_product_category_list.set(!$show_product_category_list)
    }
    const set_product_category = (e) => {
        selected_product_category_to_display.set(e.target.dataset.name)
        has_product_category.set(true)
        show_product_category_error = false
        toggle_product_category_list()
    }
    const set_discount_type = (e) => {

        discount_type.set(e.target.value)

        if(e.target.value == 'BOGOF') {
            show_percent_slider.set(false)
        } else {
            show_percent_slider.set(true)
        }
    }
    const set_discount_percentage = (e) => {
        discount_percentage.set(e.target.value)
    }


    const save_campaign_to_drafts = async () => {
            try {
                new_campaign.append('product_name', $product_service_name)
                new_campaign.append('merchant', merchant_id)
                new_campaign.append('original_price', $original_price)
                new_campaign.append('discount_type', $discount_type)
                if($discount_type != 'BOGOF') {
                    new_campaign.append('discount_value', $discount_percentage)
                }
                new_campaign.append('sub_category', $selected_product_category_to_display)
                new_campaign.append('parent_category', merchant_category)
                new_campaign.append('is_active', false)

                const record = await pb.collection('campaigns').create(new_campaign);

                sessionStorage.setItem('id', record.id)

                go_to_add_campaign_page_two()

            } catch(error) {
                console.log(error)
            }

    }
    const upload_images = async () => {
        
        uploading_images = true
        
        new_campaign.append('stock_images', JSON.stringify($selected_stock_images));
        
        for (let file of $selected_internal_storage_images) {
            new_campaign.append('images', file);
        }
        console.log($selected_stock_images)

        let campaign_id = sessionStorage.getItem('id')

        try {
            const record = await pb.collection('campaigns').update(campaign_id, new_campaign);
            console.log(record)

            if(!record.code) {
                selected_stock_images.set([])
                selected_internal_storage_images.set([])
            }

        } catch (error) {
            console.log(error)
        } finally {
            uploading_images = false
        }
    }
    const publish_campaign = async () => {

        publishing_campaign = true

        new_campaign.append('is_active', true);
        let campaign_id = sessionStorage.getItem('id')

        try {
            const record = await pb.collection('campaigns').update(campaign_id, new_campaign);
        } catch (error) {
            console.log(error)
        } finally {
            publishing_campaign = false
            show_add_campaign.set(false)
            show_campaigns_menu.set(true)
        }
    }
</script>

<style lang="postcss">
    .add_campaign {
        @apply px-4 mt-8 pb-8;
    }
    .form_item {
        @apply flex flex-col mb-8;
    }
    .form_item label {
        @apply pl-1 mb-1.5 text-sm font-semibold;
    }
    .form_item h6 {
        @apply pl-1 mb-4 text-sm font-semibold;
    }
    .form_item #product_service_name, .form_item #original_price {
        @apply border-2 border-border_grey py-3 px-4 rounded-md focus:outline-accent_bg;
    }
    .form_item.next_btn {
        @apply bg-accent_bg py-4 rounded-md text-white font-bold text-lg cursor-pointer flex justify-center items-center;
    }
    .discount_select {
        @apply flex flex-row gap-2 justify-evenly;
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
    .product_category_select_input_btn_wrapper, .location_select_input_btn_wrapper {
        @apply relative;
    }
    .product_category_select_input_btn, .location_select_input_btn {
        @apply border-2 py-3 px-4 rounded-md;
    }
    .product_category_list, .location_list {
        @apply absolute top-full mt-2 z-10 bg-main_bg w-full h-40 rounded-md overflow-y-scroll;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    }
    .product_category_list_item, .location_list_item {
        @apply py-3 px-4 hover:bg-border_grey_two;
    }

    .image_uploader_wrapper {
        @apply flex flex-col items-center;
    }
    #image_uploader_btn {
        @apply h-0 w-0 opacity-0 absolute;
    }
    .image_uploader {
        @apply flex justify-center items-center relative border-4 border-[#606061] rounded-2xl border-dashed w-full py-6;
    }
    .image_uploader label {
        @apply flex flex-col justify-center items-center;
    }
    .image_uploader .upload_icon {
        @apply h-16 w-16;
    }
    .image_uploader .text {
        @apply my-4 text-sm font-semibold text-border_grey_four;
    }
    .image_uploader_wrapper .mid_text {
        @apply my-5 font-semibold text-border_grey_four;
    }
    .internal_storage_btn, .stock_image_btn {
        @apply bg-accent_bg text-white px-8 py-3 rounded-lg font-semibold;
    }
    .stock_image_select {
        @apply h-[70vh] overflow-y-scroll;
    }
    .stock_image_select_inner {
        @apply w-full gap-4;
        column-count: 2;
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
    .stock_image_select_btns, .image_upload_select_btns {
        @apply mt-6 flex flex-row w-full gap-4 mb-12;
    }
    .stock_image_select_btns .back_btn, .stock_image_select_btns .upload_btn, .image_upload_select_btns .upload_btn, .image_upload_select_btns .publish_btn {
        @apply w-1/2 bg-accent_bg flex justify-center items-center text-main_bg font-semibold py-3 rounded-lg cursor-pointer hover:bg-accent_bg/80;
    }
     /* Slider CSS */
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

    /* Button loader */

    .loader {
        position: relative;
        width: 30px;
        height: 30px;
        border-radius: 10px;
    }

    .loader div {
        width: 8%;
        height: 24%;
        background: rgb(255, 255, 255);
        position: absolute;
        left: 50%;
        top: 30%;
        opacity: 0;
        border-radius: 50px;
        box-shadow: 0 0 3px rgba(0,0,0,0.2);
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

<section class="add_campaign">
    {#if $show_add_campaign_page_one}
        <div class="form_item">
            <label for="product_service_name">Product/Service Name</label>
            <input id="product_service_name" type="text" placeholder="Enter the name of your product or service" on:input={set_product_service_name} />
        </div>
        <div class="form_item">
            <label for="original_price">Original Price</label>
            <input id="original_price" type="number" placeholder="0.00" on:input={set_original_price}/>
        </div>
        <div class="form_item">
            <h6>Discount</h6>
            <div class="discount_select">
                <div class="discount_type_wrapper">
                    <input id="bogof" type="radio" name="discount_type" bind:group={$discount_type} value="BOGOF" on:click={set_discount_type}/>
                    <div class="cell-bg"></div>
                    <label for="bogof">Buy one get one free</label>
                </div>
                <div class="discount_type_wrapper">
                    <input id="percent" type="radio" name="discount_type" bind:group={$discount_type} value="Percentage" on:click={set_discount_type}/>
                    <div class="cell-bg"></div>
                    <label for="percent">Percentage</label>
                </div>
            </div>
            {#if $show_percent_slider}
                <div class="percent_slider" transition:fade>
                    <div class="PB-range-slider-div">
                        <input type="range" step="5" min="5" max="100" class="PB-range-slider" id="myRange" bind:value={$discount_percentage} on:change={set_discount_percentage}>
                        <p class="PB-range-slidervalue">{$discount_percentage} %</p>
                    </div>
                </div>
            {/if}
        </div>
        <div class="form_item">
            <label for="product_category">Product/Service category </label>
            <div class="product_category_select_input_btn_wrapper">
                <div class={`product_category_select_input_btn ${$show_product_category_list ? 'border-accent_bg' : 'border-border_grey'}`} on:click={toggle_product_category_list}>
                    <span class={`${$has_product_category ? 'text-black' : 'text-border_grey_four'}`}>{$selected_product_category_to_display}</span>
                </div>
                {#if $show_product_category_list}
                    <ul class="product_category_list" transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}>
                        {#each sub_category_list as list_item}
                        <li class="product_category_list_item" data-name={list_item} on:click={set_product_category}>{list_item}</li>
                        {/each}
                    </ul>
                {/if}
            </div>
            {#if show_product_category_error}
                <div class="product_category_error" transition:slide={{ delay: 50, duration: 150, easing: quintOut, axis: 'y' }}>
                    <span class="product_category_error_text">Looks like you haven't selected a category</span>
                </div>
            {/if}
        </div>
    {/if}
    {#if $show_add_campaign_page_two}
        <div class="image_uploader_wrapper">
            <div class="image_uploader">
                <input id="image_uploader_btn" type="file" on:input={set_selected_internal_storage_images} multiple />
                <label for="image_uploader_btn">
                    <img class="upload_icon" src="/images/upload.png" alt="upload"/>
                    <span class="text">Upload from</span>
                    <div class="internal_storage_btn">
                        <span>Internal storage</span>
                    </div>
                </label>
            </div>
            <span class="mid_text">-OR-</span>
            <div class="stock_image_btn" on:click={search_unsplash}>
                <span>Stock images</span>
            </div>
        </div>
    {/if}
    {#if $show_add_campaign_page_one}
        <div class="form_item next_btn" on:click={save_campaign_to_drafts}>
            <span>Next</span>
        </div>
    {/if}
    {#if $show_stock_images}
        <div class="stock_image_select" transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}>
            <div class="stock_image_select_inner">
                {#each $stock_images_array as stock_image}
                    <label for={stock_image.id} class="stock_image_item" >
                        <img class="stock_image" src={stock_image.url} alt={stock_image.name} />
                        <input id={stock_image.id} class="item_input" type="checkbox" bind bind:group={$selected_stock_images_ids} value={stock_image.id} on:change={set_selected_stock_images_list}/>
                        <div class="stock_image_overlay">
                            <img src="/images/checkmark.png" />
                        </div>
                    </label>
                {/each}
            </div>
        </div>
        <div class="stock_image_select_btns">
            <div class="back_btn" on:click={back_to_campaign_page_two}>
                <span>Back</span>
            </div>
            <div class="upload_btn" on:click={append_stock_images_to_form_data}>
                <span>Add images</span>
            </div>
        </div>
    {/if}
    {#if $selected_stock_images.length > 0 || $selected_internal_storage_images.length > 0}
        <SectionTitle
            title={'Files'}
        />
        <SelectedImageList />
    {/if}
    {#if $show_add_campaign_page_two}
    <div class="image_upload_select_btns">
        {#if uploading_images}
            <div class="upload_btn">
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
        <div class="upload_btn" on:click={upload_images}>
            <span>Upload files</span>
        </div>
        {/if}
        {#if publishing_campaign}
            <div class="publish_btn">
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
        <div class="publish_btn" on:click={publish_campaign}>
            <span>Publish</span>
        </div>
        {/if}
    </div>
    {/if}
</section>