export class DatabaseError {
	statusCode: number
	errorResponse: string

	constructor(statusCode: number, errorResponse: string) {
		this.errorResponse = errorResponse
		this.statusCode = statusCode
	}
}
