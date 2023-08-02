import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'
import { EEStatusCode } from '../enum/EEStatusCode'
import { EErrorMessage } from '../enum/EErrorMessage'

export function validateSchema(schema: AnyZodObject) {
	return async (request: Request, response: Response, next: NextFunction) => {
		try {
			await schema.parseAsync({
				body: request.body,
				query: request.query,
				params: request.params
			})

			return next()
		} catch (error) {
			if (error instanceof ZodError) {
				if (error.issues.length > 1) {
					const validationErrorMessages = error.issues.map(
						(error) => error.message
					)
					response
						.status(EEStatusCode.BAD_REQUEST)
						.json({ message: validationErrorMessages })
				} else {
					const validationErrorMessage = error.issues[0].message
					response
						.status(EEStatusCode.BAD_REQUEST)
						.json({ message: validationErrorMessage })
				}
			} else {
				return response
					.status(EEStatusCode.INTERNAL_SERVER_ERROR)
					.json({ message: EErrorMessage.UNKNOWN_ERROR })
			}
		}
	}
}
