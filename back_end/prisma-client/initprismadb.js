const {hashPassword} = require("../utils/hashpassword");
const prisma = require("../prisma-client/prismainstance");
const main = async () => {
  await prisma.file.deleteMany({});
  await prisma.folder.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedpassword = await hashPassword("123456789");
  const user = await prisma.user.create({
    data: {
      username: "dlara0000",
      email: "testing@gmail.com",
      firstname: "David",
      lastname: "Lara",
      password: hashedpassword,
      folders: {
        create: {
          name: "root",
        },
      },
    },
  });

  const testUser = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
    include: {
      folders: {
        where: {
          parentfolder: null,
        },
      },
    },
  });

  let filenames = ["file1", "file2", "file3", "file4", "file5", "file6"];
  await Promise.all(
    filenames.map(async (name) => {
      await prisma.file.create({
        data: {
          name: name,
          ownerid: testUser.id,
          folderid: testUser.folders[0].id,
          url: name,
          size: 0,
          mimetype: "json",
          cloudinarypublicid: "poop",
        },
      });
    })
  );

  console.log("DB populated!")
};

main();
