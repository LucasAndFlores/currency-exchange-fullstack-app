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
				response.status(EEStatusCode.BAD_REQUEST).json(error)
			} else {
				return response
					.status(EEStatusCode.INTERNAL_SERVER_ERROR)
					.json({ message: EErrorMessage.UNKNOWN_ERROR })
			}
		}
	}
}
