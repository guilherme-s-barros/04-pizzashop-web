import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { Button } from './ui/button'
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileForm = z.object({
	name: z.string().min(1),
	description: z.string(),
})

type StoreProfileForm = z.infer<typeof storeProfileForm>

export function StoreProfile() {
	const formId = useId()
	const nameInputId = useId()
	const descriptionInputId = useId()

	const { data: managedRestaurant } = useQuery({
		queryKey: ['managed-restaurant'],
		queryFn: getManagedRestaurant,
	})

	const { handleSubmit, register } = useForm({
		resolver: zodResolver(storeProfileForm),
		values: {
			name: managedRestaurant?.name ?? '',
			description: managedRestaurant?.description ?? '',
		},
	})

	async function handleUpdateStoreProfile(formInputs: StoreProfileForm) {
		console.log(formInputs)
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Perfil da loja</DialogTitle>
				<DialogDescription>
					Visualize ou atualize as informações do seu estabelecimento visíveis
					ao seu cliente.
				</DialogDescription>
			</DialogHeader>

			<form
				id={formId}
				className="space-y-4 py-4"
				onSubmit={handleSubmit(handleUpdateStoreProfile)}
			>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label className="text-right" htmlFor={nameInputId}>
						Nome
					</Label>

					<Input
						{...register('name')}
						id={nameInputId}
						className="col-span-3"
						placeholder="Nome do seu estabelecimento"
					/>
				</div>

				<div className="grid grid-cols-4 items-start gap-4">
					<Label className="text-right" htmlFor={descriptionInputId}>
						Descrição
					</Label>

					<Textarea
						{...register('description')}
						id={descriptionInputId}
						rows={3}
						className="col-span-3"
						placeholder="Escreva uma breve descrição do seu estabelecimento (especialidades, ambiente, história, etc)."
					/>
				</div>
			</form>

			<DialogFooter>
				<DialogClose asChild>
					<Button type="button" variant="secondary">
						Cancelar
					</Button>
				</DialogClose>

				<DialogClose asChild>
					<Button type="submit" variant="success" form={formId}>
						Salvar
					</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	)
}
