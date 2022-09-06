<script lang="ts">
	import Canvas from './Canvas.svelte';
	import DropImage from './DropImage.svelte';
</script>

<h1 class="p-3 font-semibold text-2xl">Blur Image Portion Tool</h1>

<DropImage let:imageObj>
  <Canvas {imageObj} />
</DropImage>
