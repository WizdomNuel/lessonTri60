import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { PaymentsModule } from './payments/payments.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { GamificationModule } from './gamification/gamification.module';
import { LiveClassesModule } from './live-classes/live-classes.module';
import { LearningPathsModule } from './learning-paths/learning-paths.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    QuizzesModule,
    PaymentsModule,
    AssignmentsModule,
    GamificationModule,
    LiveClassesModule,
    LearningPathsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
