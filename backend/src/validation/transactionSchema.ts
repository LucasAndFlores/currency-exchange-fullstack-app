import { z } from 'zod'

export const transactionSchema = z.object({
	body: z.object({
		fromCurrency: z
			.string({
				required_error: 'fromCurrency is required and should be uppercase'
			})
			.max(3),
		amountToConvert: z
			.number({
				required_error:
					'amountToConvert is required and should be higher than 0'
			})
			.positive(),
		destinationCurrency: z
			.string({
				required_error:
					'destinationCurrency is required and should be uppercase'
			})
			.max(3)
	})
})
