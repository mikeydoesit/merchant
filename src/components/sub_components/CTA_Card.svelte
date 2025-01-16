<script>
    export let img_url
    export let text
    export let title
</script>

<style lang="postcss">
    .cta_card_inner {
        @apply flex flex-col border-[1px] border-[#e2e2e4] rounded-xl p-6 gap-1 text-text_primary;
    }
    .cta_card_inner .img_wrapper {
        @apply bg-border_grey_two w-full flex items-center justify-center rounded-xl py-2;
    }
    .cta_card_inner h3 {
        @apply text-lg font-semibold mt-4;
    }
    .cta_card_inner p {
        @apply text-justify;
    }
</style>

<div class="cta_card_inner">
    <div class="img_wrapper">
        <img src={`/images/${img_url}`} alt="tesomame" />
    </div>
    <h3>{title}</h3>
    <p>{text}</p>
</div>