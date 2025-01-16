<script>
    const set_selected_internal_storage_images = () => {

    }
</script>

<style lang="postcss">
    .image_uploader_wrapper {
        @apply flex flex-col items-center;
    }
    #image_uploader_btn {
        @apply h-0 w-0 opacity-0 absolute;
    }
    .image_uploader {
        @apply flex justify-center items-center relative rounded-2xl w-full py-6;
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
</style>

<div class="image_uploader_wrapper">
    <div class="image_uploader">
        <input id="image_uploader_btn" type="file" on:input={set_selected_internal_storage_images} multiple />
        <label for="image_uploader_btn">
            <img class="upload_icon" src="/images/upload.png" alt="upload"/>
        </label>
    </div>
</div>