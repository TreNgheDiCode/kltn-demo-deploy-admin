import { createSeedClient } from "@snaplet/seed";
import { copycat } from "@snaplet/copycat";
import crypto from "crypto";

const seed = await createSeedClient({
  dryRun: process.env.DRY !== "0",
});

// Reset database những giữ lại cấu trúc
await seed.$resetDatabase();

// x = Số dữ liệu random sẽ seed

const schools = await seed.schools((x) =>
  x(5, {
    logo: (ctx) => copycat.url(ctx.seed, { limit: 1000 }),
    background: (ctx) => copycat.url(ctx.seed, { limit: 1000 }),
    schoolLocations: [
      {
        cover: (ctx) => copycat.url(ctx.seed, { limit: 1000 }),
        schoolLocationImagesByLocationId: [{}],
        schoolLocationContactsByLocationId: [{}],
      },
    ],
    schoolPrograms: [
      {
        cover: (ctx) => copycat.url(ctx.seed, { limit: 1000 }),
        schoolProgramImagesByProgramId: [{}],
      },
    ],
    schoolGalleries: [
      {
        schoolGalleryImagesByGalleryId: [{}],
      },
    ],
  })
);

await seed.accounts(
  (x) =>
    x(10, {
      id: (ctx) => copycat.uuid(ctx.seed),
      name: (ctx) => `${copycat.fullName(ctx.seed)}`,
      password: (ctx) =>
        `${copycat.password(ctx.seed)}${copycat.password(ctx.seed)}`,
      email: ({ seed }) => `${copycat.email(seed, { domain: "gmail.com" })}`,
      phoneNumber: (ctx) =>
        copycat.phoneNumber(ctx.seed, { length: 12, prefixes: ["+84"] }),
      idCardNumber: crypto
        .randomInt(1000_0000_0000, 1_0000_0000_0000)
        .toString(),
      dob: (ctx) => copycat.dateString(ctx.seed),
      image: (ctx) => copycat.url(ctx.seed, { limit: 1000 }),
      address: (ctx) =>
        `${copycat.streetAddress(ctx.seed)} ${copycat.streetName(
          ctx.seed
        )}, ${copycat.city(ctx.seed)}, ${copycat.country(ctx.seed)}`,
      twoFactorConfirmations: [{}],
      students: (x) =>
        x(1, {
          id: (ctx) => copycat.uuid(ctx.seed),
          studentCode: () => `24DH${crypto.randomInt(100_000, 1_000_000)}`,
          certificateImg: (ctx) => copycat.url(ctx.seed, { limit: 1000 }),
          gradeScore: (ctx) => copycat.float(ctx.seed, { min: 0, max: 4 }),
          cover: (ctx) => copycat.url(ctx.seed, { limit: 1000 }),
          studentSchoolPrograms: [
            {
              program: (ctx) =>
                ctx.connect(({ $store }) => $store.schoolPrograms[0]),
            },
          ],
          profiles: [
            {
              posts: [
                {
                  postSaves: [
                    {
                      profile: (ctx) =>
                        ctx.connect(({ store }) => store.profiles[0]),
                    },
                  ],
                  postComments: [
                    {
                      id: (ctx) => copycat.uuid(ctx.seed),
                      profile: (ctx) =>
                        ctx.connect(({ store }) => store.profiles[0]),
                      image: (ctx) => copycat.url(ctx.seed, { limit: 1000 }),
                      postCommentLikes: [
                        {
                          id: (ctx) => copycat.uuid(ctx.seed),
                          profile: (ctx) =>
                            ctx.connect(({ $store }) => $store.profiles[0]),
                        },
                      ],
                    },
                  ],
                  postImages: [{}],
                  postLikes: [
                    {
                      profile: (ctx) =>
                        ctx.connect(({ store }) => store.profiles[0]),
                    },
                  ],
                  postShares: [
                    {
                      profile: (ctx) =>
                        ctx.connect(({ store }) => store.profiles[0]),
                    },
                  ],
                },
              ],
              profileBiographies: [
                {
                  profileBiographySocials: [{}],
                  profileBiographyAreasByBiographyId: [{}],
                },
              ],
              profileBlogs: [
                {
                  profileBlogImages: [{}],
                },
              ],
              profileGroups: [
                {
                  group: {
                    owner: (ctx) =>
                      ctx.connect(({ store }) => store.profiles[0]),
                  },
                },
              ],
              eventProfiles: [
                {
                  event: {
                    host: (ctx) =>
                      ctx.connect(({ store }) => store.profiles[0]),
                  },
                },
              ],
            },
          ],
        }),
    }),
  { connect: schools }
);
