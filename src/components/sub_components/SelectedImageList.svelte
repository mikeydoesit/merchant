<script>
    import { selected_stock_images_ids, selected_stock_images, selected_internal_storage_images } from '$lib/store'

    $: selected_stock_images_list = $selected_stock_images
    $: selected_internal_storage_images_list = $selected_internal_storage_images
</script>

<style lang="postcss">
    .selected_images_list {
        @apply px-4 mt-6 w-full;
    }
    .selected_image_item {
        @apply flex flex-row justify-start items-center mb-8 w-full; 
    }
    .icon_wrapper {
        @apply h-auto w-12 mr-6;
    }
    .icon_wrapper img {
        @apply h-full w-full object-contain;
    }
    .selected_image_item p {
        @apply w-[-webkit-fill-available] text-sm mr-6 text-wrap;
        word-break: break-all;
        white-space: normal;
    }
</style>

<ul class="selected_images_list">
    {#each selected_stock_images_list as image}
        <li class="selected_image_item">
            <div class="icon_wrapper">
                <img src="/images/image_file.png" alt="file icon" />
            </div>
            <p>{image.name}</p>
        </li>
    {/each}
    {#each selected_internal_storage_images_list as image}
        <li class="selected_image_item">
            <div class="icon_wrapper">
                <img src="/images/image_file.png" alt="file icon" />
            </div>
            <p>{image.name}</p>
        </li>
    {/each}
</ul>