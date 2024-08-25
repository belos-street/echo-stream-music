import { JwtService } from '@nestjs/jwt'
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import type { Request } from 'express'
import type { Observable } from 'rxjs'

/**
 * 从请求头中读取JWT Token，并使用JwtService验证Token的有效性。
 * - 如果Token有效，它将把解码后的用户信息附加到请求对象上，从而允许请求继续执行；
 * - 如果Token无效或格式不正确，则抛出异常，阻止请求继续;
 */
@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const authorization = request.header('authorization') || ''
    const bearer = authorization.split(' ')
    if (!bearer || bearer.length < 2) throw new UnauthorizedException('unauthorized')
    const token = bearer[1]

    try {
      const info = this.jwtService.verify(token)
      console.log(info)
      ;(request as any).user = info.user
      return true
    } catch (e) {
      throw new UnauthorizedException('unauthorized')
    }
  }
}
