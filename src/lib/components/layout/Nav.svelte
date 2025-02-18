<script lang="ts">
	import type { User } from '$types/user';

	type Props = {
		user: User | null;
		page: string;
	};

	const { page, user }: Props = $props();

	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<header class="flex items-center justify-between border-b bg-white px-6 py-4">
	<div class="flex items-center space-x-4">
		<a href="/" class="text-2xl font-bold">Minerva</a>
		<Separator orientation="vertical" />
		<a class="text-sm font-medium" href="/admin/cursos">Cursos</a>
	</div>

	<nav class="flex items-center space-x-4">
		<Button variant="ghost" class="size-11 bg-indigo-50">
			<i class="bi bi-bell"></i>
		</Button>
		<Separator orientation="vertical" />
		{#if user !== null}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar.Root class="size-11">
						<Avatar.Image src={user.avatar} alt={user.fullname} />
						<Avatar.Fallback
							>{user.fullname
								.split(' ')
								.map((name: string) => name[0])
								.join('')}</Avatar.Fallback
						>
					</Avatar.Root>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-56" align="end">
					<DropdownMenu.Label class="font-normal">
						<div class="flex flex-col space-y-1">
							<p class="text-sm font-medium leading-none">{user.fullname}</p>
							<p class="text-xs leading-none text-muted-foreground">{user.email}</p>
						</div>
					</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						<DropdownMenu.Item>
							<i class="bi bi-person"></i>
							<span>Perfil</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<i class="bi bi-gear"></i>
							<span>Configuracion</span>
						</DropdownMenu.Item>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>
						<a href="/logout" data-sveltekit-reload>
							<i class="bi bi-box-arrow-right"></i>
							<span>Cerrar sesion</span>
						</a>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{/if}
	</nav>
</header>

<style lang="scss">
	.nav-link {
		@apply rounded-md px-2 py-1 hover:bg-zinc-100;
	}
</style>
