import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Get,
  Req,
  Query,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { NotNullPipe } from './pipes/not-null.pipe';
import { AuthUserDTO } from './dto/auth-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  signup(@Body(ValidationPipe) createUserDTO: CreateUserDTO) {
    return this.authService.signup(createUserDTO);
  }

  @Post('/signin')
  async signin(@Body(ValidationPipe) authUserDTO: AuthUserDTO) {
    return this.authService.signin(authUserDTO);
  }

  @Get('/refresh')
  async refreshToken(@Query('accessToken', NotNullPipe) accessToken: string) {
    console.log(accessToken);
    return this.authService.refreshToken(accessToken);
  }
}
