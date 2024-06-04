<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { show_campaign_action, show_active_campaigns, show_draft_campaigns } from '$lib/store.js'

    

    export let merchant = '';
    export let pb = {}
    const new_campaign = new FormData();

    const edit_campaign = () => {
        console.log('edit')
    }
    const publish_campaign =  async (id) => {

        new_campaign.append('is_active', true);

        try {
            const record = await pb.collection('campaigns').update(id, new_campaign);
        } catch (error) {
            console.log(error)
        } finally {
            set_campaign_list()
            show_draft_campaigns.set(false)
            show_active_campaigns.set(true)
        }
    }

    const set_campaign_list = async () => {
        try {
            const draft_result_list = await pb.collection('campaigns').getList(1, 50, {
                filter: `is_active = false && merchant = "${merchant.id}"`,
                expand: 'merchant'
            })
            const active_result_list = await pb.collection('campaigns').getList(1, 50, {
                filter: `is_active = true && merchant = "${merchant.id}"`,
                expand: 'merchant'
            })

            if(draft_result_list && $show_draft_campaigns) {
                return draft_result_list.items
            } else if(active_result_list && $show_active_campaigns) {
                return active_result_list.items
            }
        } catch (error) {
            console.log(error)
        }
    }
    let get_campaign_list = set_campaign_list()
    

    const toggle_campaign_action_menu = (e) => {
        sessionStorage.setItem("selected_campaign", e.target.dataset.selected_campaign)
        show_campaign_action.set(true)
    }
    const formatDate = (dateString) => {
        let locale = Intl.DateTimeFormat().resolvedOptions().locale;
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(locale, options);
    }
</script>

<style lang="postcss">
    .campaign_preview_lg {
        @apply px-4 mt-8;
    }
    .card {
        @apply border border-border_grey py-4 px-6 rounded-lg;
    }
    .card_heading {
        @apply flex flex-row items-center justify-between mb-4;
    }
    .card_heading .status_label {
        @apply bg-accent_bg bg-opacity-30 px-3 py-1 rounded-lg flex justify-center items-center;
    }
    .card_heading .status_label span {
        @apply font-medium text-black text-sm;
    }
    .card_heading .img_wrapper {
        @apply h-5 w-5 cursor-pointer;
    }
    .card_heading .img_wrapper img {
        @apply pointer-events-none;
    }
    .card_main h4 {
        @apply font-semibold mb-1;
    }
    .card_main .edit_date {
        @apply text-sm;
    }
    .card_footer {
        @apply mt-5;
    }
    .main_action_btn {
        @apply border-2 border-border_grey rounded-full w-fit px-4 py-2 ease-in-out duration-300 cursor-pointer flex items-center justify-center hover:border-accent_bg;
    }
    .main_action_btn span {
        @apply text-sm;
    }
</style>

<section class="campaign_preview_lg" transition:slide={{ delay: 0, duration: 200, easing: quintOut, axis: 'x' }} >
        {#await get_campaign_list}
            <p>...waiting</p>
        {:then campaign_list}
            {#each campaign_list as campaign}
                <div class="card" transition:slide={{ delay: 0, duration: 200, easing: quintOut, axis: 'x' }} >
                    <div class="card_heading">
                        <div class="status_label">
                            {#if $show_active_campaigns}
                                <span>Active</span>
                            {:else if $show_draft_campaigns}
                                <span>Draft</span>
                            {/if}
                        </div>
                        <div class="img_wrapper" on:click={toggle_campaign_action_menu} data-selected_campaign={campaign.id}>
                            <img src="/images/more_dots.png" alt="icon"/>
                        </div>
                    </div>
                    <div class="card_main">
                        <h4>{campaign.product_name} ({campaign.sub_category}) - {campaign.expand.merchant.business_name}</h4>
                        <span class="edit_date">Last modified on: {formatDate(campaign.updated)}</span>
                    </div>
                    <div class="card_footer">
                        <div class="main_action_btn" on:click={$show_active_campaigns ? edit_campaign(campaign.id) : publish_campaign(campaign.id)} data-campaign_id={campaign.id}>
                            {#if $show_active_campaigns}
                                <span>Edit</span>
                            {:else if $show_draft_campaigns}
                                <span>Publish</span>
                            {/if}
                        </div>
                    </div>
                </div>
            {/each}
        {/await}
</section>