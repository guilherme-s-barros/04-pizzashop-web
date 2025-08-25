import { zodResolver } from '@hookform/resolvers/zod'
import { useId } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
	email: z.email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
	const emailInputId = useId()

	const { handleSubmit, register, formState } = useForm({
		resolver: zodResolver(signInForm),
	})

	const { isSubmitting } = formState

	async function handleSignIn(data: SignInForm) {
		try {
			console.log(data.email)

			await new Promise((resolve) => setTimeout(resolve, 1000))
			toast.success('Enviamos um link de autenticação para seu e-mail.', {
				action: {
					label: 'Reenviar',
					onClick: () => handleSignIn(data),
				},
			})
		} catch {
			toast.error('Credenciais inválidas.')
		}
	}

	return (
		<>
			<Helmet title="Login" />
			<div className="p-8">
				<Button variant="ghost" asChild className="absolute right-8 top-8">
					<Link to="/auth/sign-up">Novo estabelecimento</Link>
				</Button>

				<div className="w-[350px] flex flex-col justify-center gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Acessar painel
						</h1>

						<p className="text-sm text-muted-foreground">
							Acompanhe suas vendas pelo painel do parceiro!
						</p>
					</div>

					<form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
						<div className="space-y-2">
							<Label htmlFor={emailInputId}>Seu e-mail</Label>
							<Input
								{...register('email')}
								id={emailInputId}
								type="email"
								placeholder="johndoe@example.com"
							/>
						</div>

						<Button disabled={isSubmitting} className="w-full" type="submit">
							Acessar painel
						</Button>
					</form>
				</div>
			</div>
		</>
	)
}
