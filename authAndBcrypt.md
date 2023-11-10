### Bcrypt the password in MySql database
1. 
<code>
npm install bcrypt
npm install --save-dev @types/bcrypt

</code>
2. Update your create and update methods in your service to hash the password before storing it in the database. Here's an example using a UsersService:

<code>
// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;

    return this.prisma.user.create({ data: createUserDto, });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return this.prisma.user.update({ where: { id }, data: updateUserDto, });
  }
}

</code>

3. Update your login method to compare the plaintext password from the user request with the hashed password in the database:
<code>
//src/auth/auth.service.ts
import { AuthEntity } from './entity/auth.entity';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException, UnauthorizedException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return { accessToken: this.jwtService.sign({ userId: user.id }), };
  }
}
</code>

- Sources:

    Building a REST API with NestJS and Prisma: Authentication
    Build A Fullstack App with Remix, Prisma & MongoDB: Authentication



- Checking credentials with user entries in MySQL to login
  
1. To check user credentials in a MySQL database using Prisma, you would typically follow these steps:

2. Retrieve the user from the database using the provided username or email.
   Compare the provided password with the stored password in the database. If you're using a hashed password, you would use a library like bcrypt to compare the hashed password with the plaintext password.

#### example 

import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function checkCredentials(email: string, password: string) {
  // Retrieve the user with the provided email
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!user) {
    throw new Error('No such user found')
  }

  // Compare the provided password with the stored hashed password
  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    throw new Error('Invalid password')
  }

  return user
}

- comments 
In this example, bcrypt.compare is used to compare the plaintext password with the hashed password stored in the database. If the passwords match, the function returns the user data.
Please note that this is a simplified example and a real-world application would need to handle errors and edge cases appropriately.

bcrypt Docs
Prisma Docs: Reading data

- example Here's an example of how you might use Prisma in a Next.js API route to interact with a MySQL database:

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Next.js API route
export default async function handle(req, res) {
  const { title, content } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content,
    },
  })
  res.json(result)
}