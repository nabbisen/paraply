<script lang="ts">
	import favicon from '$lib/images/logo.svg'
	import '$lib/styles/global.scss'
	import defaultBackgroundImageSrc from '$lib/images/default.png'
	import entranceBackgroundImageSrc from '$lib/images/entrance.png'
	import interviewBackgroundImageSrc from '$lib/images/interview.png'

	let { children } = $props()

	import { page } from '$app/state'

	const isRoot = $derived(page.url.pathname === '/')

	const backgroundImage: () => string = $derived(() => {
		if (page.url.pathname.startsWith('/interview/')) {
			return interviewBackgroundImageSrc
		} else {
			switch (page.url.pathname) {
				case '/entrance':
					return entranceBackgroundImageSrc
				default:
					return defaultBackgroundImageSrc
			}
		}
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class:root={isRoot}>
	<header>
		<h1 aria-label="paraply">Paraply</h1>
		<nav>
			<div class="d-flex" style="flex-direction: column;">
				<a class="button" href="/">トップにもどる</a>
				<span>Return to top</span>
			</div>
		</nav>
	</header>
	<main style={`--background-image: url(${backgroundImage()});`}>
		{@render children?.()}
	</main>
</div>

<style>
	header {
		position: fixed;
		top: 0.7rem;
		right: 1.1rem;
	}
	h1 {
		padding: 0;
		margin: 0;
		display: none;
		color: #ffefaa;
	}
	.root h1 {
		display: inline;
	}

	.root nav {
		display: none;
	}

	main {
		background-image: var(--background-image);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		min-height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
