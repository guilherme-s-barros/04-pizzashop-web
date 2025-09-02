import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useId } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = z.object({
	restaurantName: z.string().nonempty(),
	managerName: z.string().nonempty(),
	email: z.email(),
	phone: z.string().nonempty(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
	const restaurantInputId = useId()
	const managerInputId = useId()
	const phoneInputId = useId()
	const emailInputId = useId()

	const navigate = useNavigate()

	const { handleSubmit, register, formState } = useForm({
		resolver: zodResolver(signUpForm),
	})

	const { isSubmitting } = formState

	const { mutateAsync: registerRestaurantFn } = useMutation({
		mutationFn: registerRestaurant,
	})

	async function handleSignUp({
		restaurantName,
		managerName,
		email,
		phone,
	}: SignUpForm) {
		try {
			await registerRestaurantFn({
				restaurantName,
				managerName,
				email,
				phone,
			})

			toast.success('Restaurante cadastrado com sucesso!', {
				action: {
					label: 'Login',
					onClick: () => navigate(`/sign-in?email=${email}`),
				},
			})
		} catch {
			toast.error('Erro ao cadastrar estabelecimento.')
		}
	}

	return (
		<>
			<Helmet title="Cadastro" />
			<div className="p-8">
				<Button variant="ghost" asChild className="absolute right-8 top-8">
					<Link to="/sign-in">Fazer login</Link>
				</Button>

				<div className="w-[350px] flex flex-col justify-center gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Criar conta grátis
						</h1>
						<p className="text-sm text-muted-foreground">
							Seja um parceiro e comece suas vendas!
						</p>
					</div>

					<form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
						<div className="space-y-2">
							<Label htmlFor={restaurantInputId}>Nome do estabelecimento</Label>
							<Input
								{...register('restaurantName')}
								id={restaurantInputId}
								type="text"
								placeholder="Restaurante do João"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor={managerInputId}>Seu nome</Label>
							<Input
								{...register('managerName')}
								id={managerInputId}
								type="text"
								placeholder="João Silva"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor={emailInputId}>Seu e-mail</Label>
							<Input
								{...register('email')}
								id={emailInputId}
								type="email"
								placeholder="joao@exemplo.com"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor={phoneInputId}>Seu número de celular</Label>
							<Input
								{...register('phone')}
								id={phoneInputId}
								type="tel"
								placeholder="(99) 99999-9999"
							/>
						</div>

						<Button disabled={isSubmitting} className="w-full" type="submit">
							Finalizar cadastro
						</Button>

						<p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
							Ao continuar, você concorda com nossos{' '}
							<a
								href="#this-link-is-visual-only"
								className="hover:underline underline-offset-4 text-link"
							>
								Termos de serviço
							</a>{' '}
							e{' '}
							<a
								href="#this-link-is-visual-only"
								className="hover:underline underline-offset-4 text-link"
							>
								Políticas de privacidade
							</a>
							.
						</p>
					</form>
				</div>
			</div>
		</>
	)
}
