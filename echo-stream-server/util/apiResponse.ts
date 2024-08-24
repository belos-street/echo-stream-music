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

export enum StatusCode {
  // 2xx
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  // 4xx
  BAD_REQUEST = 400, //参数错误
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405
}

export function successResponse<T>(data: T, message: string = 'Success'): ApiResponse<T> {
  return new ApiResponse(200, message, data)
}

export function errorResponse(message: string, status: StatusCode = StatusCode.BAD_REQUEST): ApiResponse<null> {
  return new ApiResponse(status, message, null)
}
