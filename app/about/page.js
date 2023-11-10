import react from "react";
import prisma from '../../lib/prisma'

const About = async () => {
  const userList = await prisma.user.findMany({});

  return (
    <>
      <div>
        <h1>User List</h1>
        <main>
          {userList.map((user) => (
            <div key={user.id}>
             {user.name} {/* <About post={user} /> */}
            </div>
          ))}
        </main>
      </div>
    </>
  )
   


}

export default About;