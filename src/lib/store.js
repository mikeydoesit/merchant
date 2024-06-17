import { writable } from 'svelte/store'

export const show_homepage = writable(true);
export const show_more_component = writable(false);
export const show_settings_menu = writable(false);
export const show_campaigns_menu = writable(false);
export const show_add_campaign = writable(false);
export const show_active_campaigns = writable(false);
export const show_draft_campaigns = writable(true);
export const show_campaign_action = writable(false);

export const show_campaign_action_main = writable(true)
export const show_campaign_action_edit = writable(false)
export const show_campaign_action_preview = writable(false)
export const show_campaign_action_delete = writable(false)

// Auth variables

export const register_page_one = writable(true)
export const register_page_two = writable(false)
export const register_page_three = writable(false)

export const name = writable('')
export const business_name = writable('')
export const business_registration_number = writable('')
export const email = writable('')
export const password = writable('')
export const confirmed_password = writable('')

export const show_login_form = writable(true)
export const show_register_form = writable(false)
export const show_registration_success = writable(false)
export const show_unverified_msg = (false)
export const show_password_reset_form = writable(false)
export const show_category_list = writable(false)
export const show_location_list = writable(false)
export const has_category = writable(false)
export const selected_category_to_display = writable('Select your business category')
export const has_location = writable(false)
export const selected_location_to_display = writable('Select your business location')
export const selected_category = writable('')
export const sub_categories_array = writable([])
export const selected_location = writable('')

// New campaign form

export const show_add_campaign_page_one = writable(true)
export const show_add_campaign_page_two = writable(false)
export const show_percent_slider = writable(false)
export const show_stock_images = writable(false)

export const product_service_name = writable('')
export const show_product_category_list = writable(false)
export const has_product_category = writable(false)
export const selected_product_category_to_display = writable('Select a category')
export const original_price = writable(0.00)
export const discount_type = writable('')
export const discount_percentage = writable(50)

export const stock_images = writable([])
export const stock_images_array = writable([])
export const selected_stock_images_ids = writable([])
export const selected_stock_images = writable([])
export const selected_internal_storage_images = writable([])

export const draft_result_list = writable([])
export const active_result_list = writable([])

// Edit Campaign form

export const show_product_name_field = writable(true)
export const show_product_name_input = writable(false)
export const updated_product_service_name = writable('')

export const show_category_field = writable(true)
export const show_category_input = writable(false)
export const show_updated_product_category_list = writable(false)
export const has_updated_product_category = writable(false)
export const selected_updated_product_category_to_display = writable('Select a category')

export const show_original_price_field = writable(true)
export const show_original_price_input = writable(false)
export const updated_original_price = writable(0)

export const show_discount_type_value_field = writable(true)
export const show_discount_type_value_input = writable(false)

export const show_product_images_field = writable(true)
export const show_product_images_input = writable(false)
