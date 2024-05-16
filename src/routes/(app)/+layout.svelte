<script>
  import "../../styles/global.css";
  import { show_settings_menu, show_campaigns_menu, show_add_campaign } from '$lib/store.js'
  import Tapbar from "../../components/Tapbar.svelte";
</script>

<style lang="postcss">
  .tapbar_menu_layout {
    @apply h-dvh relative;
  }
</style>
  
<div class="tapbar_menu_layout">
  <slot />
  {#if !$show_settings_menu && !$show_campaigns_menu && !$show_add_campaign}
    <Tapbar />
  {/if}
</div>