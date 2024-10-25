<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { show_campaign_action, show_active_campaigns, show_draft_campaigns } from '$lib/store.js'

    

    export let merchant = '';
    export let pb = {}
    const new_campaign = new FormData();

    
    const publish_campaign =  async (id) => {

        
        // Get campaign_length to calculate expiration date

        try {
            const get_record = await pb.collection('campaigns').getOne(id);

            let campaign_length = get_record.campaign_length
            let today = new Date();
            let campaign_duration


            if (campaign_length == 'Day') {
                campaign_duration = 24 * 60 * 60 * 1000

            } else if(campaign_length == '3 days') {
                campaign_duration = 72 * 60 * 60 * 1000

            } else if(campaign_length == 'Week') {
                campaign_duration = 168 * 60 * 60 * 1000
                
            } else if(campaign_length == '2 weeks') {
                campaign_duration = 336 * 60 * 60 * 1000

            } else if(campaign_length == 'Month') {
                campaign_duration = 730 * 60 * 60 * 1000
            }

            let expiration_date = new Date(today.getTime() + campaign_duration)
            let formatted_expiration_date = expiration_date.toISOString().replace('T', ' ')

            new_campaign.append('is_active', true);
            new_campaign.append('expiration_date', formatted_expiration_date)

            try {
                const updated_record = await pb.collection('campaigns').update(id, new_campaign);
            } catch (error) {
                console.log(error)
            }
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
        @apply px-4 mt-8 flex flex-col gap-4;
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

    .no_campaigns {
        @apply h-80 w-full flex flex-col justify-center items-center;
    }
    .no_campaigns img {
        @apply h-14;
    }
    .no_campaigns h3 {
        @apply font-bold text-xl mb-1.5 mt-3 text-black;
    }
    .no_campaigns p {
        @apply text-sm text-black;
    }

    /* Looader styles */
    .spinner_wrapper {
        @apply flex justify-center items-center relative w-full h-80;
    }
    .spinner {
        font-size: 28px;
        position: relative;
        display: inline-block;
        width: 1em;
        height: 1em;
    }

    .spinner.center {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .spinner .spinner-blade {
        position: absolute;
        left: 0.4629em;
        bottom: 0;
        width: 0.074em;
        height: 0.2777em;
        border-radius: 0.0555em;
        background-color: transparent;
        -webkit-transform-origin: center -0.2222em;
        -ms-transform-origin: center -0.2222em;
        transform-origin: center -0.2222em;
        animation: spinner-fade9234 1s infinite linear;
    }

    .spinner .spinner-blade:nth-child(1) {
        -webkit-animation-delay: 0s;
        animation-delay: 0s;
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    .spinner .spinner-blade:nth-child(2) {
        -webkit-animation-delay: 0.083s;
        animation-delay: 0.083s;
        -webkit-transform: rotate(30deg);
        -ms-transform: rotate(30deg);
        transform: rotate(30deg);
    }

    .spinner .spinner-blade:nth-child(3) {
        -webkit-animation-delay: 0.166s;
        animation-delay: 0.166s;
        -webkit-transform: rotate(60deg);
        -ms-transform: rotate(60deg);
        transform: rotate(60deg);
    }

    .spinner .spinner-blade:nth-child(4) {
        -webkit-animation-delay: 0.249s;
        animation-delay: 0.249s;
        -webkit-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    .spinner .spinner-blade:nth-child(5) {
        -webkit-animation-delay: 0.332s;
        animation-delay: 0.332s;
        -webkit-transform: rotate(120deg);
        -ms-transform: rotate(120deg);
        transform: rotate(120deg);
    }

    .spinner .spinner-blade:nth-child(6) {
        -webkit-animation-delay: 0.415s;
        animation-delay: 0.415s;
        -webkit-transform: rotate(150deg);
        -ms-transform: rotate(150deg);
        transform: rotate(150deg);
    }

    .spinner .spinner-blade:nth-child(7) {
        -webkit-animation-delay: 0.498s;
        animation-delay: 0.498s;
        -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    .spinner .spinner-blade:nth-child(8) {
        -webkit-animation-delay: 0.581s;
        animation-delay: 0.581s;
        -webkit-transform: rotate(210deg);
        -ms-transform: rotate(210deg);
        transform: rotate(210deg);
    }

    .spinner .spinner-blade:nth-child(9) {
        -webkit-animation-delay: 0.664s;
        animation-delay: 0.664s;
        -webkit-transform: rotate(240deg);
        -ms-transform: rotate(240deg);
        transform: rotate(240deg);
    }

    .spinner .spinner-blade:nth-child(10) {
        -webkit-animation-delay: 0.747s;
        animation-delay: 0.747s;
        -webkit-transform: rotate(270deg);
        -ms-transform: rotate(270deg);
        transform: rotate(270deg);
    }

    .spinner .spinner-blade:nth-child(11) {
        -webkit-animation-delay: 0.83s;
        animation-delay: 0.83s;
        -webkit-transform: rotate(300deg);
        -ms-transform: rotate(300deg);
        transform: rotate(300deg);
    }

    .spinner .spinner-blade:nth-child(12) {
        -webkit-animation-delay: 0.913s;
        animation-delay: 0.913s;
        -webkit-transform: rotate(330deg);
        -ms-transform: rotate(330deg);
        transform: rotate(330deg);
    }

    @keyframes spinner-fade9234 {
        0% {
            background-color: #69717d;
        }

        100% {
            background-color: transparent;
        }
    }
</style>

<section class="campaign_preview_lg" transition:slide={{ delay: 0, duration: 200, easing: quintOut, axis: 'x' }} >
        {#await get_campaign_list}
        <div class="spinner_wrapper">
            <div class="spinner center">
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
            </div>
        </div>
        {:then campaign_list}
            {#if campaign_list.length == 0}
                <div class="no_campaigns">
                    <img src="/images/campaign_icon_blue.png" alt="campaign_icon"/>
                    <h3>No Campaigns</h3>
                    <p>Campaigns you create will show up here</p>
                </div>
            {:else}
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
                            <div class="main_action_btn"  on:click={$show_active_campaigns ? "" : publish_campaign(campaign.id)} data-campaign_id={campaign.id}>
                                {#if $show_active_campaigns}
                                    <a href={`https://tesomame.com/product/${campaign.id}`} target="_blank">View</a>
                                {:else if $show_draft_campaigns}
                                    <span>Publish</span>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/each}
            {/if}
        {/await}
</section>