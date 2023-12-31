import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IGetUsersPaginatedResponse } from '../../models/responses/user.respons';
import { User } from '../../schemas/users.schema';
import { ParamIdDto } from '../../shared/dto/param-id.dto';
import { AuthGuard } from '../authorization/guard/authorization.guard';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserTodoDto } from './dto/users-todos.dto';
import { UserService } from './users.service';

@ApiTags('USERS')
@ApiSecurity('JWT')
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {

  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }


  @Get('/paginated')
  async getUsersPaginated(@Query() query: GetUsersDto): Promise<IGetUsersPaginatedResponse> {
    const response = await this.userService.getUsersPaginated(query);
    return response;
  }

  @Get('/:id')
  async getUserById(@Param() param: ParamIdDto): Promise<User> {
    const response = await this.userService.getUserById(param.id);
    return response;
  }

  @Put('/:id/user')
  async updateUser(@Param() param: ParamIdDto, @Body() body: UpdateUserDto): Promise<User> {
    const response = await this.userService.updateUser(param.id, body);
    return response;
  }

  @Put('/add-todos')
  async addTodos(@Body() body: UserTodoDto): Promise<unknown> {
    console.log(1);
    const user = await this.userService.addTodos(body);
    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param() param: ParamIdDto): Promise<void> {
    await this.userService.deleteUser(param.id);
  }

}
