<script lang="ts">
	import { onMount } from 'svelte';

	export let imageObj: HTMLImageElement;
	export let blurStrength: number;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	onMount(() => {
		ctx = canvas.getContext('2d');
		drawOriginalImageOnCanvas();
	});

	function drawOriginalImageOnCanvas() {
		ctx.filter = 'none';
		ctx.drawImage(imageObj, 0, 0);
	}

	function reset() {
		blurredPortions = [];
		drawOriginalImageOnCanvas();
	}

	interface Portion {
		startX: number;
		startY: number;
		width: number;
		height: number;
	}

	let currentStart = {
		startX: 0,
		startY: 0,
	};

	let blurredPortions: Portion[] = [];

	$: if (blurredPortions.length) {
		ctx.filter = `blur(${blurStrength}px)`;
		// draw the data as blurred
		ctx.drawImage(imageObj, 0, 0);

		// calculate operations
		const blurOperations = blurredPortions.map(({ startX, startY, width, height }) => {
			const blurredImagePortion = ctx.getImageData(startX, startY, width, height);
			return { blurredImagePortion, startX, startY };
		});

		// reset canvas
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawOriginalImageOnCanvas();

		// add all blurs on top
		for (const { blurredImagePortion, startX, startY } of blurOperations) {
			ctx.putImageData(blurredImagePortion, startX, startY);
		}
	}

	function download() {
		var link = document.createElement('a');
		link.download = 'filename.png';
		link.href = canvas.toDataURL();
		link.click();
	}
</script>

<p class="mb-2">
	Drag over portion to blur, then
	<button type="button" class="font-semibold text-blue-600" on:click={download}>download</button> |

	<button type="button" class="font-semibold text-red-600" on:click={reset}>Reset</button>
</p>

<!-- class="max-w-full max-h-[90vh]" -->
<canvas
	bind:this={canvas}
	width={imageObj.width}
	height={imageObj.height}
	on:mousedown={(e) => {
		currentStart.startX = e.pageX - canvas.offsetLeft;
		currentStart.startY = e.pageY - canvas.offsetTop;
	}}
	on:mouseup={(e) => {
		const width = e.pageX - canvas.offsetLeft - currentStart.startX;
		const height = e.pageY - canvas.offsetTop - currentStart.startY;
		if (width > 0 && height > 0) {
			const newPortion = { 
				startX: currentStart.startX, 
				startY: currentStart.startY, 
				width, 
				height 
			}
			blurredPortions = [...blurredPortions, newPortion];
		}
	}}
/>
