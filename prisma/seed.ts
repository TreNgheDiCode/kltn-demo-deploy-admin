import { Country, PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  try {
    await db.school.createMany({
      data: [
        {
          logo: "https://files.edgestore.dev/ej1zo8o303l788n0/publicFiles/_public/cd3d286b-e57f-4165-a9fd-109d6126c012.jpg",
          background:
            "https://utfs.io/f/edca68a3-f850-41b2-801c-2351a0f65b08-zi32f6.png",
          name: "International School Canada",
          short:
            "The University of the Fraser Valley (UFV), established in 1974, is located in Abbotsford, British Columbia, Canada, with additional campuses in Chilliwack, Mission, Hope, and India. It offers over 100 training programs in various fields, including Arts, Humanities, Social Sciences, Education, Science, and Technology. The university has been ranked as one of Canada's top comprehensive universities by Maclean's magazine for 14 consecutive years and is recognized as one of the top 10 undergraduate research universities in Canada. UFV is committed to providing a supportive and inclusive learning environment, offering financial support opportunities and scholarships to students.",
          description: "Test",
          history: "Test",
          color:
            "linear-gradient(270deg, rgba(255,255,255,1) 80%, rgba(14,70,145,1) 100%)",
          isPublished: true,
          country: Country.CANADA,
        },
        {
          logo: "https://utfs.io/f/7317e9f8-b11f-4bd3-974b-f7caa344a9d2-jlxnzo.jpg",
          background:
            "https://utfs.io/f/98263804-6bb4-4ed5-99d8-aa2be115cf76-csekpy.png",
          name: "Metropolitan International",
          short:
            "The University of the Fraser Valley (UFV), established in 1974, is located in Abbotsford, British Columbia, Canada, with additional campuses in Chilliwack, Mission, Hope, and India. It offers over 100 training programs in various fields, including Arts, Humanities, Social Sciences, Education, Science, and Technology. The university has been ranked as one of Canada's top comprehensive universities by Maclean's magazine for 14 consecutive years and is recognized as one of the top 10 undergraduate research universities in Canada. UFV is committed to providing a supportive and inclusive learning environment, offering financial support opportunities and scholarships to students.",
          description: "Test",
          history: "Test",
          color:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
          isPublished: true,
          country: Country.KOREA,
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
