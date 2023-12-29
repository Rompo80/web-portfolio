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


  // jwt: {
  //   async encode({ secret, token }) {
  //     if (!token) {
  //       throw new Error('No token to encode');
  //     }
  //     return jwt.sign(token, secret);
  //   },
  //   async decode({ secret, token }) {
  //     if (!token) {
  //       throw new Error('No token to decode');
  //     }
  //     const decodedToken = jwt.verify(token, secret);
  //     if (typeof decodedToken === 'string') {
  //       return JSON.parse(decodedToken);
  //     } else {
  //       return decodedToken;
  //     }
  //   },
  // },

  ///////
  //"use client";
// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// const GahbiPage = () => {
//   const [apiImages, setClientImages] = useState([]);
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get("id");
//   const userId = searchParams.get("userId");

//   useEffect(() => {
//     const getImages = async () => {
//       try {
//         const result = await fetch(`/api/client/${sessionId}/${userId}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!result.ok) {
//           throw new Error(`Error: ${result.status} - ${result.statusText}`);
//         }

//         setClientImages(await result.json());
//       } catch (error) {
//         console.error("There was an error reading the database", error);
//       }
//     };

//     getImages();
//   }, [sessionId, userId]);



<!-- "use client";
import React from "react";
import classes from "@styles/login.module.css";
import { useSession } from "next-auth/react";
import Dashboard from "@components/Dashboard";
import { useRouter, usePathname, useParams } from "next/navigation";


const ProtectedLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const { data: session, status } = useSession();
  
 
  const userName = decodeURIComponent(params.uImages[0])
  const userPath = "/"+userName+"/"+params.uImages[1]+"/"+params.uImages[2]
  // console.log(userPath);
  if (status !== "authenticated") {
    router.push("/signin");
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Dashboard classes={classes} pathname={userPath} session={session} />
      {!session || userPath !== pathname.replace("/clients", "") ? (
        <div>This is protected and you do not have access to it.</div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ProtectedLayout; -->

<!-- import { useState } from 'react'
import Image from "next/image";


 
const names = ['Tim', 'Joe', 'Bel', 'Lee']
 
export default function Page() {
  const [results, setResults] = useState()
 
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={async (e) => {
          const { value } = e.currentTarget
          // Dynamically load fuse.js
          const Fuse = (await import('@public/assets/img/')).default
          const fuse = new Fuse(names)
 
          setResults(fuse.search(value))
        }}
      />
      <pre>Results: {JSON.stringify(results, null, 2)}</pre>
    </div>
  )
} -->





// import classes from "@styles/gallery.module.css";
// import Image from "next/image";


 <!-- const GetPortfolio = ({ params }) => {
const pathname = params.category;


 let listPathname = `@public/assets/img/${pathname}`;



 

 const imageContext = require.context(`@public/assets/img/editorial`, false, /\.(webp)$/); -->

//   const images = imageContext.keys().map((key, index) => ({
//     id: index,
//     src: imageContext(key).default,
//     alt: key.replace(/^.*[\\/]/, "").split(".")[0], // Extract filename without extension
//   }));

//   console.log(images);

  


<!-- 
//   return (
//     <main>
//       <header className={classes.container_header}>
//         <h2>{path}</h2>
//       </header>
//       <section className={classes.container_grid}>
//         {!images ? (
//           images.map((image) => (
//             <div key={image.id}>
//               <Image src={image.src} alt={image.alt} />
//             </div>
//           ))
//         ) : (
//           <p>No images</p>
//         )}
//       </section>
//     </main>
//   );
// }; -->

// export default GetPortfolio;
