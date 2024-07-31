export class ApiResponse<T> {
  status: number
  message: string
  data: T | null

  constructor(status: number, message: string, data?: T) {
    this.status = status
    this.message = message
    this.data = data || null
  }
}

export function successResponse<T>(data: T, message: string = 'Success'): ApiResponse<T> {
  return new ApiResponse(200, message, data)
}

export function errorResponse(message: string, status: number = 400): ApiResponse<null> {
  return new ApiResponse(status, message, null)
}
