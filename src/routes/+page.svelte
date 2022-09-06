<script lang="ts">
	import Canvas from './Canvas.svelte';
	import DropImage from './DropImage.svelte';

  let blurStrength = 8;
</script>

<div class="p-3">
	<h1 class="mb-3 font-semibold text-2xl">Blur Image Portion Tool</h1>

	<div class="z-1 relative">
		<input type="range" id="blur" bind:value={blurStrength} min="0" max="20" />
		<label for="blur">Blur Strength: {blurStrength}</label>
	</div>
	<DropImage let:imageObj>
		<Canvas {imageObj} {blurStrength} />
	</DropImage>
</div>
