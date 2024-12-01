import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { AuthModule } from './auth/auth.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { DictionaryResolver } from './dictionary/dictionary.resolver';
import { DictionaryModule } from './dictionary/dictionary.module';
import { WordModule } from './word/word.module';
import { MeaningModule } from './meaning/meaning.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      formatError: (error: GraphQLError) => {
        if (error?.extensions?.originalError) {
          const newError: GraphQLFormattedError = {
            message: (error.extensions.originalError as { message: string })
              .message,
          };
          return newError;
        }

        return {
          message: error.message,
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: configService.get('DB_PORT'),
        host: configService.get('DB_HOST'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [],
        synchronize: true,
        autoLoadEntities: true,
      }),

      inject: [ConfigService],
    }),
    AuthModule,
    DictionaryModule,
    WordModule,
    MeaningModule,
  ],
  providers: [BcryptService],
})
export class AppModule {}
