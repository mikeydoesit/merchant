<script>
    import { show_registration_success, show_login_form, show_register_form, show_category_list, show_location_list, selected_category, has_category, selected_location, has_location, selected_category_to_display, selected_location_to_display, register_page_one, register_page_two, register_page_three, name, business_name, business_registration_number, email, password, confirmed_password } from '$lib/store.js';
    import Categories from '$lib/data/Categories.js';
    import accra_locations from '$lib/data/Accra_locations.js'
    import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

    export let pb;

    let submitting_registration = false

    let show_category_error =  false;
    let show_location_error = false;

    let show_name_error = false;
    let show_business_name_error = false;
    let show_business_registration_number_error = false;
    let show_email_error = false
    let show_password = false;
    let show_confirm_password = false;
    let show_confirm_password_error = false

    let password_input_wrapper, password_input, confirm_password_wrapper, confirm_password;

    let category_obj = {};
    let sub_categories = [];

    const go_to_register_page_two = () => {
        if($name.length < 1) {
            show_name_error = true
        } else {
            show_name_error = false
        }
        if($business_name.length < 1) {
            show_business_name_error = true
        } else {
            show_business_name_error = false
        }
        if($business_registration_number.length < 1) {
            show_business_registration_number_error = true
        } else {
            show_business_registration_number_error = false
        }
        if($has_location == false) {
            show_location_error = true
        } else {
            show_location_error = false
        }
        if($has_location && $business_registration_number.length >= 1 && $business_name.length >= 1 && $name.length >= 1) {
            register_page_one.set(false)
            register_page_two.set(true)
        }
    }
    const go_to_register_page_three = () => {
        if($has_category == false) {
            show_category_error = true
        } else {
            show_category_error = false
        }
    }
    const toggle_category_list = () => {
        show_category_list.set(!$show_category_list)
    }
    const toggle_location_list = () => {
        show_location_list.set(!$show_location_list)
    }

    const set_name = (e) => {
        let full_name = e.target.value
        name.set(full_name.split(' ').join(''));
        if ($name.length < 1) {
            show_name_error = true
        } else {
            show_name_error = false
        }
    }
    const set_business_name = (e) => {
        business_name.set(e.target.value)
        if ($business_name.length < 1) {
            show_business_name_error = true
        } else {
            show_business_name_error = false
        }
    }
    const set_category = (e) => {
        selected_category_to_display.set(e.target.dataset.name)
        selected_category.set(e.target.dataset.tag)
        has_category.set(true)
        show_category_error = false

        category_obj = Categories.find((element) => {
            return element.name == $selected_category_to_display
        })

        sub_categories = category_obj.sub_categories
        toggle_category_list();
    }

    const set_sub_categories_selected = () => {

    }

    const set_location = (e) => {
        selected_location_to_display.set(e.target.dataset.name)
        selected_location.set(e.target.dataset.tag)
        has_location.set(true)
        show_location_error = false
        toggle_location_list();
    }
    const set_business_registration_number = (e) => {
        business_registration_number.set(e.target.value)
        if ($business_registration_number.length < 1) {
            show_business_registration_number_error = true
        } else {
            show_business_registration_number_error = false
        }
    }
    const set_email = (e) => {
        email.set(e.target.value)
        validate_email(e)
    }
    const set_password = (e) => {
        password.set(e.target.value)
    }
    const set_confirm_password = (e) => {
        confirmed_password.set(e.target.value)
        check_password_match(e)
    }
    const check_password_match = (e) => {
        if($password == e.target.value) {
            show_confirm_password_error = false
        } else {
            show_confirm_password_error = true
        }
    }

    const focus_in_password = () => {
        password_input_wrapper.style.borderColor = '#0081AF';
    }
    const focus_out_password = () => {
        password_input_wrapper.style.borderColor = '#cbd5e1';
    }
    const focus_in_confirm_password = () => {
        confirm_password_wrapper.style.borderColor = '#0081AF';
    }
    const focus_out_confirm_password = () => {
        confirm_password_wrapper.style.borderColor = '#cbd5e1';
    }

    // Password visibility
    const toggle_password_visibilty = () => {
        show_password = !show_password
        if (password_input.type === "password") {
            password_input.type = "text";
        } else {
            password_input.type = "password";
        }
    }
    const toggle_confirm_password_visibilty = () => {
        show_confirm_password = !show_confirm_password
        if (confirm_password.type === "password") {
            confirm_password.type = "text";
        } else {
            confirm_password.type = "password";
        }
    }

    // Validation

    const validate_email = (e) => {
        let email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email_pattern.test(e.target.value)) {
            show_email_error = true
        } else {
            show_email_error = false
        }
    }

    const go_to_login_form = () => {
        show_register_form.set(false)
        show_login_form.set(true)
        register_page_one.set(true)
        register_page_two.set(false)
    }
    const submit_registration = async () => {
        submitting_registration = true

        // example create data
        const data = {
            "username": $name,
            "email": $email,
            "emailVisibility": true,
            "password": $password,
            "passwordConfirm": $confirmed_password,
            "business_name": $business_name,
            "business_category": $selected_category_to_display,
            "registration_number": $business_registration_number,
            "location": $selected_location_to_display
        };

        try {
            const record = await pb.collection('merchants').create(data);

            const verify = await pb.collection('merchants').requestVerification($email);

            sessionStorage.setItem("unverified_email", $email);
            
            if(verify) {
                show_register_form.set(false)
                register_page_one.set(false)
                register_page_two.set(false)
                show_registration_success.set(true)
            }
            
            submitting_registration = false
        } catch (error) {
            console.log(error)
            submitting_registration = false
        }
    }
</script>

<style lang="postcss">
    .register_form {
        @apply px-4 mt-8;
    }
    .form_item {
        @apply flex flex-col mb-8;
    }
    .form_item label {
        @apply pl-1 mb-1.5 text-sm font-semibold;
    }
    .form_item #name, .form_item #business_name, .form_item #business_registration_number, .form_item #email {
        @apply border-2 border-border_grey py-3 px-4 rounded-md focus:outline-accent_bg;
    }
    .category_select_input_btn_wrapper, .location_select_input_btn_wrapper {
        @apply relative;
    }
    .category_select_input_btn, .location_select_input_btn {
        @apply border-2 py-3 px-4 rounded-md;
    }
    .category_list, .location_list {
        @apply absolute top-full mt-2 z-10 bg-main_bg w-full h-40 rounded-md overflow-y-scroll;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    }
    .category_list_item, .location_list_item {
        @apply py-3 px-4 hover:bg-border_grey_two;
    }
    .sub_category_list {
        @apply flex flex-row justify-center items-center text-center flex-wrap gap-2.5;
    }
    
    .sub_cat_wrapper {
        @apply relative py-1 px-2 inline border-accent_bg border-2 rounded-full;
    }
    .sub_cat_wrapper input[type="checkbox"]{
        @apply opacity-0 w-0 h-0;
    }
    .sub_cat_wrapper label{
        @apply font-medium text-base mb-0 text-accent_bg;
    }
    .sub_cat_wrapper .cell-bg {
        @apply h-full w-full absolute -z-10 top-0 bottom-0 left-0 right-0 rounded-full;
    }
    .sub_cat_wrapper input:checked ~ label {
        @apply text-white;
    }
    .sub_cat_wrapper input:checked + .cell-bg {
        @apply text-white bg-accent_bg;
    }

    .pwd_wrapper, .confirm_pwd_wrapper {
        @apply flex flex-row justify-between border-2 py-3 px-4 rounded-md border-border_grey;
    }
    .pwd_wrapper #password, .confirm_pwd_wrapper #confirm_password {
        @apply focus:outline-0 w-[-webkit-fill-available] pr-4;
    }
    .toggleVisibility {
        @apply h-7 w-7 flex justify-center items-center cursor-pointer;
    }
    .form_item.next_btn, .form_item.submit_btn {
        @apply bg-accent_bg py-4 rounded-md text-white font-bold text-lg mt-2 cursor-pointer flex justify-center items-center;
    }
    .register_redirect {
        @apply flex items-center justify-center;
    }
    .register_redirect .register_redirect_text {
        @apply text-sm;
    }
    .register_redirect .register_redirect_link {
        @apply text-accent_bg font-medium cursor-pointer;
    }
    .login_divider {
        @apply flex flex-row justify-center items-center mt-6 px-8;
    }
    .login_divider span {
        @apply text-nowrap mx-3 text-border_grey font-semibold text-sm;
    }
    .login_divider hr {
        @apply w-[-webkit-fill-available] border border-border_grey;
    }
    .social_login {
        @apply flex flex-row justify-center items-center mt-6 gap-8;
    }
    .social_login_link {
        @apply h-14 w-14 p-2.5 rounded-lg cursor-pointer;
    }
    .social_login_link img {
        @apply h-full w-full;
    }
    .facebook, .twitter {
        @apply bg-accent_bg/20;
    }
    .google {
        @apply bg-highlight_bg/20;
    }
    .name_error, .business_name_error, .category_error, .location_error, .business_registration_number_error, .email_error, .confirm_password_error {
        @apply mt-2 border border-red bg-red/10 rounded-md px-4 py-2.5;
    }
    .name_error_text, .business_name_error_text, .category_error_text, .location_error_text, .business_registration_number_error, .email_error_text, .confirm_password_error_text {
        @apply text-red text-sm;
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

<form class="register_form">
    {#if $register_page_one}
        <div class="register_page_one" transition:slide={{ delay: 50, duration: 300, easing: quintOut, axis: 'x' }}>
            <div class="form_item">
                <label for="business_name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your first and last name" on:input={set_name} />
                {#if show_name_error}
                    <div class="name_error" transition:slide={{ delay: 50, duration: 150, easing: quintOut, axis: 'y' }}>
                        <span class="name_error_text">Looks like you haven't entered your name</span>
                    </div>
                {/if}
            </div>
            <div class="form_item">
                <label for="business_name">Business name</label>
                <input type="text" id="business_name" name="business_name" placeholder="Enter your business name" on:input={set_business_name} />
                {#if show_business_name_error}
                    <div class="business_name_error" transition:slide={{ delay: 50, duration: 150, easing: quintOut, axis: 'y' }}>
                        <span class="business_name_error_text">Looks like you haven't entered a business name</span>
                    </div>
                {/if}
            </div>
            <div class="form_item">
                <label for="business_registration_number">Business registration number</label>
                <input type="text" id="business_registration_number" name="business_registration_number" placeholder="Enter your registration number" on:input={set_business_registration_number}/>
                {#if show_business_registration_number_error}
                    <div class="business_registration_number_error" transition:slide={{ delay: 50, duration: 150, easing: quintOut, axis: 'y' }}>
                        <span class="business_registration_number_error_text">Looks like you haven't entered your registration number</span>
                    </div>
                {/if}
            </div>
            <div class="form_item">
                <label for="location">Location</label>
                <div class="location_select_input_btn_wrapper">
                    <div class={`location_select_input_btn ${$show_location_list ? 'border-accent_bg' : 'border-border_grey'}`} on:click={toggle_location_list}>
                        <span class={`${$has_location ? 'text-black' : 'text-border_grey_four'}`}>{$selected_location_to_display}</span>
                    </div>
                    {#if $show_location_list}
                        <ul class="location_list" transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}>
                            {#each accra_locations as location}
                            <li class="location_list_item" data-name={location.name} data-tag={location.tag} on:click={set_location}>{location.name}</li>
                            {/each}
                        </ul>
                    {/if}
                </div>
                {#if show_location_error}
                    <div class="location_error" transition:slide={{ delay: 50, duration: 150, easing: quintOut, axis: 'y' }}>
                        <span class="location_error_text">Looks like you haven't selected a location</span>
                    </div>
                {/if}
            </div>
        </div>
        <div class="form_item next_btn" on:click={go_to_register_page_two}>
            <span>Next</span>
        </div>
    {/if}
    {#if $register_page_two}
    <div class="register_page_two" transition:slide={{ delay: 50, duration: 300, easing: quintOut, axis: 'x' }}>
        <div class="form_item">
            <label for="category">Category</label>
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
        </div>
    </div>
    <div class="sub_category_section">
        <div class="sub_category_list">
            {#each sub_categories as sub_cat}
                <div class="sub_cat_wrapper">
                    <input id="sub_cat_{sub_cat.tag}" type="checkbox" name="sub_category"/>
                    <div class="cell-bg"></div>
                    <label for="sub_cat_{sub_cat.tag}" on:click={set_sub_categories_selected}>{sub_cat.name}</label>
                </div>
            {/each}
        </div>
    </div>
    <div class="form_item next_btn" on:click={go_to_register_page_three}>
        <span>Next</span>
    </div>
    {/if}
    {#if $register_page_three}
        <div class="register_page_three" transition:slide={{ delay: 50, duration: 300, easing: quintOut, axis: 'x' }}>
            <div class="form_item">
                <label for="email">Email</label>
                <input 
                    on:input={set_email}
                    on:blur={validate_email}
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email"
                />
                {#if show_email_error}
                    <div class="email_error" transition:slide={{ delay: 50, duration: 150, easing: quintOut, axis: 'y' }}>
                        <span class="email_error_text">Looks like you haven't entered a valid email.</span>
                    </div>
                {/if}
            </div>
            <div class="form_item">
                <label for="password">Password</label>
                <div class="pwd_wrapper" bind:this={password_input_wrapper}>
                    <input 
                        on:input={set_password}
                        bind:this={password_input}
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Create a password" 
                        on:focus={focus_in_password} 
                        on:blur={focus_out_password}
                    />
                    <div class="toggleVisibility" on:click={toggle_password_visibilty}>
                        {#if show_password}
                            <img src="/images/show.png" alt="Your password is visible, click here to mask it." />
                        {:else}
                            <img class="hide" src="/images/hide.png" alt="Your password is hidden.  Clicking here will display your password on screen" />
                        {/if}
                    </div> 
                </div>
            </div>
            <div class="form_item">
                <label for="confirm_password">Confirm password</label>
                <div class="confirm_pwd_wrapper" bind:this={confirm_password_wrapper}>
                    <input
                        on:input={set_confirm_password}
                        bind:this={confirm_password} 
                        type="password" 
                        id="confirm_password" 
                        name="confirm_password" 
                        placeholder="Confirm your password"
                        on:focus={focus_in_confirm_password} 
                        on:blur={focus_out_confirm_password}
                    />
                    <div class="toggleVisibility" on:click={toggle_confirm_password_visibilty}>
                        {#if show_confirm_password}
                            <img src="/images/show.png" alt="Your password is visible, click here to mask it." />
                        {:else}
                            <img class="hide" src="/images/hide.png" alt="Your password is hidden.  Clicking here will display your password on screen" />
                        {/if}
                    </div> 
                </div>
                {#if show_confirm_password_error}
                    <div class="confirm_password_error" transition:slide={{ delay: 50, duration: 150, easing: quintOut, axis: 'y' }}>
                        <span class="confirm_password_error_text">Check the password confirmation. It appears to not be a match.</span>
                    </div>
                {/if}
            </div>
            {#if submitting_registration}
                <div class="form_item submit_btn">
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
                <div class="form_item submit_btn" on:click={submit_registration}>
                    <span>Register</span>
                </div>
            {/if}


            

        </div>
    {/if}
    <div class="register_redirect">
        <p class="register_redirect_count">Already have an account? <span class="register_redirect_link" on:click={go_to_login_form}>Login</span></p>
    </div>
    <div class="login_divider">
        <hr/><span>Or Register With</span><hr/>
    </div>
    <div class="social_login">
        <div class="social_login_link facebook">
            <img src="/images/facebook.png" />
        </div>
        <div class="social_login_link google">
            <img src="/images/google.png" />
        </div>
        <div class="social_login_link twitter">
            <img src="/images/twitter.png" />
        </div>
    </div>
</form>