<script>
    import { selected_category_to_display } from "$lib/store.js"
    import PrePaymentAutoPost from "./PrePaymentAutoPOST.svelte";
    import PrePaymentBabyPost from "./PrePaymentBabyPOST.svelte";
    import PrePaymentBeautyPost from "./PrePaymentBeautyPOST.svelte"
    import PrePaymentFitnessPost from "./PrePaymentFitnessPOST.svelte";
    import PrePaymentFoodPost from "./PrePaymentFoodPOST.svelte"
	import PrePaymentHealthPost from "./PrePaymentHealthPOST.svelte";
	import PrePaymentHomeAppliancesPost from "./PrePaymentHomeAppliancesPOST.svelte";
	import PrePaymentHomeImprovementPost from "./PrePaymentHomeImprovementPOST.svelte";
	import PrePaymentRetailPost from "./PrePaymentRetailPOST.svelte";
	import PrePaymentWomensPost from "./PrePaymentWomensPOST.svelte";
    import PrePaymentMensPost from "./PrePaymentMensPOST.svelte";
	import PrePaymentJewelleryPost from "./PrePaymentJewelleryPOST.svelte";
	import PrePaymentElectronicsPost from "./PrePaymentElectronicsPOST.svelte";
	import PrePaymentGroceryPost from "./PrePaymentGroceryPOST.svelte";
	import PrePaymentSportsPost from "./PrePaymentSportsPOST.svelte";
	import PrePaymentToysPost from "./PrePaymentToysPOST.svelte";
	import PrePaymentEntertainmentPost from "./PrePaymentEntertainmentPOST.svelte";
	import PrePaymentHotelsPost from "./PrePaymentHotelsPOST.svelte";
	import PrePaymentToursPost from "./PrePaymentToursPOST.svelte";
	import PrePaymentFlightsPost from "./PrePaymentFlightsPOST.svelte";
	import ImageUpload from "./ImageUpload.svelte";

</script>

<div>
    <ImageUpload />
    {#if $selected_category_to_display == 'Beauty & Spas'}
        <PrePaymentBeautyPost />
    {:else if $selected_category_to_display == 'Fitness'}
        <PrePaymentFitnessPost />
    {:else if $selected_category_to_display == 'Food & Drink'}
        <PrePaymentFoodPost />
    {:else if $selected_category_to_display == 'Automotive'}
        <PrePaymentAutoPost />
    {:else if $selected_category_to_display == 'Retail'}
        <PrePaymentRetailPost />
    {:else if $selected_category_to_display == 'Home Improvement'}
        <PrePaymentHomeImprovementPost />
    {:else if $selected_category_to_display == 'Women\'s Fashion'}
        <PrePaymentWomensPost />
    {:else if $selected_category_to_display == 'Health'}
        <PrePaymentHealthPost />
    {:else if $selected_category_to_display == 'Home Appliances'}
        <PrePaymentHomeAppliancesPost />
    {:else if $selected_category_to_display == 'Men\'s Fashion'}
        <PrePaymentMensPost />
    {:else if $selected_category_to_display == 'Jewellery & Watches'}
        <PrePaymentJewelleryPost />
    {:else if $selected_category_to_display == 'Electronics'}
        <PrePaymentElectronicsPost />
    {:else if $selected_category_to_display == 'Grocery'}
        <PrePaymentGroceryPost />
    {:else if $selected_category_to_display == 'Sports & Outdoors'}
        <PrePaymentSportsPost />
    {:else if $selected_category_to_display == 'Toys'}
        <PrePaymentToysPost />
    {:else if $selected_category_to_display == 'Baby & Kids'}
        <PrePaymentBabyPost />
    {:else if $selected_category_to_display == 'Entertainment'}
        <PrePaymentEntertainmentPost />
    {:else if $selected_category_to_display == 'Hotels'}
        <PrePaymentHotelsPost />
    {:else if $selected_category_to_display == 'Tours & Excursions'}
        <PrePaymentToursPost />
    {:else if $selected_category_to_display == 'Flights'}
        <PrePaymentFlightsPost />
    {/if}
    
</div>
