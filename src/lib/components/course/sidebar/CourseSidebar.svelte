<script lang="ts">
	import type { CourseModule } from '$lib/types/module';
	import NavMain from './nav-main.svelte';
	import NavProjects from './nav-projects.svelte';
	import NavUser from './nav-user.svelte';
	import TeamSwitcher from './team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { page } from '$app/state';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import Award from 'lucide-svelte/icons/award';
	import Frame from 'lucide-svelte/icons/frame';
	import Home from 'lucide-svelte/icons/home';

	let {
		ref = $bindable(null),
		collapsible = 'icon' as 'none' | 'icon' | 'offcanvas' | undefined,
		course,
		modules = [],
		...restProps
	} = $props();

	const courseAlias = course.alias;

	const sidebarData = $derived.by(() => ({
		teams: [],
		navMain: [
			{
				title: 'Syllabus',
				url: `/course/${courseAlias}/`,
				icon: Home,
				isActive: false
			},
			{
				title: 'Módulos',
				url: '#',
				icon: BookOpen,
				isActive: true,
				items: modules.map((module: CourseModule) => ({
					title: module.name,
					url: `/course/${courseAlias}/module/${module.id}`,
					isActive: module.order === Number(page.params.module)
				}))
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
	}));
</script>

<Sidebar.Root class="h-full" bind:ref {collapsible} {...restProps}>
	<Sidebar.Content>
		<NavMain items={sidebarData.navMain} />
		<NavProjects projects={sidebarData.projects} />
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
