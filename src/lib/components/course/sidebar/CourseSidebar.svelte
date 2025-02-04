<script lang="ts" module>
	import AudioWaveform from 'lucide-svelte/icons/audio-waveform';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import Megaphone from 'lucide-svelte/icons/megaphone';
	import Award from 'lucide-svelte/icons/award';
	import Command from 'lucide-svelte/icons/command';
	import Frame from 'lucide-svelte/icons/frame';
	import Home from 'lucide-svelte/icons/home';
	import GalleryVerticalEnd from 'lucide-svelte/icons/gallery-vertical-end';
	import Map from 'lucide-svelte/icons/map';
	import Settings2 from 'lucide-svelte/icons/settings-2';
	import SquareTerminal from 'lucide-svelte/icons/square-terminal';

	// This is sample data.
	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: '/avatars/shadcn.jpg'
		},
		teams: [
			{
				name: 'Fundamentos de programacion',
				logo: GalleryVerticalEnd,
				plan: 'Inscrito, 2024-2'
			},
			{
				name: 'Acme Corp.',
				logo: AudioWaveform,
				plan: 'Startup'
			},
			{
				name: 'Evil Corp.',
				logo: Command,
				plan: 'Free'
			}
		],
		navMain: [
			{
				title: 'Inicio',
				url: '#',
				icon: Home,
				isActive: false
			},
			{
				title: 'Modulos',
				url: '#',
				icon: BookOpen,
				isActive: true,
				items: [
					{
						title: 'Modulo 1',
						url: '#'
					},
					{
						title: 'Modulo 2',
						url: '#'
					},
					{
						title: 'Modulo 3',
						url: '#'
					}
				]
			}
		],
		projects: [
			{
				name: 'Calificaciones',
				url: '#',
				icon: Frame
			},
			{
				name: 'Anuncios',
				url: '#',
				icon: Award
			}
		]
	};
</script>

<script lang="ts">
	import NavMain from './nav-main.svelte';
	import NavProjects from './nav-projects.svelte';
	import NavUser from './nav-user.svelte';
	import TeamSwitcher from './team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root class="h-full" bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavProjects projects={data.projects} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
