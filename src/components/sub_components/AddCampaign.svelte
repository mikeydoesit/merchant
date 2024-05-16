<script>
    import { product_service_name, show_product_category_list, has_product_category, selected_product_category_to_display } from '$lib/store';

    let show_product_category_error = false

    const set_product_service_name = (e) => {
        product_service_name.set(e.target.value)
    }
    const toggle_product_category_list = (e) => {

    }
    const set_product_category = () => {

    }
</script>

<style lang="postcss">
    .add_campaign {
        @apply px-4 mt-8;
    }
    .form_item {
        @apply flex flex-col mb-8;
    }
    .form_item label {
        @apply pl-1 mb-1.5 text-sm font-semibold;
    }
    .form_item #product_service_name, .form_item #original_price {
        @apply border-2 border-border_grey py-3 px-4 rounded-md focus:outline-accent_bg;
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
</style>

<section class="add_campaign">
    <div class="form_item">
        <label for="product_service_name">Product/Service Name</label>
        <input id="product_service_name" type="text" placeholder="Enter the name of your product or service" on:click={set_product_service_name} />
    </div>
    <div class="form_item">
        <label for="product_service_image">Image(s)</label>
        <input id="product_service_image" type="file"  />
    </div><div class="form_item">
        <label for="product_category">Product/Service category </label>
        <div class="product_category_select_input_btn_wrapper">
            <div class={`product_category_select_input_btn ${$show_product_category_list ? 'border-accent_bg' : 'border-border_grey'}`} on:click={toggle_product_category_list}>
                <span class={`${$has_product_category ? 'text-black' : 'text-border_grey_four'}`}>{$selected_product_category_to_display}</span>
            </div>
            {#if $show_product_category_list}
                <ul class="product_category_list" transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}>
                    <!-- {#each Categories as category}
                    <li class="category_list_item" data-name={category.name} data-tag={category.tag} on:click={set_category}>{category.name}</li>
                    {/each} -->
                    {#each Array(9) as _}
                    <li class="product_category_list_item"  on:click={set_product_category}>List item</li>
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
    <div class="form_item">
        <label for="original_price">Original Price</label>
        <input id="original_price" type="number"  />
    </div>
</section>