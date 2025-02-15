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
	const sampleData = {
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
				title: 'Syllabus',
				url: '#',
				icon: Home,
				isActive: false
			},
			{
				title: 'Módulos',
				url: '#',
				icon: BookOpen,
				isActive: true,
				items: []
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
	import type { CourseModule } from '$lib/types/module';
	import NavMain from './nav-main.svelte';
	import NavProjects from './nav-projects.svelte';
	import NavUser from './nav-user.svelte';
	import TeamSwitcher from './team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { page } from '$app/state';

	let {
		data,
		ref = $bindable(null),
		collapsible = 'icon' as 'none' | 'icon' | 'offcanvas' | undefined,
		...restProps
	} = $props();

	if (!data.teams) data.teams = sampleData.teams;
	if (!data.navMain) data.navMain = sampleData.navMain;
	if (!data.projects) data.projects = sampleData.projects;

	const alias = data.course.alias;
	data.navMain[0].url = `/course/${alias}`;
	data.navMain[1].items = data.modules.map((module: CourseModule) => ({
		title: module.name,
		url: `/course/${alias}/module/${module.id}`,
		isActive: module.order === Number(page.params.module)
	}));
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
