<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select/index.js';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { type DateValue, DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { toast } from 'svelte-sonner';
	import api from '$lib/services/api';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	let formElement: HTMLFormElement;

	type FormData = {
		firstName: string;
		lastName: string;
		email: string;
		gender: string;
		birthdate: DateValue | undefined;
		password: string;
		confirmPassword: string;
	};

	let isLoading = $state(false);
	let error = $state(null);
	let formData: FormData = $state({
		firstName: '',
		lastName: '',
		email: '',
		gender: '',
		birthdate: undefined,
		password: '',
		confirmPassword: ''
	});

	function onsubmit() {
		signUpWithEmail();
	}

	async function signUpWithEmail() {
		isLoading = true;

		const hasEmptyFields = Object.values(formData).some((value) => !value);
		if (hasEmptyFields) {
			toast.error('Por favor, rellena todos los campos');
			isLoading = false;
			return;
		}

		toast.loading('Registrando...');

		const data = {
			email: formData.email,
			password: formData.password,
			first_name: formData.firstName,
			last_name: formData.lastName
		};

		await api("/sign-up-with-email/", {
			method: 'POST',
			body: JSON.stringify(data)
		});

		toast.success('¡Cuenta creada exitosamente!');
		toast.loading('Redirigiendo...');

		const loginData = {
			email: formData.email,
			password: formData.password
		}

		Object.entries(loginData).forEach(([key, value]) => {
			const input = document.createElement('input');
			input.type = 'hidden';
			input.name = key;
			input.value = value;
			formElement.appendChild(input);
		});		

		formElement.submit();
	}

	const genderOptions = [
		{ value: 'Homber', label: 'Hombre' },
		{ value: 'Mujer', label: 'Mujer' },
		{ value: 'Otro', label: 'Otro' },
		{ value: 'No especificar', label: 'No especificar' }
	];

	let genderTriggerDisplay = $derived(
		genderOptions.find((option) => option.value === formData.gender)?.label || 'Seleccionar género'
	);

	/*
	 * Create form to request access token from Google's OAuth 2.0 server.
	 */
	 function oauthSignIn() {
		// Google's OAuth 2.0 endpoint for requesting an access token
		const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

		// Create <form> element to submit parameters to OAuth 2.0 endpoint.
		const form = document.createElement('form');
		form.setAttribute('method', 'GET'); // Send as a GET request.
		form.setAttribute('action', oauth2Endpoint);

		// Parameters to pass to OAuth 2.0 endpoint.
		const params: Record<string, string> = {
			client_id: '927512412726-qbrkf1gcel5f2gnsk6tsegq8n1gjfni9.apps.googleusercontent.com',
			redirect_uri: `${window.location.origin}/authorize`,
			response_type: 'code',
			prompt: 'select_account',
			scope:
				'openid profile email https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read',
			include_granted_scopes: 'true'
		};

		// Add form parameters as hidden input values.
		for (const p in params) {
			const input = document.createElement('input');
			input.setAttribute('type', 'hidden');
			input.setAttribute('name', p);
			input.setAttribute('value', params[p]);
			form.appendChild(input);
		}

		// Add form to page and submit it to open the OAuth 2.0 endpoint.
		document.body.appendChild(form);
		form.submit();
	}
</script>

<div class="flex min-h-screen items-center justify-center">
	<Card.Root class="w-full max-w-md">
		<Card.Header class="space-y-1">
			<Card.Title class="text-center text-3xl font-bold">Crea tu cuenta</Card.Title>
			<Card.Description class="text-center">Ingresa tus datos para comenzar</Card.Description>
		</Card.Header>
		<Card.Content>
			<form {onsubmit} class="space-y-4">
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="firstName" class="flex items-center gap-2">Nombre</Label>
						<Input
							id="firstName"
							name="firstName"
							placeholder="Juan"
							bind:value={formData.firstName}
							class="transition-all duration-200 focus:ring-2 focus:ring-primary"
							required
						/>
					</div>
					<div class="space-y-2">
						<Label for="lastName" class="flex items-center gap-2">Apellidos</Label>
						<Input
							id="lastName"
							name="lastName"
							placeholder="Pérez"
							bind:value={formData.lastName}
							class="transition-all duration-200 focus:ring-2 focus:ring-primary"
							required
						/>
					</div>
				</div>

				<div class="space-y-2">
					<Label for="email" class="flex items-center gap-2">Correo electrónico</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="tu@ejemplo.com"
						bind:value={formData.email}
						class="transition-all duration-200 focus:ring-2 focus:ring-primary"
						required
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label class="flex items-center gap-2">Género</Label>
						<Select.Root type="single" bind:value={formData.gender} name="gender">
							<Select.Trigger class="w-full">
								{genderTriggerDisplay}
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.GroupHeading>Género
									</Select.GroupHeading>
									{#each genderOptions as gender}
										<Select.Item value={gender.value} label={gender.label}>{gender.label}</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</div>
					<div class="space-y-2">
						<Label class="flex items-center gap-2">Fecha de nacimiento</Label>
						

						<Popover.Root>
							<Popover.Trigger>
								{#snippet child({ props })}
									<Button
										variant="outline"
										class="w-full justify-start text-left font-normal transition-all duration-200 focus:ring-2 focus:ring-primary"
										{...props}
									>
										<CalendarIcon class="mr-2 size-4" />
										{formData.birthdate ? df.format(formData.birthdate.toDate(getLocalTimeZone())) : 'Seleccionar fecha'}
									</Button>
								{/snippet}
							</Popover.Trigger>
							<Popover.Content class="w-auto p-0">
								<Calendar bind:value={formData.birthdate} type="single" initialFocus class="rounded-md border"/>
							</Popover.Content>
						</Popover.Root>
					</div>
				</div>

				<div class="space-y-2">
					<Label for="password" class="flex items-center gap-2">Contraseña</Label>
					<Input
						id="password"
						name="password"
						type="password"
						bind:value={formData.password}
						class="transition-all duration-200 focus:ring-2 focus:ring-primary"
						required
					/>
				</div>

				<div class="space-y-2">
					<Label for="confirm-password" class="flex items-center gap-2">Confirmar contraseña</Label>
					<Input
						id="confirm-password"
						name="confirmPassword"
						type="password"
						bind:value={formData.confirmPassword}
						class="transition-all duration-200 focus:ring-2 focus:ring-primary"
						required
					/>
				</div>

				{#if error}
					<div class="flex items-center gap-2 text-sm text-destructive">
						{error}
					</div>
				{/if}

				<Button type="submit" class="w-full transition-all duration-200" disabled={isLoading}>
					{#if isLoading}
						Registrando...
						<i class="bi bi-arrow-circle animate-spin"></i>
					{:else}
						Registrar
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
			<Button variant="outline" class="w-full" disabled={isLoading} onclick={oauthSignIn}>
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

<form method="post" bind:this={formElement} action="/login"></form>