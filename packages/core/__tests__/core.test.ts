import { NestFactory } from '@nestjs/core'
import { Module } from '@nestjs/common';
import { GraphQLModule } from '../lib'
@Module({
    imports: [
        GraphQLModule.forRoot()
    ]
})
export class AppModule { }
export async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.listen(9000)
}

bootstrap();