import { Country, PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  try {
    await db.school.createMany({
      data: [
        {
          logo: "https://utfs.io/f/7fe89f50-7db2-4b9b-93fd-829532ba21ed-nm33wo.jpg",
          background:
            "https://utfs.io/f/edca68a3-f850-41b2-801c-2351a0f65b08-zi32f6.png",
          name: "HUFLIT AMERICA",
          color: "#9fff5b",
          isPublished: true,
          country: Country.CANADA,
        },
        {
          logo: "https://utfs.io/f/7317e9f8-b11f-4bd3-974b-f7caa344a9d2-jlxnzo.jpg",
          background:
            "https://utfs.io/f/98263804-6bb4-4ed5-99d8-aa2be115cf76-csekpy.png",
          name: "Metropolitan International",
          color: "#003234",
          isPublished: true,
          country: Country.CANADA,
        },
      ],
    });

    const schools = await db.school.findMany();

    await db.schoolProgram.createMany({
      data: [
        {
          name: "UI UX Design Specialist",
          description: "Test",
          cover:
            "https://utfs.io/f/1ddd79dd-dbf9-4841-aa39-fd363ad66639-i4sqms.png",
          isPublished: true,
          schoolId: schools[0].id,
        },
        {
          name: "Khoa Học Máy Tính",
          description: "Test",
          cover:
            "https://utfs.io/f/e5f5624d-5d06-458a-a2eb-9b11e21447eb-1yjes.jpg",
          isPublished: true,
          schoolId: schools[1].id,
        },
      ],
    });

    console.log("success");
  } catch (error) {
    console.log("Error Seeding", error);
  } finally {
    await db.$disconnect();
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
