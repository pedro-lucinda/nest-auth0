import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const issuer = process.env.AUTH0_ISSUER_URL?.replace(/\/$/, '') ?? '';
  const audience = process.env.AUTH0_AUDIENCE!;
  const clientId = process.env.AUTH0_CLIENT_ID!;
  const redirectUrl = process.env.SWAGGER_REDIRECT_URL;

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('Protected endpoints for my NestJS app')
    .setVersion('1.0')
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          authorizationCode: {
            authorizationUrl: `${issuer}/authorize?audience=${audience}`,
            tokenUrl: `${issuer}/oauth/token`,
            scopes: {
              openid: 'OpenID Connect scope',
              profile: 'Your user profile',
              email: 'Your user email',
            },
          },
        },
      },
      'Auth0OAuth2',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.security = [{ Auth0OAuth2: [] }];

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      oauth2RedirectUrl: redirectUrl,
      initOAuth: {
        clientId,
        usePkceWithAuthorizationCodeGrant: true,
      },
      persistAuthorization: true,
    },
  });
}
