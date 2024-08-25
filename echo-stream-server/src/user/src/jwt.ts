import { JwtModule } from '@nestjs/jwt'

export const RegisterJwtModule = JwtModule.register({
  global: true,
  signOptions: {
    expiresIn: '7d' // token 有效期
  },
  secret: 'echo-stream'
})
