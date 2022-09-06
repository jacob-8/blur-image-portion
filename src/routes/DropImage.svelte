<script lang="ts">
	let dragging = false;
	let loaded = false;
	let imageObj: HTMLImageElement;

	async function handleImage(files: FileList) {
		dragging = false;

		const image = files.item(0);

		// Client-side validation: Must be an image
		if (image?.type.split('/')[0] !== 'image') {
			return alert('Unsupported File Type');
		}

		const reader = new FileReader();
		reader.addEventListener(
			'load',
			() => {
				// convert image file to base64 string
				const src = reader.result as string;
				imageObj = new Image();
				imageObj.onload = function () {
					loaded = true;
				};
				imageObj.src = src;
			},
			false
		);
		reader.readAsDataURL(image);
	}
</script>

{#if loaded}
	<slot {imageObj} />
{:else}
	<label
		class:dragging
		class="fixed inset-0 text-gray-600 border-transparent
h-full flex flex-col items-center justify-center border-10 border-dashed
cursor-pointer z-0"
		on:drop|preventDefault={(e) => handleImage(e.dataTransfer.files)}
		on:dragover|preventDefault={() => (dragging = true)}
		on:dragleave|preventDefault={() => (dragging = false)}
	>
		<input
			type="file"
			accept="image/*"
			on:input={(e) => {
				// @ts-ignore
				handleImage(e.target.files);
			}}
		/>
	</label>
{/if}

<style>
	.dragging {
		@apply bg-orange-100 !border-orange-300 !text-orange-700;
	}
</style>
