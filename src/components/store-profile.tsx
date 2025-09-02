import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { updateProfile } from '@/api/update-profile'
import { useManagedRestaurantQuery } from '@/hooks/use-managed-restaurant-query'
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

import type { GetManagedRestaurantResponse } from '@/api/get-managed-restaurant'

const storeProfileForm = z.object({
	name: z.string().min(1),
	description: z.string(),
})

type StoreProfileForm = z.infer<typeof storeProfileForm>

export function StoreProfile() {
	const formId = useId()
	const nameInputId = useId()
	const descriptionInputId = useId()

	const queryClient = useQueryClient()

	const { data: managedRestaurant } = useManagedRestaurantQuery()

	const { mutateAsync: updateProfileFn } = useMutation({
		mutationFn: updateProfile,
		onSuccess(_, updatedProfile) {
			const { name, description } = updatedProfile

			queryClient.setQueryData<GetManagedRestaurantResponse>(
				['managed-restaurant'],
				(cached) => {
					if (!cached) {
						return
					}

					return {
						...cached,
						name,
						description,
					}
				},
			)
		},
	})

	const { handleSubmit, register, formState } = useForm({
		resolver: zodResolver(storeProfileForm),
		values: {
			name: managedRestaurant?.name ?? '',
			description: managedRestaurant?.description ?? '',
		},
	})

	const { isSubmitting } = formState

	async function handleUpdateProfile({ name, description }: StoreProfileForm) {
		try {
			await updateProfileFn({
				name,
				description,
			})

			toast.success('Perfil atualizado com sucesso!')
		} catch {
			toast.error('Falha ao atualizar o perfil. Tente novamente mais tarde.')
		}
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
				onSubmit={handleSubmit(handleUpdateProfile)}
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
						className="col-span-3 min-h-20"
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

				<Button
					type="submit"
					variant="success"
					form={formId}
					disabled={isSubmitting}
				>
					Salvar
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
