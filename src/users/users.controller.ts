import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.gaurd';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) // Only admins can access this
  @Get('admin')
  getAdminData() {
    return { message: 'Admin-only data' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserProfile() {
    return { message: 'User profile data' };
  }
}
