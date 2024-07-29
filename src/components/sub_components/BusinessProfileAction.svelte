<script>
    import { imask } from 'svelte-imask';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import { show_business_profile, show_business_profile_action, show_logo_edit, show_business_name_edit, show_business_registration_edit, show_contact_number_edit, show_location_edit, show_opening_hours_edit, logo_url, logo_name, business_name_edit, business_registration_edit, contact_number_edit, location_edit } from '$lib/store.js'

    export let pb;
    export let merchant;
    export let locations;

    let submitting_logo = false;
    let submitting_business_name = false;
    let submitting_business_registration = false;
    let submitting_contact_number = false;
    let submitting_location = false;

    let show_business_name_error = false;
    let show_business_registration_error = false;
    let logo_input;

    const formData = new FormData();

    // iMask options
    const phone_number_options = {
		mask: '{0}000-000-000'
    };

    const hide_element = () => {
        show_business_profile_action.set(false)
        show_logo_edit.set(false)
        show_business_name_edit.set(false)
        show_business_registration_edit.set(false)
        show_contact_number_edit.set(false)
        show_location_edit.set(false)
        show_opening_hours_edit.set(false)
    }

    const set_logo = (e) => {
        logo_url.set(URL.createObjectURL(e.target.files[0]))
        logo_name.set(e.target.files[0].name)
    }
    const submit_logo = async () => {

        submitting_logo = true
        
        formData.append('logo', logo_input.files[0]);

        try {
            const record_logo = await pb.collection('merchants').update(merchant.id, formData);
            console.log(record_logo)
        } catch (error) {
            console.log(error)
        } finally {
            submitting_logo = false
            show_logo_edit.set(false)
            show_business_profile_action.set(false)
            show_business_profile.set(false)
        }

        setTimeout(() => {
            console.log('time')
            show_business_profile.set(true)
        }, 2000)
    }
    const set_business_name = (e) => {
        business_name_edit.set(e.target.value)
    }
    const submit_business_name = async () => {

        submitting_business_name = true

        formData.append('business_name', $business_name_edit)

        try {
            const record_business_name = await pb.collection('merchants').update(merchant.id, formData);
            console.log(record_business_name)
        } catch (error) {
            console.log(error)
        } finally {
            submitting_business_name = false
            show_business_name_edit.set(false)
            show_business_profile_action.set(false)
            show_business_profile.set(false)
        }
        setTimeout(() => {
            console.log('time')
            show_business_profile.set(true)
        }, 2000)
    }
    const set_business_registration = (e) => {
        business_registration_edit.set(e.target.value)
    }
    const submit_business_registration = async () => {
        submitting_business_registration = true

        formData.append('registration_number', $business_registration_edit)

        try {
            const record_business_registration = await pb.collection('merchants').update(merchant.id, formData);
            console.log(record_business_registration)
        } catch (error) {
            console.log(error)
        } finally {
            submitting_business_registration = false
            show_business_registration_edit.set(false)
            show_business_profile_action.set(false)
            show_business_profile.set(false)
        }
        setTimeout(() => {
            show_business_profile.set(true)
        }, 2000)
    }

    const set_contact_number = (e) => {
        contact_number_edit.set(e.target.value)
    }
    const submit_contact_number = async () => {
        submitting_contact_number = true

        formData.append('contact_number', $contact_number_edit)

        try {
            const record_contact_number = await pb.collection('merchants').update(merchant.id, formData);
            console.log(record_contact_number)
        } catch (error) {
            console.log(error)
        } finally {
            submitting_contact_number = false
            show_contact_number_edit.set(false)
            show_business_profile_action.set(false)
            show_business_profile.set(false)
        }
        setTimeout(() => {
            show_business_profile.set(true)
        }, 2000)
    }

    const select_location = (e) => {
        location_edit.set(e.target.value)
    }
    const submit_location = async () => {
        submitting_location = true

        if ($location_edit != '') {

            formData.append('location', $location_edit)

            try {
                const record_location = await pb.collection('merchants').update(merchant.id, formData);
            } catch (error) {
                console.log(error)
            } finally {
                submitting_location = false
                show_location_edit.set(false)
                show_business_profile_action.set(false)
                show_business_profile.set(false)
            }
            setTimeout(() => {
                show_business_profile.set(true)
            }, 2000)
        }
        submitting_location = false
    }
</script>

<style lang="postcss">
    .business_profile_action_menu {
        @apply h-screen bg-black bg-opacity-30 absolute top-0 left-0 bottom-0 right-0;
    }
    .business_profile_action_menu_inner_wrapper {
        @apply h-full w-full relative bg-transparent flex flex-col justify-end;
    }
    .business_profile_action_menu_inner {
        @apply bg-main_bg h-auto max-h-[80vh] w-full rounded-t-3xl z-20 px-8 py-8 overflow-y-scroll;
    }
    .form_item {
        @apply relative;
    }
    #logo_input, #logo_change_input, .location_list_item_input {
        @apply w-0 h-0 opacity-0 absolute;
    }
    .logo_input_btn_wrapper {
        @apply block h-fit;
    }
    .logo_input_btn, .submit_btn {
        @apply flex justify-center items-center bg-accent_bg text-main_bg py-3 rounded-lg cursor-pointer;
    }
    .logo_preview {
        @apply flex flex-row w-full mb-6 px-2 items-center;
    }
    .logo_preview img {
        @apply h-10 mr-8;
    }
    .logo_preview p {
        @apply text-black text-lg;
    }
    .btn_wrapper {
        @apply w-full flex flex-row gap-4;
    }
    .btn_wrapper .btn {
        @apply rounded-lg text-main_bg w-1/2 flex flex-row justify-center items-center py-2.5 cursor-pointer font-semibold;
    }
    .form_item #business_name, .form_item #business_registration, .form_item #contact_number {
        @apply border-2 border-border_grey py-3 px-4 rounded-md w-full focus:outline-accent_bg;
    }
    .location_list {
        @apply h-60 mb-6 border-border_grey border overflow-y-scroll rounded-lg;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    }
    .location_list_item_label {
        @apply block py-4 pl-4 hover:bg-border_grey_two focus:bg-border_grey_two;
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

<section class="business_profile_action_menu">
    <div class="business_profile_action_menu_inner_wrapper" on:click|self={hide_element}>
        <div class="business_profile_action_menu_inner" transition:slide={{ delay: 150, duration: 200, easing: quintOut, axis: 'y' }}>
            <form>
                {#if $show_logo_edit}
                    {#if $logo_name != ''}
                        <div class="logo_preview">
                            <img src={$logo_url} alt="logo_preview"/>
                            <p>{$logo_name}</p> 
                        </div>
                    {/if}
                    {#if $logo_name != ''}
                        <div class="btn_wrapper">
                            <input id="logo_change_input" type="file" on:change={set_logo} bind:this={logo_input}/>
                            <label class="btn bg-highlight_bg" for="logo_change_input">
                                <div class="logo_change_btn">
                                    <span>Change</span>
                                </div>
                            </label>
                            <div class="btn bg-accent_bg" on:click={submit_logo}>
                                {#if submitting_logo}
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
                                {:else}
                                    <span>Save</span>
                                {/if}
                            </div>
                        </div>
                    {:else}
                        <div class="form_item">
                            <input id="logo_input" type="file" on:change={set_logo} />
                            <label class="logo_input_btn_wrapper" for="logo_input">
                                <div class="logo_input_btn">
                                    <span>Select an image to use as your logo.</span>
                                </div>
                            </label>
                        </div>
                    {/if}
                {/if}
                {#if $show_business_name_edit}
                    <div class="form_item">
                        <label for="business_name">Business name</label>
                        <input 
                            type="text" 
                            id="business_name"
                            placeholder="Enter your business name" 
                            on:input={set_business_name}
                        />
                        {#if show_business_name_error}
                            <div class="business_name_error">
                                <span class="business_name_error_text">Looks like you haven't entered your name.</span>
                            </div>
                        {/if}
                    </div>
                    <div class="btn bg-accent_bg submit_btn" on:click={submit_business_name}>
                        {#if submitting_business_name}
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
                        {:else}
                            <span>Save</span>
                        {/if}
                    </div>
                {/if}
                {#if $show_business_registration_edit}
                <div class="form_item">
                    <label for="business_registration">Business registration</label>
                    <input 
                        type="text" 
                        id="business_registration"
                        placeholder="Enter your registration number" 
                        on:input={set_business_registration}
                    />
                    {#if show_business_registration_error}
                        <div class="business_registration_error">
                            <span class="business_registration_error_text">Looks like you haven't entered your business registration.</span>
                        </div>
                    {/if}
                </div>
                <div class="btn bg-accent_bg submit_btn" on:click={submit_business_registration}>
                    {#if submitting_business_registration}
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
                    {:else}
                        <span>Save</span>
                    {/if}
                </div>
                {/if}
                {#if $show_contact_number_edit}
                    <div class="form_item">
                        <label for="contact_number">Contact number</label>
                        <input 
                            id="contact_number" 
                            type="text"
                            placeholder="0555-555-555"
                            on:change={set_contact_number}
                            use:imask={phone_number_options}
                        /> 
                    </div>
                    <div class="btn bg-accent_bg submit_btn" on:click={submit_contact_number}>
                        {#if submitting_contact_number}
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
                        {:else}
                            <span>Save</span>
                        {/if}
                    </div>
                {/if}
                {#if $show_location_edit}
                    <div class="location_edit_wrapper">
                        <ul class="location_list">
                            {#each locations as location}
                                <li class="location_list_item">
                                    <input value={location.name} class="location_list_item_input" id={location.tag} type="radio" name="location" on:click={select_location} />
                                    <label class="location_list_item_label" for={location.tag}>
                                        <span>{location.name}</span>
                                    </label>
                                </li>
                            {/each}
                        </ul>
                        <div class="btn bg-accent_bg submit_btn" on:click={submit_location}>
                            {#if submitting_location}
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
                            {:else}
                                <span>Save</span>
                            {/if}
                        </div>
                    </div>
                {/if}
            </form>
        </div>
    </div>
</section>