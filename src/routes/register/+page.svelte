<script lang="ts">
	let isLoading = $state(false);

	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	function onsubmit() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 2000);
	}
</script>

<div class="flex min-h-screen items-center justify-center">
	<Card.Root class="w-full max-w-md">
		<Card.Header class="space-y-1">
			<Card.Title class="text-center text-3xl font-bold">Crea tu cuenta</Card.Title>
			<Card.Description class="text-center">
				Regístrate para comenzar tu viaje de aprendizaje
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<form {onsubmit} class="space-y-4">
				<div class="space-y-2">
					<Label for="name">Nombre Completo</Label>
					<Input id="name" type="text" placeholder="Juan Pérez" required />
				</div>
				<div class="space-y-2">
					<Label for="email">Correo Electrónico</Label>
					<Input id="email" type="email" placeholder="m@example.com" required />
				</div>
				<div class="space-y-2">
					<Label for="password">Contraseña</Label>
					<Input id="password" type="password" required />
				</div>
				<div class="space-y-2">
					<Label for="confirm-password">Confirmar Contraseña</Label>
					<Input id="confirm-password" type="password" required />
				</div>
				<Button class="w-full" type="submit" disabled={isLoading}>
					{#if isLoading}
						<span>Registrando...</span>
						<i class="bi bi-arrow-repeat animate-spin leading-none"></i>
					{:else}
						<span>Registrarse</span>
					{/if}
				</Button>
			</form>
		</Card.Content>
		<Card.Footer class="flex flex-col space-y-4">
			<div class="relative w-full">
				<div class="absolute inset-0 flex items-center">
					<span class="w-full border-t"></span>
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-background px-2 text-muted-foreground"> O regístrate con </span>
				</div>
			</div>
			<Button variant="outline" class="w-full" disabled={isLoading}>
				{#if isLoading}
					<i class="bi bi-arrow-repeat animate-spin leading-none"></i>
				{:else}
					<i class="bi bi-google leading-none"></i>
				{/if}
				Google
			</Button>

			<div class="text-center text-sm text-gray-600">
				<span>¿Ya tienes una cuenta?</span>
				<Button
					variant="link"
					href="/login"
					class="px-1 font-semibold text-blue-600 hover:underline">Inicia sesión</Button
				>
			</div>
		</Card.Footer>
	</Card.Root>
</div>
