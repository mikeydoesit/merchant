import { writable } from 'svelte/store'

export const show_homepage = writable(true);
export const show_more_component = writable(false);
export const show_settings_menu = writable(false);
export const show_campaigns_menu = writable(false);
export const show_active_campaigns = writable(false);
export const show_draft_campaigns = writable(true);

