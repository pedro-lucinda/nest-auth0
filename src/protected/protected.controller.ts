import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('protected')
@ApiSecurity('Auth0OAuth2')
@UseGuards(AuthGuard('jwt'))
@Controller('protected')
export class ProtectedController {
  @Get()
  @ApiOperation({ summary: 'Fetch the secret payload' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: { example: { userId: 'auth0|…', email: 'alice@example.com' } },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProtected(@Req() req: { user: { userId: string; email: string } }) {
    return { user: req.user };
  }
}
