import {
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CookieOptions, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { FirebaseService } from './firebase.service';
import { UsersService } from 'src/users/users.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  cookieOptions: CookieOptions = {
    maxAge: 60 * 60 * 24 * 5 * 1000,
    secure: false,
    httpOnly: true,
  };

  constructor(
    private authService: AuthService,
    @Inject(FirebaseService) private firebaseService: FirebaseService,
    private usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(AuthGuard)
  @Post()
  async sessionLogin(@Req() req, @Res() res: Response) {
    const cookie = await this.authService.createSessionCookie(
      req.token,
      this.cookieOptions,
    );

    res.cookie(cookie.name, cookie.value, this.cookieOptions);
    res.send({ status: 'success' });
  }

  @Public()
  @Get()
  async getSession(@Req() req, @Res() res) {
    const session = this.firebaseService.extractSessionCookie(req);
    if (!session) {
      res.status(401).send({ isLogged: false });
    }

    const decodedToken = await this.firebaseService
      .getAuth()
      .verifySessionCookie(session);

    if (!decodedToken) {
      res.status(401).send({ isLogged: false });
    }

    const user = await this.usersService.findOne(decodedToken.uid);

    res.status(200).send({
      user: {
        ...user,
        name: `${user?.firstName} ${user?.lastName}`,
      },
    });
  }

  @Delete()
  async deleteSession(@Req() req, @Res() res) {
    await this.authService.deleteSession(req, res, this.cookieOptions);
  }
}
