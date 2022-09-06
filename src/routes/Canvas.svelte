<script lang="ts">
	import { onMount } from 'svelte';

	export let imageObj: HTMLImageElement;
	export let blurStrength = 10;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let rect: {
		startX?: number;
		startY?: number;
		w?: number;
		h?: number;
	} = {};
	let drag = false;
	let imgDrow: ImageData;
	let w: number;
	let h: number;

	onMount(() => {
		ctx = canvas.getContext('2d');
		ctx.drawImage(imageObj, 0, 0);
	});

	function mouseMove(
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLCanvasElement;
		}
	) {
		if (drag) {
			ctx.filter = `blur(${blurStrength}px)`;
			ctx.drawImage(imageObj, 0, 0);
			rect.w = e.pageX - canvas.offsetLeft - rect.startX;
			rect.h = e.pageY - canvas.offsetTop - rect.startY;
			// ctx.strokeStyle = 'blue';

			if (rect.w > 0 && rect.h > 0) {
				imgDrow = ctx.getImageData(rect.startX, rect.startY, rect.w, rect.h);
			}
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.filter = 'none';
			ctx.drawImage(imageObj, 0, 0);

			w = rect.w < 0 ? rect.startX + rect.w : rect.startX;
			h = rect.h < 0 ? rect.startY + rect.h : rect.startY;
			if (imgDrow) {
				ctx.putImageData(imgDrow, w, h);
			}
			// ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
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
	Drag over portion to blur, then <button type="button" class="font-semibold text-blue-600" on:click={download}>download</button>
</p>

<!-- class="max-w-full max-h-[90vh]" -->
<canvas
	bind:this={canvas}
	width={imageObj.width}
	height={imageObj.height}
	on:mousedown={(e) => {
		rect.startX = e.pageX - canvas.offsetLeft;
		rect.startY = e.pageY - canvas.offsetTop;
		drag = true;
	}}
	on:mouseup={() => (drag = false)}
	on:mousemove={mouseMove}
/>
