import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import React from 'react'

import type { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

interface DateRangePickerProps extends React.ComponentProps<'div'> {
	date?: DateRange
	onDateChange(date?: DateRange): void
}

export function DateRangePicker({
	className,
	date,
	onDateChange,
	...props
}: DateRangePickerProps) {
	const popoverButtonId = React.useId()

	return (
		<div className={cn('grid gap-2', className)} {...props}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id={popoverButtonId}
						variant="outline"
						className={cn(
							'w-[300px] justify-start text-left font-normal',
							!date && 'text-muted-foreground',
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, 'dd MMM, yyyy', { locale: ptBR })} -{' '}
									{format(date.to, 'dd MMM, yyyy', { locale: ptBR })}
								</>
							) : (
								format(date.from, 'dd MMM, yyyy', { locale: ptBR })
							)
						) : (
							'Selecione um período'
						)}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						autoFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={onDateChange}
						numberOfMonths={2}
						locale={ptBR}
						max={7}
						disabled={{ after: new Date() }}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
