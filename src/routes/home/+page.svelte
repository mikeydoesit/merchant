<script>
	import '../../styles/global.css'
    import { goto } from '$app/navigation';
    import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import Categories from "$lib/data/Categories"
    import WhyTesomame from "$lib/data/WhyTesomame"
    import FAQS from "$lib/data/Faqs"
    import Reasons from "$lib/data/Reasons.js"
    import { name, business_name, email, business_address, contact_number, business_website, show_category_list, show_register_form, show_login_form, en_route_to_post_ad } from "$lib/store.js"
	import Accordion from '../../components/sub_components/Accordion.svelte';
    import CTA_Card from '../../components/sub_components/CTA_Card.svelte';

    let show_name_error = false;
    let show_business_name_error = false;
    let show_business_address_error = false;
    let show_email_error = false;
    let show_business_website_error = false;
    let why_open_index = 0;
    let faq_open_index;

    const toggle_category_list = () => {
        show_category_list.set(!$show_category_list)
    }
    const toggle_why_accordion_item = (i) => {
        why_open_index = why_open_index == i ? null : i;
    }
    const toggle_faq_accordion_item = (i) => {
        faq_open_index = faq_open_index == i ? null : i;
    }
    const set_business_name = (e) => {
        business_name.set(e.target.value)
        if ($business_name.length < 1) {
            show_business_name_error = true
        } else {
            show_business_name_error = false
        }
    }
    // const set_business_address = (e) => {
    //     business_address.set(e.target.value)
    //     if ($business_address.length < 1) {
    //         show_business_address_error = true
    //     } else {
    //         show_business_address_error = false
    //     }
    // }
    const set_name = (e) => {
        let full_name = e.target.value
        name.set(full_name);
        if ($name.length < 1) {
            show_name_error = true
        } else {
            show_name_error = false
        }
    }
    const set_contact_number = (e) => {
        contact_number.set(e.target.value)
    }
    const validate_email = (e) => {
        let email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email_pattern.test(e.target.value)) {
            show_email_error = true
        } else {
            show_email_error = false
        }
    }
    const set_email = (e) => {
        email.set(e.target.value)
        validate_email(e)
    }
    const set_business_website = (e) => {
        business_website.set(e.target.value)
        if ($business_website.length < 1) {
            show_business_website_error = true
        } else {
            show_business_website_error = false
        }
    }

    const complete_registration = () => {
        console.log('hi')
        show_login_form.set(false)
        show_register_form.set(true)
        en_route_to_post_ad.set(true)
        goto('/auth')
    }
    // const set_category = (e) => {
    //     selected_category_to_display.set(e.target.dataset.name)
    //     selected_category.set(e.target.dataset.tag)
    //     has_category.set(true)
    //     show_category_error = false

    //     category_obj = Categories.find((element) => {
    //         return element.name == $selected_category_to_display
    //     })

    //     sub_categories = category_obj.sub_categories
    //     toggle_category_list();
    // }
</script>
<style lang="postcss">
    .home {
        @apply px-4 pt-8 flex-col flex gap-8;
    }
    .home .h1 {
        @apply text-4xl font-black;
    }
    .home .p {
        @apply font-light mt-6;
    }
    .home_signup {
        @apply mt-6;
    }
    .form_item {
        @apply flex flex-col mb-3;
    }
    .form_item label {
        @apply pl-1 mb-1.5 text-sm font-semibold;
    }
    .form_item h6 {
        @apply pl-1 mb-4 text-sm font-semibold;
    }
    .form_item #business_name, .form_item #business_address, .form_item #name, .form_item #phone_number, .form_item #email_address, .form_item #website_social, .form_item #business_desc {
        @apply border-2 border-border_grey py-3 px-4 rounded-md focus:outline-accent_bg;
    }
    .category_select_input_btn_wrapper {
        @apply relative;
    }
    .category_select_input_btn {
        @apply border-2 py-3 px-4 rounded-md;
    }
    .category_list {
        @apply absolute bottom-full mt-2 z-10 bg-main_bg w-full h-40 rounded-md overflow-y-scroll;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    }
    .category_list_item {
        @apply py-3 px-4 hover:bg-border_grey_two;
    }
    .btn_wrapper {
        @apply mt-6;
    }
    .btn_wrapper p {
        @apply text-xs px-2 text-text_primary font-thin;
    }
    .form_item.next_btn {
        @apply bg-accent_bg py-4 rounded-md text-white font-bold text-lg cursor-pointer flex justify-center items-center mt-3;
    }
    .accordion_wrapper, .faqs {
        @apply my-7;
    }
    .cta_cards {
        @apply flex flex-col gap-6 mt-7;
    }
    .card_wrapper {
        @apply py-4 px-6;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }
</style>
<div class="home">
    <div class="card_wrapper">
        <h1 class="h1">Put Your Business in the Spotlight it Deserves</h1>
        <p class="p">Draw in new clients on the platform for unique local experiences and premium services.</p>
        <div class="home_signup">
            <div class="form_item">
                <label for="business_name">Business Name</label>
                <input id="business_name" type="text" placeholder="Enter the name of your business" on:input={set_business_name} />
            </div>
            <!-- <div class="form_item">
                <label for="business_address">Business Address</label>
                <input id="business_address" type="text" placeholder="Enter your address" on:input={set_business_address} />
            </div> -->
            <div class="form_item">
                <label for="name">Name</label>
                <input id="name" type="text" placeholder="Enter your first and last name" on:input={set_name} />
            </div>
            <div class="form_item">
                <label for="phone_number">Phone Number</label>
                <input id="phone_number" type="tel" placeholder="Enter your phone number" on:input={set_contact_number}  />
            </div>
            <div class="form_item">
                <label for="email_address">Email Address</label>
                <input id="email_address" type="email" placeholder="Enter your email address" on:input={set_email} />
            </div>
            <div class="form_item">
                <label for="website_social">Website/Social Media</label>
                <input id="website_social" type="text" placeholder="Enter your website or social media page" on:input={set_business_website} />
            </div>
            <!-- <div class="form_item">
                <label for="category">Category of Business</label>
                <div class="category_select_input_btn_wrapper">
                    <div class={`category_select_input_btn ${$show_category_list ? 'border-accent_bg' : 'border-border_grey'}`} on:click={toggle_category_list}>
                        <span class={`${$has_category ? 'text-black' : 'text-border_grey_four'}`}>{$selected_category_to_display}</span>
                    </div>
                    {#if $show_category_list}
                        <ul class="category_list" transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}>
                            {#each Categories as category}
                            <li class="category_list_item" data-name={category.name} data-tag={category.tag} on:click={set_category}>{category.name}</li>
                            {/each}
                        </ul>
                    {/if}
                </div>
                {#if show_category_error}
                    <div class="category_error" transition:slide={{ delay: 50, duration: 150, easing: quintOut, axis: 'y' }}>
                        <span class="category_error_text">Looks like you haven't selected a category</span>
                    </div>
                {/if}
            </div> -->
            <div class="btn_wrapper">
                <p>By clicking below, I agree to the Terms of Use and that I have read the Privacy Statement.</p>
                <div class="form_item next_btn" on:click={complete_registration}>
                    <span>Next</span>
                </div>
            </div>
        </div>
    </div>
    <div class="card_wrapper">
        <h1 class="h1">Why Promote Your Business on Tesomame</h1>
        <section class="accordion_wrapper">
            {#each WhyTesomame as item, index}
                <Accordion
                    title={item.title}
                    content={item.content}
                    is_open={why_open_index == index}
                    on:click={() => toggle_why_accordion_item(index)}
                />
            {/each}
        </section>
        <div class="form_item next_btn">
            <span>Try for Free</span>
        </div>
    </div>
    <div class="card_wrapper">
        <h1 class="h1 mt-7">How Does Tesomame Work For Businesses?</h1>
        <section class="cta_cards">
            {#each Reasons as item}
                <CTA_Card 
                    img_url={item.image}
                    text={item.content}
                    title={item.title}
                />
            {/each}
        </section>
    </div>
    <div class="card_wrapper">
        <h1 class="h1">Frequently Asked Questions</h1>
        <section class="faqs">
            {#each FAQS as faq, index}
                <Accordion 
                    title={faq.question}
                    content={faq.answer}
                    split_content
                    is_open={faq_open_index == index}
                    on:click={() => toggle_faq_accordion_item(index)}
                />
            {/each}
        </section>
    </div>
</div>