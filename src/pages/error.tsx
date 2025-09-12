import { Link, useRouteError } from 'react-router'

export function ErrorPage() {
	const error = useRouteError() as Error

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-2">
			<h1 className="text-4xl font-bold">Ops! Algo deu errado. 😢</h1>

			<p className="text-accent-foreground">
				Houve um erro inesperado na aplicação. Abaixo, você encontra mais
				detalhes:
			</p>

			<pre>{error.message || JSON.stringify(error)}</pre>

			<p className="text-accent-foreground">
				Voltar para o{' '}
				<Link to="/" className="hover:underline text-link">
					Dashboard
				</Link>
			</p>
		</div>
	)
}
