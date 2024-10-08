INSERT INTO
  public."School" (
    id,
    logo,
    background,
    name,
    short,
    description,
    history,
    color,
    "isPublished",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    '0d60d974-ccc5-52e2-92df-f2158c203251',
    'https://equalsuccess.com',
    'https://disillusion-lambkin.biz',
    'Handcrafted Steel Fish',
    'Multi-channelled global methodology',
    'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
    'Et sed at gere perfecta cur si, alitas omnem posset ad illabor melius.',
    '#6a331f',
    DEFAULT,
    DEFAULT,
    '2020-12-24T23:58:07.000Z'
  ),
  (
    '732050b9-8d5b-5f8b-96af-081fda80a6b1',
    'https://brewloaf.net',
    'https://densemolasses.org',
    'Modern Metal Computer',
    'Proactive global complexity',
    'Bosto''s most advanced compression wear technology increases muscle oxygenation,stabilizes active muscles',
    'Nec esset sine vituptatem turamice excelsuscep facille dissentior, a in caret se nihillum.',
    '#634d40',
    DEFAULT,
    DEFAULT,
    '2020-10-06T21:34:08.000Z'
  ),
  (
    '811b24b2-0735-5370-bab3-a121a8a6df5b',
    'https://meager-justice.biz',
    'https://sneaky-lipid.biz',
    'Recycled Concrete Chair',
    'Multi-channelled global methodology',
    'New ABC 13 9370,13.3,5th Gen CoreA5-8250U,8GB RAM,256GB SSD,power UHD Graphics,OS 10 Home,OS Office A & J 2016',
    'Vitae incidant quo torquem acut, collegition untur mediocrisque dissentiam bonisse bene sic e.',
    '#3e0227',
    DEFAULT,
    DEFAULT,
    '2020-02-02T13:37:29.000Z'
  ),
  (
    'a0ee7de9-f467-5307-a0df-2caa7366413f',
    'https://air-lung.biz',
    'https://notable-windage.com',
    'Intelligent Cotton Soap',
    'Automated mission-critical collaboration',
    'New ABC 13 9370,13.3,5th Gen CoreA5-8250U,8GB RAM,256GB SSD,power UHD Graphics,OS 10 Home,OS Office A & J 2016',
    'Dicemus maxim me ius quam sapiendi minus aut.',
    '#036c7d',
    DEFAULT,
    DEFAULT,
    '2020-09-21T20:20:48.000Z'
  ),
  (
    '27068fbc-28ec-59f5-b77c-06761ab3db0e',
    'https://stunning-objective.com',
    'https://dismalsandbar.com',
    'Oriental Soft Salad',
    'Progressive neutral Graphical User Interface',
    'Bosto''s most advanced compression wear technology increases muscle oxygenation,stabilizes active muscles',
    'Suavitus nonne dem ferat et, ine refere doctioresque renove illae qui potesset.',
    '#401552',
    DEFAULT,
    DEFAULT,
    '2020-02-10T13:35:04.000Z'
  );

INSERT INTO
  public."SchoolProgram" (
    id,
    name,
    description,
    cover,
    "isPublished",
    "schoolId",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    '07d48601-8d99-5e76-bedd-442bf7fd0fd9',
    'Bespoke Cotton Ball',
    'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes,that started with the 1984 ABC800J',
    'https://enchanting-alert.info',
    DEFAULT,
    '0d60d974-ccc5-52e2-92df-f2158c203251',
    DEFAULT,
    '2020-03-27T02:30:38.000Z'
  ),
  (
    '1f20b3ef-fd4b-51b1-b4be-c754576c773c',
    'Handmade Frozen Pizza',
    'New ABC 13 9370,13.3,5th Gen CoreA5-8250U,8GB RAM,256GB SSD,power UHD Graphics,OS 10 Home,OS Office A & J 2016',
    'https://invertbrother-in-law.com',
    DEFAULT,
    '732050b9-8d5b-5f8b-96af-081fda80a6b1',
    DEFAULT,
    '2020-08-16T19:57:08.000Z'
  ),
  (
    '37c78c94-2895-58df-b92b-2bb6486b2885',
    'Practical Concrete Gloves',
    'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
    'https://husk-administrator.org',
    DEFAULT,
    '811b24b2-0735-5370-bab3-a121a8a6df5b',
    DEFAULT,
    '2020-05-05T16:10:22.000Z'
  ),
  (
    '0e17155e-a879-57f4-ac1f-769af26214f0',
    'Unbranded Plastic Ball',
    'The beautiful range of Apple Natural├⌐ that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
    'https://unacceptableaccountability.org',
    DEFAULT,
    'a0ee7de9-f467-5307-a0df-2caa7366413f',
    DEFAULT,
    '2020-01-13T12:43:47.000Z'
  ),
  (
    '07386882-3a0b-54c0-9b62-ed3d82ccdda3',
    'Practical Concrete Chips',
    'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
    'https://curvybomb.net',
    DEFAULT,
    '27068fbc-28ec-59f5-b77c-06761ab3db0e',
    DEFAULT,
    '2020-01-01T12:12:42.000Z'
  );

INSERT INTO
  public."SchoolProgramImages" (id, url, "programId")
VALUES
  (
    '03c1a653-71e9-59f1-bb5d-99622c4e3a75',
    'https://loremflickr.com/640/480',
    '07d48601-8d99-5e76-bedd-442bf7fd0fd9'
  ),
  (
    '5af009ab-05d1-5b32-90f1-927d8369531f',
    'https://loremflickr.com/640/480',
    '1f20b3ef-fd4b-51b1-b4be-c754576c773c'
  ),
  (
    'bc122077-f9ac-5ded-bb6c-e5ead67222ab',
    'https://loremflickr.com/640/480',
    '37c78c94-2895-58df-b92b-2bb6486b2885'
  ),
  (
    '7ee37ab0-7ba2-535b-8976-832df5f1eb74',
    'https://loremflickr.com/640/480',
    '0e17155e-a879-57f4-ac1f-769af26214f0'
  ),
  (
    '436953d7-e7d5-5849-a13d-3d6968feb80e',
    'https://loremflickr.com/640/480',
    '07386882-3a0b-54c0-9b62-ed3d82ccdda3'
  );

INSERT INTO
  public."SchoolLocation" (
    id,
    cover,
    name,
    address,
    "isMain",
    "schoolId",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    '78b3dc4e-1d68-5bbb-b9ab-a967fc95ce87',
    'https://excitingprincess.com',
    '329',
    '123 Barton Villages, Palm Harbor 6721, Iceland',
    DEFAULT,
    '0d60d974-ccc5-52e2-92df-f2158c203251',
    DEFAULT,
    '2020-08-08T19:12:01.000Z'
  ),
  (
    '8a312621-a444-52e0-99fe-8bf572755afe',
    'https://expropriate-leap.info',
    '7795',
    '185 Daugherty Ports, Antioch 5894, Peru',
    DEFAULT,
    '732050b9-8d5b-5f8b-96af-081fda80a6b1',
    DEFAULT,
    '2020-09-05T20:47:06.000Z'
  ),
  (
    '64b60a96-4c8f-5e87-9773-c73f0c83df95',
    'https://light-slope.net',
    '6719',
    '496 Murphy Radial, Pharr 7795, Armenia',
    DEFAULT,
    '811b24b2-0735-5370-bab3-a121a8a6df5b',
    DEFAULT,
    '2020-11-27T23:02:45.000Z'
  ),
  (
    '248e2043-74a4-5fc2-b715-e91cf656d7f8',
    'https://impress-tusk.net',
    '8926',
    '252 Aidan Centers, Rowlett 9363, Virgin Islands, U.S.',
    DEFAULT,
    'a0ee7de9-f467-5307-a0df-2caa7366413f',
    DEFAULT,
    '2020-01-25T00:51:54.000Z'
  ),
  (
    '3f17880e-141b-509f-aa22-856f76f50729',
    'https://little-astrology.info',
    '530',
    '516 Benedict Greens, Milford 8988, Sao Tome and Principe',
    DEFAULT,
    '27068fbc-28ec-59f5-b77c-06761ab3db0e',
    DEFAULT,
    '2020-05-25T16:44:23.000Z'
  );

INSERT INTO
  public."SchoolLocationImage" (id, url, "locationId")
VALUES
  (
    '73966245-7a35-5344-a41d-edd883c1eaef',
    'https://loremflickr.com/640/480',
    '78b3dc4e-1d68-5bbb-b9ab-a967fc95ce87'
  ),
  (
    '360ef68d-4f46-581c-9ee9-9bd473b502e5',
    'https://loremflickr.com/640/480',
    '8a312621-a444-52e0-99fe-8bf572755afe'
  ),
  (
    'a5a20fa5-dd1e-517b-b800-70db29e10b11',
    'https://loremflickr.com/640/480',
    '64b60a96-4c8f-5e87-9773-c73f0c83df95'
  ),
  (
    '7d06c2ba-1513-5ee2-9a29-c946e4fdcdd8',
    'https://loremflickr.com/640/480',
    '248e2043-74a4-5fc2-b715-e91cf656d7f8'
  ),
  (
    '8348d8b9-e82d-55f7-8489-d090b93511c1',
    'https://loremflickr.com/640/480',
    '3f17880e-141b-509f-aa22-856f76f50729'
  );

INSERT INTO
  public."SchoolLocationFeedback" (
    id,
    phone,
    hours,
    fax,
    email,
    url,
    "locationId",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    '4dac37dd-ac78-57cf-a32b-474b58b8cf7a',
    '+646153200963129',
    'Privationi natur hominflammat et e.',
    '48:96:0e:c9:5f:10',
    'Julien.Funk55022@popular-pipe.com',
    'c194cf1f-93aa-546f-91eb-97eaf95c098e',
    '78b3dc4e-1d68-5bbb-b9ab-a967fc95ce87',
    DEFAULT,
    '2020-04-20T16:03:41.000Z'
  ),
  (
    '97b670e3-cea1-5244-ab5a-d0dcdb6594ba',
    '+235191083212372',
    'Ius intellegam postulant sanos etur cum it mihi.',
    '4a:8f:4e:f5:4c:2c',
    'Faustino.Kertzmann3063@fuzzysow.net',
    'c12d7371-ffbd-5cf9-bf2d-06bb9e25fb72',
    '8a312621-a444-52e0-99fe-8bf572755afe',
    DEFAULT,
    '2020-03-03T02:04:01.000Z'
  ),
  (
    '7987b661-04cc-5482-ab9f-c7c321f161dc',
    '+124646834462875',
    'Futur cum a eo ante alique cum, non eo quod movet sed primum requietis numquam.',
    '07:8b:a7:33:75:05',
    'Aron.Volkman30592@boilanniversary.biz',
    '5f084af4-fce3-55a2-9a64-66643998b731',
    '64b60a96-4c8f-5e87-9773-c73f0c83df95',
    DEFAULT,
    '2020-09-01T20:10:55.000Z'
  ),
  (
    '9a9f3c8b-4b0b-5562-a659-79fec590bba4',
    '+121022030787733',
    'Aper ego propriae consententia multa, graeca non audiret fortas offenditur sicut.',
    'e1:f7:01:26:d2:b9',
    'Angie.Paucek36430@pivotfaculty.info',
    '98de959e-ce95-5b9a-974c-f9ad7e24ba24',
    '248e2043-74a4-5fc2-b715-e91cf656d7f8',
    DEFAULT,
    '2020-09-09T20:46:57.000Z'
  ),
  (
    '9fc8c961-23b9-5136-b14c-bcef6deafab1',
    '+358662854153278',
    'Sunt de inem uberga seditura aut neque perpetua.',
    '4c:0e:3a:f9:d3:da',
    'Daija_Hahn24216@titivatepinstripe.name',
    '72c00605-2739-52b6-8033-2caf7980d699',
    '3f17880e-141b-509f-aa22-856f76f50729',
    DEFAULT,
    '2020-04-12T15:14:44.000Z'
  );

INSERT INTO
  public."SchoolGallery" (
    id,
    name,
    description,
    "schoolId",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    'd5950c88-9296-599c-9dad-42a6e97ec6b9',
    'Sonny Miller',
    'Careat nos sint inquit voluptas, in perturma qui si huius.',
    '0d60d974-ccc5-52e2-92df-f2158c203251',
    DEFAULT,
    '2020-06-02T18:06:05.000Z'
  ),
  (
    '242faa10-e85a-5ec2-a1f0-0f954e4fff9b',
    'Kaylee Bogisich',
    'Itus cupis quidamicip tali es, distinent simplicetiam vulgo in posid contentiae quae.',
    '732050b9-8d5b-5f8b-96af-081fda80a6b1',
    DEFAULT,
    '2020-09-17T08:36:07.000Z'
  ),
  (
    'f2a3be5a-3ddd-5698-83a6-24a77a2ae128',
    'Chaim Koelpin',
    'In difficiantur fatem quantum maerordamus.',
    '811b24b2-0735-5370-bab3-a121a8a6df5b',
    DEFAULT,
    '2020-12-16T23:26:45.000Z'
  ),
  (
    'c688dcad-5b68-5172-8036-1485f1241b32',
    'Darrel Douglas',
    'Ini carum detraxitor quod autem sic reque.',
    'a0ee7de9-f467-5307-a0df-2caa7366413f',
    DEFAULT,
    '2020-12-12T11:48:42.000Z'
  ),
  (
    '7f5d5f14-5827-5cf7-9fc7-ce16d8935ce7',
    'Shanie Murazik',
    'Iganimad esse est nisi iteret honesse.',
    '27068fbc-28ec-59f5-b77c-06761ab3db0e',
    DEFAULT,
    '2020-02-10T13:37:24.000Z'
  );

INSERT INTO
  public."SchoolGalleryImage" (id, url, "galleryId")
VALUES
  (
    '76ac146f-1f63-5d6b-86e9-814e3c3766c0',
    'https://loremflickr.com/640/480',
    'd5950c88-9296-599c-9dad-42a6e97ec6b9'
  ),
  (
    '94cc20fc-6862-5c64-86a2-2a64be56a340',
    'https://loremflickr.com/640/480',
    '242faa10-e85a-5ec2-a1f0-0f954e4fff9b'
  ),
  (
    '76ae05cf-b09d-5b27-ac33-7229b4ec47d9',
    'https://loremflickr.com/640/480',
    'f2a3be5a-3ddd-5698-83a6-24a77a2ae128'
  ),
  (
    '2d0d2af1-d81c-542a-a9e7-96866f458c54',
    'https://loremflickr.com/640/480',
    'c688dcad-5b68-5172-8036-1485f1241b32'
  ),
  (
    '179d2fab-eb3d-5203-ad90-9f4b88a5a683',
    'https://loremflickr.com/640/480',
    '7f5d5f14-5827-5cf7-9fc7-ce16d8935ce7'
  );

INSERT INTO
  public."SchoolBlog" (
    id,
    content,
    title,
    "schoolId",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    '30678894-48bd-5be4-ae45-4ed4ea886692',
    'Voluptates putandi tum ratio negendas. Esse firme semper sollicita es autem dolore. Quisquam a quod ob viam habeat illaroris.',
    'The Benefits of Yoga: Physical and Mental Well-being',
    '0d60d974-ccc5-52e2-92df-f2158c203251',
    DEFAULT,
    '2020-02-10T13:39:08.000Z'
  ),
  (
    '4bd7d8e6-91ed-5e14-8717-c932850be8ad',
    'Superit res ut seritia bonis de quo sunt. Anime unum se alter sit ipsa vacille uto. Sint spe andae nisi neque virosophiae omum. Depravars profectates quod sempertur malivere diutur. Ipsummum corporisse esse ocrito maximum, formidanim ego bella nihille ipsos dolornam. Operam quo amicerud natura sint non, in eius qui omosophia fideloquen cogitia. Ardore dolor qui quam primum tori delectu regulistae.',
    'Navigating the Challenges of Parenting in the Digital Age',
    '732050b9-8d5b-5f8b-96af-081fda80a6b1',
    DEFAULT,
    '2020-12-08T23:53:39.000Z'
  ),
  (
    '0f5b6eeb-7cc2-5cca-913c-e2e10f3339a4',
    'Loco non ipsos doleriuste excruciantur permaneniun. Horribiles et itars ius esse, aut locum effician bonor ennius. Nihilius delectari probet paren putamus non. Secuti appartis est nascuntur quale. Illa vestra spe versionis non putam eo quod. Afferenda utillis voluptate sic quis quamquam si, quae sapiendarum vis acia ego ut.',
    'Creative Writing Tips for Aspiring Authors',
    '811b24b2-0735-5370-bab3-a121a8a6df5b',
    DEFAULT,
    '2020-07-23T06:51:21.000Z'
  ),
  (
    '30866797-7da2-54cb-aa9c-abe9a74cb22e',
    'Titum humante in nota hominmenan sequuntur, quo pareat suo vidia ad titio ego opharum. Mater vivi doctrina cere video censes. Quae quidemus fieri et sint defata. Maiores dem patrius frequentiam doctus tur es.',
    '10 Innovative Tech Gadgets Transforming Our Daily Lives',
    'a0ee7de9-f467-5307-a0df-2caa7366413f',
    DEFAULT,
    '2020-05-01T04:46:46.000Z'
  ),
  (
    '65d56a64-55ac-5526-8ddc-65ddba703758',
    'Responsum autemus dici certe dem legerudian facitur, defent verborum inquam quo satis. Plura inde disputantiop a mediocrito, audivola earumbram ilius multos aeque eque. Per in expetus omnesciunt omis inant, sistatem ut tur opinitur seritas solam. Scaevola inquitatis asperant deserendi salut. Ulla quo gravior autemusdam dolorem et. Omitisse nec totum consule neque numquam, quod qui voluptates non ea.',
    'How to Maximize Your Productivity with Time Management Techniques',
    '27068fbc-28ec-59f5-b77c-06761ab3db0e',
    DEFAULT,
    '2020-05-25T04:21:11.000Z'
  );

INSERT INTO
  public."SchoolBlogImages" (id, url, "schoolBlogId")
VALUES
  (
    '35a972ed-2333-56b0-9c46-b4420581cfb8',
    'https://loremflickr.com/640/480',
    '30678894-48bd-5be4-ae45-4ed4ea886692'
  ),
  (
    '27789fd0-ab01-5c17-9e8e-87529e1edddc',
    'https://loremflickr.com/640/480',
    '4bd7d8e6-91ed-5e14-8717-c932850be8ad'
  ),
  (
    'dbfdc6fe-f76f-5840-84b7-a6dc821204bc',
    'https://loremflickr.com/640/480',
    '0f5b6eeb-7cc2-5cca-913c-e2e10f3339a4'
  ),
  (
    '202aeaee-7b89-5620-9af8-0b95ebc25fe9',
    'https://loremflickr.com/640/480',
    '30866797-7da2-54cb-aa9c-abe9a74cb22e'
  ),
  (
    '28e21af3-3a3b-59cf-a64c-ae2a810e3430',
    'https://loremflickr.com/640/480',
    '65d56a64-55ac-5526-8ddc-65ddba703758'
  );

INSERT INTO
  public."Account" (
    id,
    email,
    "emailVerified",
    password,
    name,
    dob,
    gender,
    "phoneNumber",
    "idCardNumber",
    address,
    image,
    "isTwoFactorEnabled",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    'cc7ebf70-44ca-5e4a-a8f3-37def829095a',
    'Donny.Keeling37878@gmail.com',
    '2020-03-19T15:06:24.000Z',
    'o!97Zr1CXc7n%o!97Zr1CXc7n%',
    'Jaquan Jast',
    '1981-06-02T17:52:20.000Z',
    'MALE',
    '+84412401466',
    '847997331912',
    '588 Tromp Course Kaitlin Creek, Yucaipa, Mayotte',
    'https://arid-coevolution.org',
    DEFAULT,
    DEFAULT,
    '2020-05-13T16:30:12.000Z'
  ),
  (
    '70d1ecec-afb6-56a0-acec-cf6acb023db2',
    'Eloy_Stamm41155@gmail.com',
    '2020-04-20T15:19:38.000Z',
    '@1n7sA5I{*iv{L@1n7sA5I{*iv{L',
    'Clyde Feeney',
    '2017-06-06T05:20:21.000Z',
    'FEMALE',
    '+84863503877',
    '847997331912',
    '292 Jazmin Cape Schneider Orchard, Westfield, Japan',
    'https://overdevelopbackyard.info',
    DEFAULT,
    DEFAULT,
    '2020-02-10T13:52:25.000Z'
  ),
  (
    '8a7223f8-a1a5-562d-a234-1366cffce3d1',
    'Riley.Cartwright92728@gmail.com',
    '2020-06-10T17:49:26.000Z',
    'fklXih*{#1Aty3fklXih*{#1Aty3',
    'Brenda Harris',
    '2001-10-22T21:24:51.000Z',
    'MALE',
    '+84502807714',
    '847997331912',
    '333 Rahsaan Spring Gudrun Court, West Palm Beach, Botswana',
    'https://misappropriateaside.net',
    DEFAULT,
    DEFAULT,
    '2020-02-18T13:26:56.000Z'
  ),
  (
    'd1f17592-b52f-58d7-8f23-a5335cd45e47',
    'Birdie_Rau43605@gmail.com',
    '2020-06-10T05:41:02.000Z',
    'y5}hPHwa9IGP0uy5}hPHwa9IGP0u',
    'Javon Buckridge',
    '1993-10-26T21:36:13.000Z',
    'MALE',
    '+84101841184',
    '847997331912',
    '231 Pablo Cliffs Walker Junction, Lehigh Acres, Antigua and Barbuda',
    'https://yank-veterinarian.info',
    DEFAULT,
    DEFAULT,
    '2020-11-03T22:34:58.000Z'
  ),
  (
    '4ce3d6d4-3379-5cd5-b9df-eb989db1ca77',
    'Leone_Metz14561@gmail.com',
    '2020-09-13T20:34:39.000Z',
    'K3[T0{&]nh!UK3[T0{&]nh!U',
    'Danyka Collier',
    '2001-06-14T05:53:07.000Z',
    'MALE',
    '+84678365512',
    '847997331912',
    '434 Kuvalis Keys Hansen Harbor, Aliso Viejo, Kuwait',
    'https://fatcereal.org',
    DEFAULT,
    DEFAULT,
    '2020-02-02T01:36:06.000Z'
  ),
  (
    'de3951b1-2b41-505e-9f61-2326d2be0046',
    'Marie_Hintz50795@gmail.com',
    '2020-06-14T05:33:53.000Z',
    'XM&Rv74T}1b[9XM&Rv74T}1b[9',
    'Camilla Dickinson',
    '2010-11-23T22:18:32.000Z',
    'MALE',
    '+84351242919',
    '847997331912',
    '384 Rowan Club Kellie Square, Huntington Beach, Saint Kitts and Nevis',
    'https://sympathetichandlebar.biz',
    DEFAULT,
    DEFAULT,
    '2020-10-22T21:28:49.000Z'
  ),
  (
    '32ab4bba-d5fd-51e1-87d0-9967f0d9089e',
    'Prince.VonRueden58177@gmail.com',
    '2020-10-10T09:53:40.000Z',
    'Xc2[HWXmwfRMAXc2[HWXmwfRMA',
    'Darrel Wilkinson',
    '2003-04-04T15:18:27.000Z',
    'FEMALE',
    '+84627695471',
    '847997331912',
    '730 Leuschke Course Juston Dale, Alafaya, India',
    'https://virtuous-counter.com',
    DEFAULT,
    DEFAULT,
    '2020-08-08T08:02:56.000Z'
  ),
  (
    'e99f8be5-07ff-56f4-b5db-1d11f1b5a95f',
    'Tyson_Spencer66100@gmail.com',
    '2020-05-25T04:11:59.000Z',
    'E!Wkb5NbzPKG6E!Wkb5NbzPKG6',
    'Anjali Morissette',
    '2001-06-02T05:43:28.000Z',
    'FEMALE',
    '+84492073220',
    '847997331912',
    '250 Fern Grove Joannie Flats, Newton, Comoros',
    'https://extra-smallhybridisation.biz',
    DEFAULT,
    DEFAULT,
    '2020-11-07T10:58:56.000Z'
  ),
  (
    '7f74d6d8-0528-5541-8b6b-ac6d430a1705',
    'Makenzie.Fritsch32610@gmail.com',
    '2020-12-12T23:42:11.000Z',
    '#YX]#Ppn$F}]#YX]#Ppn$F}]',
    'Chauncey Breitenberg',
    '2005-10-06T09:57:27.000Z',
    'MALE',
    '+84139304450',
    '847997331912',
    '735 Jacobson Extension Jesus Lock, Ann Arbor, Cook Islands',
    'https://frozen-criminal.info',
    DEFAULT,
    DEFAULT,
    '2020-03-11T14:15:28.000Z'
  ),
  (
    '62759d24-7a43-5df1-bf14-b79445e2869d',
    'Tom_Barrows62171@gmail.com',
    '2020-03-15T02:27:38.000Z',
    'ox[QNV*#hD!vukox[QNV*#hD!vuk',
    'Zetta Dickens',
    '2014-11-11T10:45:50.000Z',
    'MALE',
    '+84230362402',
    '847997331912',
    '755 Muhammad Islands Flatley Manors, Dothan, Qatar',
    'https://bugger-rabbi.net',
    DEFAULT,
    DEFAULT,
    '2020-02-06T13:11:42.000Z'
  );

INSERT INTO
  public."TwoFactorConfirmation" (id, "accountId", "createdAt", "updatedAt")
VALUES
  (
    '6bad9a0d-dec5-505a-9ecc-376b9813a2cf',
    'cc7ebf70-44ca-5e4a-a8f3-37def829095a',
    DEFAULT,
    '2020-02-26T13:58:52.000Z'
  ),
  (
    'af32436d-8f23-5fd8-93be-bf1a53626aae',
    '70d1ecec-afb6-56a0-acec-cf6acb023db2',
    DEFAULT,
    '2020-10-26T09:33:25.000Z'
  ),
  (
    'fc11f193-6f80-56dd-98bf-ef5bbc6651a9',
    '8a7223f8-a1a5-562d-a234-1366cffce3d1',
    DEFAULT,
    '2020-11-19T22:34:25.000Z'
  ),
  (
    '135d7adb-accb-58fe-9c18-977775a9d313',
    'd1f17592-b52f-58d7-8f23-a5335cd45e47',
    DEFAULT,
    '2020-08-08T19:58:03.000Z'
  ),
  (
    '7d40f9e9-0bde-5a71-889c-22b384e35fa2',
    '4ce3d6d4-3379-5cd5-b9df-eb989db1ca77',
    DEFAULT,
    '2020-12-12T11:28:54.000Z'
  ),
  (
    '8e969a46-fa9d-5b54-a5a0-7b9f6568c968',
    'de3951b1-2b41-505e-9f61-2326d2be0046',
    DEFAULT,
    '2020-02-14T13:20:06.000Z'
  ),
  (
    '1e6b3f07-f601-5c36-a27a-4c8f5ce167d8',
    '32ab4bba-d5fd-51e1-87d0-9967f0d9089e',
    DEFAULT,
    '2020-01-09T00:22:24.000Z'
  ),
  (
    'b3922e82-2749-5673-8a81-d34ce3f8c9dd',
    'e99f8be5-07ff-56f4-b5db-1d11f1b5a95f',
    DEFAULT,
    '2020-12-24T11:20:08.000Z'
  ),
  (
    'a0ed61ab-5491-54ab-9c01-6ebff906543c',
    '7f74d6d8-0528-5541-8b6b-ac6d430a1705',
    DEFAULT,
    '2020-03-19T14:28:18.000Z'
  ),
  (
    'b0261c5e-591e-562e-9648-db1546812489',
    '62759d24-7a43-5df1-bf14-b79445e2869d',
    DEFAULT,
    '2020-10-26T21:23:45.000Z'
  );

INSERT INTO
  public."Student" (
    id,
    "studentCode",
    "degreeType",
    "certificateType",
    "certificateImg",
    "gradeType",
    "gradeScore",
    cover,
    status,
    "accountId",
    "schoolId",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    '5fa4c749-8af0-5229-9374-68163687623b',
    '24DH721477',
    'UNIVERSITY',
    'IELTS',
    'https://supervenemathematics.com',
    'CGPA',
    3.260515100058472,
    'https://miserly-finisher.info',
    DEFAULT,
    'cc7ebf70-44ca-5e4a-a8f3-37def829095a',
    '27068fbc-28ec-59f5-b77c-06761ab3db0e',
    DEFAULT,
    '2020-10-10T09:19:53.000Z'
  ),
  (
    '9c51e558-1ec3-5a86-a47d-0d03e719beb6',
    '24DH906197',
    'UNIVERSITY',
    'TOEFL',
    'https://mingle-co-producer.org',
    'GPA',
    3.6880378536304224,
    'https://conrunway.org',
    DEFAULT,
    '70d1ecec-afb6-56a0-acec-cf6acb023db2',
    '27068fbc-28ec-59f5-b77c-06761ab3db0e',
    DEFAULT,
    '2020-12-24T11:38:25.000Z'
  ),
  (
    '8c1c9388-87c1-5ea1-a011-35239a2dbf7f',
    '24DH808899',
    'HIGHSCHOOL',
    'IELTS',
    'https://mature-minnow.org',
    'CGPA',
    0.5638152589036222,
    'https://ushercravat.com',
    DEFAULT,
    '8a7223f8-a1a5-562d-a234-1366cffce3d1',
    '811b24b2-0735-5370-bab3-a121a8a6df5b',
    DEFAULT,
    '2020-08-24T07:32:40.000Z'
  ),
  (
    'de5d5b9a-a6fd-50cb-826a-5e28e3681b74',
    '24DH335875',
    'HIGHSCHOOL',
    'TOEFL',
    'https://trouser-opportunity.com',
    'GPA',
    0.14377976739458023,
    'https://siphoncountryside.org',
    DEFAULT,
    'd1f17592-b52f-58d7-8f23-a5335cd45e47',
    '732050b9-8d5b-5f8b-96af-081fda80a6b1',
    DEFAULT,
    '2020-08-16T07:58:59.000Z'
  ),
  (
    '8e45358a-e640-52f8-a587-45d713e94784',
    '24DH254065',
    'HIGHSCHOOL',
    'TOEFL',
    'https://befriendbadge.net',
    'CGPA',
    2.2716243328552634,
    'https://sandpaper-pup.biz',
    DEFAULT,
    '4ce3d6d4-3379-5cd5-b9df-eb989db1ca77',
    'a0ee7de9-f467-5307-a0df-2caa7366413f',
    DEFAULT,
    '2020-03-11T02:36:40.000Z'
  ),
  (
    '6ed048a8-2073-5890-a438-fcd652042cd5',
    '24DH291070',
    'UNIVERSITY',
    'TOEFL',
    'https://tired-hyacinth.com',
    'GPA',
    0.4460066669749217,
    'https://punctuatetrowel.com',
    DEFAULT,
    'de3951b1-2b41-505e-9f61-2326d2be0046',
    '732050b9-8d5b-5f8b-96af-081fda80a6b1',
    DEFAULT,
    '2020-12-28T11:46:11.000Z'
  ),
  (
    '106a870b-9ff4-5cfe-be21-4d6e2a8e780a',
    '24DH808195',
    'UNIVERSITY',
    'TOEFL',
    'https://stupidelectrocardiogram.biz',
    'GPA',
    0.33203686034028085,
    'https://venerated-sculptural.biz',
    DEFAULT,
    '32ab4bba-d5fd-51e1-87d0-9967f0d9089e',
    '732050b9-8d5b-5f8b-96af-081fda80a6b1',
    DEFAULT,
    '2020-11-15T23:03:57.000Z'
  ),
  (
    'c2af4cc4-30d5-5508-98d9-e87f51208325',
    '24DH297631',
    'HIGHSCHOOL',
    'TOEFL',
    'https://insignificant-gain.org',
    'GPA',
    0.4266947704692479,
    'https://burblewonder.org',
    DEFAULT,
    'e99f8be5-07ff-56f4-b5db-1d11f1b5a95f',
    '27068fbc-28ec-59f5-b77c-06761ab3db0e',
    DEFAULT,
    '2020-09-05T20:34:25.000Z'
  ),
  (
    '811304df-56c7-5f82-b6d4-f615b5f00521',
    '24DH120418',
    'HIGHSCHOOL',
    'TOEFL',
    'https://dynamitewhorl.org',
    'CGPA',
    3.9562605263899613,
    'https://mash-card.com',
    DEFAULT,
    '7f74d6d8-0528-5541-8b6b-ac6d430a1705',
    '27068fbc-28ec-59f5-b77c-06761ab3db0e',
    DEFAULT,
    '2020-09-17T21:04:33.000Z'
  ),
  (
    '886e24dd-eadc-5e3f-8bac-8309e4f52540',
    '24DH134740',
    'UNIVERSITY',
    'TOEFL',
    'https://sprawl-kill.com',
    'GPA',
    1.1533319271743088,
    'https://knight-level.net',
    DEFAULT,
    '62759d24-7a43-5df1-bf14-b79445e2869d',
    '811b24b2-0735-5370-bab3-a121a8a6df5b',
    DEFAULT,
    '2020-06-14T05:08:50.000Z'
  );

INSERT INTO
  public."StudentSchoolProgram" (
    id,
    "studentId",
    "programId",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    '2a534e90-1534-5510-a90e-a209127358ab',
    '5fa4c749-8af0-5229-9374-68163687623b',
    '07d48601-8d99-5e76-bedd-442bf7fd0fd9',
    DEFAULT,
    '2020-01-25T00:50:52.000Z'
  ),
  (
    '885b205c-12a5-5487-8ff5-f1dacc970997',
    '9c51e558-1ec3-5a86-a47d-0d03e719beb6',
    '07d48601-8d99-5e76-bedd-442bf7fd0fd9',
    DEFAULT,
    '2020-04-08T03:59:52.000Z'
  ),
  (
    'ed5c28be-1082-59be-b6df-49b9bf3497da',
    '8c1c9388-87c1-5ea1-a011-35239a2dbf7f',
    '07d48601-8d99-5e76-bedd-442bf7fd0fd9',
    DEFAULT,
    '2020-11-03T10:18:54.000Z'
  ),
  (
    '6ab8f12a-9d24-56d6-80e9-be4d8f1e27ce',
    'de5d5b9a-a6fd-50cb-826a-5e28e3681b74',
    '07d48601-8d99-5e76-bedd-442bf7fd0fd9',
    DEFAULT,
    '2020-09-01T08:53:34.000Z'
  ),
  (
    'b52f31ac-1b4f-52d7-bc6d-2029f0852f27',
    '8e45358a-e640-52f8-a587-45d713e94784',
    '07d48601-8d99-5e76-bedd-442bf7fd0fd9',
    DEFAULT,
    '2020-10-10T21:23:51.000Z'
  ),
  (
    'c4e16412-1c6a-5f49-9ab6-5f115b15232a',
    '6ed048a8-2073-5890-a438-fcd652042cd5',
    '07d48601-8d99-5e76-bedd-442bf7fd0fd9',
    DEFAULT,
    '2020-05-13T16:28:19.000Z'
  ),
  (
    '49e2e973-5d8b-5b88-ac4f-c13f9612ccb7',
    '106a870b-9ff4-5cfe-be21-4d6e2a8e780a',
    '07d48601-8d99-5e76-bedd-442bf7fd0fd9',
    DEFAULT,
    '2020-06-14T17:19:26.000Z'
  ),
  (
    '927b7786-b0cc-5d58-a065-5be676af2bfb',
    'c2af4cc4-30d5-5508-98d9-e87f51208325',
    '07d48601-8d99-5e76-bedd-442bf7fd0fd9',
    DEFAULT,
    '2020-02-18T13:02:48.000Z'
  ),
  (
    'b55d70c1-9323-5eb0-980a-1ef824157f1d',
    '811304df-56c7-5f82-b6d4-f615b5f00521',
    '07d48601-8d99-5e76-bedd-442bf7fd0fd9',
    DEFAULT,
    '2020-11-07T10:58:49.000Z'
  ),
  (
    'bdde4d02-8808-5fdb-86c9-f520c423bc85',
    '886e24dd-eadc-5e3f-8bac-8309e4f52540',
    '07d48601-8d99-5e76-bedd-442bf7fd0fd9',
    DEFAULT,
    '2020-04-16T15:13:10.000Z'
  );

INSERT INTO
  public."Profile" (id, status, "studentId", "createdAt", "updatedAt")
VALUES
  (
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '5fa4c749-8af0-5229-9374-68163687623b',
    DEFAULT,
    '2020-02-22T01:05:40.000Z'
  ),
  (
    '1ee6bca9-c544-5609-9981-73dcfeb18963',
    DEFAULT,
    '9c51e558-1ec3-5a86-a47d-0d03e719beb6',
    DEFAULT,
    '2020-09-13T08:27:19.000Z'
  ),
  (
    '97ef1f22-a524-5f8f-94e7-22c44af4ee0d',
    DEFAULT,
    '8c1c9388-87c1-5ea1-a011-35239a2dbf7f',
    DEFAULT,
    '2020-07-15T18:11:01.000Z'
  ),
  (
    'b2d66d43-15bd-5ff7-a634-b7a42388a1ff',
    DEFAULT,
    'de5d5b9a-a6fd-50cb-826a-5e28e3681b74',
    DEFAULT,
    '2020-08-12T19:13:29.000Z'
  ),
  (
    'dafbc531-2bc4-5541-9a07-2e98083da1fe',
    DEFAULT,
    '8e45358a-e640-52f8-a587-45d713e94784',
    DEFAULT,
    '2020-09-25T20:48:36.000Z'
  ),
  (
    'c61b9067-71a6-52b7-8f74-ab8731f1d966',
    DEFAULT,
    '6ed048a8-2073-5890-a438-fcd652042cd5',
    DEFAULT,
    '2020-06-26T17:43:39.000Z'
  ),
  (
    '65e1e78b-de05-597e-a6a3-fdc7c631564c',
    DEFAULT,
    '106a870b-9ff4-5cfe-be21-4d6e2a8e780a',
    DEFAULT,
    '2020-02-26T13:24:30.000Z'
  ),
  (
    '961bfa21-7df6-5469-87d5-ff05e3cafc2b',
    DEFAULT,
    'c2af4cc4-30d5-5508-98d9-e87f51208325',
    DEFAULT,
    '2020-11-03T10:12:08.000Z'
  ),
  (
    '6da3e4c9-f72c-5797-9d09-9fdec51a586e',
    DEFAULT,
    '811304df-56c7-5f82-b6d4-f615b5f00521',
    DEFAULT,
    '2020-10-14T21:39:59.000Z'
  ),
  (
    '943476c7-c42e-59d6-b192-0d7241643faf',
    DEFAULT,
    '886e24dd-eadc-5e3f-8bac-8309e4f52540',
    DEFAULT,
    '2020-06-02T05:43:08.000Z'
  );

INSERT INTO
  public."Group" (id, "ownerId", "createdAt", "updatedAt")
VALUES
  (
    '16631e67-c46e-5445-a13c-4a849cdbe3b8',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-06-14T05:43:33.000Z'
  ),
  (
    '682a3dc3-6203-5610-b485-e4b231c86a09',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-07-27T07:02:08.000Z'
  ),
  (
    '4330e115-233b-51ec-bfa9-626c0fd8e98c',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-07-27T18:20:53.000Z'
  ),
  (
    '26e79099-ffd5-5b86-a096-f8b7854aca97',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-10-06T21:41:22.000Z'
  ),
  (
    '359a994d-f36d-59d1-985d-6ae4461f0fc1',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-11-23T22:45:20.000Z'
  ),
  (
    'd31337c6-91e6-5bfa-912b-3b2d23da8b51',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-05-05T16:11:53.000Z'
  ),
  (
    '0036a819-b5ed-5ae6-a67d-a7aee7ec758d',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-11-23T22:37:45.000Z'
  ),
  (
    '9d04f385-cf9c-5a50-89e2-8c8bda53339f',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-04-08T03:05:13.000Z'
  ),
  (
    '9cfa7648-fc64-546f-bb8b-f5c9bc92a96f',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-06-18T05:35:56.000Z'
  ),
  (
    '5a6edd35-163d-5a6d-91cb-7b7837b02bb8',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-06-06T06:04:59.000Z'
  );

INSERT INTO
  public."ProfileGroup" (
    id,
    "profileId",
    "groupId",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    'cdc79d2e-18b1-5971-be69-3d9f564f96ac',
    '96610422-40dc-593f-97d8-fc9545244772',
    '16631e67-c46e-5445-a13c-4a849cdbe3b8',
    DEFAULT,
    '2020-04-16T03:27:37.000Z'
  ),
  (
    'e8d1300e-bd03-5fd4-8225-02dc754c937d',
    '1ee6bca9-c544-5609-9981-73dcfeb18963',
    '682a3dc3-6203-5610-b485-e4b231c86a09',
    DEFAULT,
    '2020-05-21T16:04:41.000Z'
  ),
  (
    'a2f3f44b-f45a-5d62-be27-64915763f28a',
    '97ef1f22-a524-5f8f-94e7-22c44af4ee0d',
    '4330e115-233b-51ec-bfa9-626c0fd8e98c',
    DEFAULT,
    '2020-10-14T21:14:56.000Z'
  ),
  (
    'a372d18f-4f82-5b6e-abb6-814358c85fa2',
    'b2d66d43-15bd-5ff7-a634-b7a42388a1ff',
    '26e79099-ffd5-5b86-a096-f8b7854aca97',
    DEFAULT,
    '2020-05-05T04:05:14.000Z'
  ),
  (
    '9320810d-725d-5d27-bcec-d3b10dfce8f3',
    'dafbc531-2bc4-5541-9a07-2e98083da1fe',
    '359a994d-f36d-59d1-985d-6ae4461f0fc1',
    DEFAULT,
    '2020-08-20T07:21:53.000Z'
  ),
  (
    '576e54fc-b613-524c-8e09-2426089c024d',
    'c61b9067-71a6-52b7-8f74-ab8731f1d966',
    'd31337c6-91e6-5bfa-912b-3b2d23da8b51',
    DEFAULT,
    '2020-10-02T22:13:21.000Z'
  ),
  (
    '8dbe70e9-2eca-5b2c-b3fa-e2cbdcbbf167',
    '65e1e78b-de05-597e-a6a3-fdc7c631564c',
    '0036a819-b5ed-5ae6-a67d-a7aee7ec758d',
    DEFAULT,
    '2020-10-26T21:28:04.000Z'
  ),
  (
    '77038265-2dda-5b3a-8d7c-0fc19e5f502f',
    '961bfa21-7df6-5469-87d5-ff05e3cafc2b',
    '9d04f385-cf9c-5a50-89e2-8c8bda53339f',
    DEFAULT,
    '2020-11-19T22:50:31.000Z'
  ),
  (
    '387fdccc-5a03-5cc1-843b-3fb203cc7062',
    '6da3e4c9-f72c-5797-9d09-9fdec51a586e',
    '9cfa7648-fc64-546f-bb8b-f5c9bc92a96f',
    DEFAULT,
    '2020-03-11T02:20:49.000Z'
  ),
  (
    '269dd8f7-1d85-5438-9b51-8055df832ca2',
    '943476c7-c42e-59d6-b192-0d7241643faf',
    '5a6edd35-163d-5a6d-91cb-7b7837b02bb8',
    DEFAULT,
    '2020-10-26T09:55:13.000Z'
  );

INSERT INTO
  public."ProfileBlog" (
    id,
    title,
    content,
    "profileId",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    '8ed2beba-8a85-5c5e-89a4-529751e8a668',
    'Giuseppe Gottlieb',
    'Matur gaudeat aperarmat et quorum. Et incurator sed de his. Quae placet sic ei sed maximos epicur cum. Iurias privenima qui memincider autem, loco pro hanc per neque praetere summum percusan. Ferat in eadem uto graecum ad solidin.',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-08-04T07:19:03.000Z'
  ),
  (
    '80d17f43-1f10-58fd-b8cf-5cb722221690',
    'Emmy Spencer',
    'Civibusdam modo fabula non si quid acunt, alem verborum desissent est et adopinan civium. Esset praetorum fortitudin fuit sponte, labor non idia cum corrupte habet scripserendum. Il levam ut tum ipsa itiam e si. Tribuat morte ut antiquitur ante, principio probet ore et mediciorem te. Viverarem in alia peran hoc semelisset. Quandamurei sed extremum sedullo graeci sapiendi in.',
    '1ee6bca9-c544-5609-9981-73dcfeb18963',
    DEFAULT,
    '2020-01-21T00:24:56.000Z'
  ),
  (
    'fb2ca404-051f-594b-b3d5-0cdf52aebbcb',
    'Jayne Hills',
    'Non voluptas quibus fiderstition inum inquam peranimo facet. Etsi iucundius est omnium invidiae epicia et sumenimo. Mediocris quasi haec magnumquam gloriae in, discedo ut pensa am dicassensu tur deinde.',
    '97ef1f22-a524-5f8f-94e7-22c44af4ee0d',
    DEFAULT,
    '2020-09-01T20:58:20.000Z'
  ),
  (
    'c3164ab6-f819-5bd6-8f7d-6864ea42cb5e',
    'Ahmad Reichel',
    'Adiunt odum totelli primum utam epicem horum, voluptates paulum epicultim pertinendum philosopus cum audiam. Denique quem iis quibus apero eum natura uta. Permagnissim se imis reliquaque mis legatomne. In poena nihille stabil inter, cohaerest individ esse sitis advero detraxisse liben esse.',
    'b2d66d43-15bd-5ff7-a634-b7a42388a1ff',
    DEFAULT,
    '2020-02-18T01:28:05.000Z'
  ),
  (
    '563b7ae1-31d4-590a-bcda-881ab7056e17',
    'Mauricio Mann',
    'Si opere rerumque natura satis este es. Ille studiisque fruentem ne modo. Autem maloris pervenias neque alique epicatque, et voluperet nec veneriorem vita multa. Ut andiscorpor vestra plurimi verisque arendam. Non as esse quasi institione paterimad tamque et, cum voluptas quis tum voluptatem meque nesque leges. Dictum eo tamus se iisque, verearum morte soletiam etiam corrigerta. Mens iguam inquit est tanta sapientiam, es endam a commodo culta.',
    'dafbc531-2bc4-5541-9a07-2e98083da1fe',
    DEFAULT,
    '2020-11-03T22:24:23.000Z'
  ),
  (
    '8ba5e93d-d00c-5dc3-b4f0-eb558cfc13be',
    'Courtney Cartwright',
    'Quod in sunt sit etur quosdam omni quo. Sunt sit quod impenita ii inere ad mandaremus. Ad vita suscipio in institio si disputem. Desiditur voluptates quod sit contra, inculta nec at qualis aut nulla. Qui atis iudicarbit dendum et natur si quippe, voluperir habem relique magnit etiam hausta.',
    'c61b9067-71a6-52b7-8f74-ab8731f1d966',
    DEFAULT,
    '2020-09-09T08:57:53.000Z'
  ),
  (
    '3780e7b7-223d-5089-aa68-95e3d440f0a5',
    'Patricia Halvorson',
    'Convicti et inamur ratione confideloq ponsummum quod inassensib. Ut apeiriant praesen quid explicetric, beate vel endas utum laudan ne. De quasi possit ad sent en gymnasia neque. In potest quoddam ab quodsi, ius dicit explicatio posse praeclarorat. Polyaeno et clariorumus intellegun quod in, congressuscep tant soleat ab estico autem.',
    '65e1e78b-de05-597e-a6a3-fdc7c631564c',
    DEFAULT,
    '2020-06-26T17:27:20.000Z'
  ),
  (
    '5160ff82-c4c6-575d-b648-ecb422aba682',
    'Mireya Labadie',
    'E consuetudin sit quietae cupid. Levatomnin sed causa sua accusant facet nec, quid si unt noster tranquillitter nec tritantes nostris. Dissermo nos ne philosam esse, intellegat multi adhibuit ut igiturban. Scriben et tore tam expleantur dolor extremo secura. Est sane quibus defut loca eturus. Desis esse vituptate aut principerat atesse voluptatum, patria ades consed potes mel.',
    '961bfa21-7df6-5469-87d5-ff05e3cafc2b',
    DEFAULT,
    '2020-11-27T11:10:55.000Z'
  ),
  (
    'a9a45972-984e-5aea-b842-c2715b525b8e',
    'Vivian Hilll',
    'Nullo se aut sumus voluptatem. Multos ant maledo cognitione paene puerosopor libera intellegat, motum tibi chremest statimperman sapiendam gaudeat prorsuscipit ensa. Fugientia si vero intuemural inesse dicundiae cumque id, feriora quam videret quae sed melius fuit. Voluptates nullam efficilit tam primumque autem quodsi. As desid primor bonis praetere.',
    '6da3e4c9-f72c-5797-9d09-9fdec51a586e',
    DEFAULT,
    '2020-05-21T04:54:13.000Z'
  ),
  (
    '7addc36a-15e7-5553-9865-fb244284dd61',
    'Henriette Runolfsdottir',
    'Ad ulenderit censet est nimium ratio omnesque, et quasi possit dissermo andri quo. Imus sapiendis voluptatem e tamen quaestionem, virtus nosmetrodor id sua iucuna detrimenim plurim apudinat. Nulla detrimique mollis sine non.',
    '943476c7-c42e-59d6-b192-0d7241643faf',
    DEFAULT,
    '2020-01-21T00:23:32.000Z'
  );

INSERT INTO
  public."ProfileBlogImage" (id, url, "profileBlogId")
VALUES
  (
    '277fb47f-ff3e-50e9-94ad-3b1ddeef6737',
    'https://loremflickr.com/640/480',
    '8ed2beba-8a85-5c5e-89a4-529751e8a668'
  ),
  (
    'edbade7a-3386-58e8-bbc0-5693c2b5d49a',
    'https://loremflickr.com/640/480',
    '80d17f43-1f10-58fd-b8cf-5cb722221690'
  ),
  (
    'e761f592-2657-5d6e-a505-d03e0bc18244',
    'https://loremflickr.com/640/480',
    'fb2ca404-051f-594b-b3d5-0cdf52aebbcb'
  ),
  (
    '98726e09-9ae6-53c6-b25a-9435a75abca5',
    'https://loremflickr.com/640/480',
    'c3164ab6-f819-5bd6-8f7d-6864ea42cb5e'
  ),
  (
    '82535a0e-b3ae-59cd-b1d8-4ce175d44ffc',
    'https://loremflickr.com/640/480',
    '563b7ae1-31d4-590a-bcda-881ab7056e17'
  ),
  (
    '8b869f6c-41d5-525e-911c-6c0ad34f7cb3',
    'https://loremflickr.com/640/480',
    '8ba5e93d-d00c-5dc3-b4f0-eb558cfc13be'
  ),
  (
    '3da70896-dfbf-5d96-ab9e-27b564909cc4',
    'https://loremflickr.com/640/480',
    '3780e7b7-223d-5089-aa68-95e3d440f0a5'
  ),
  (
    'd6ea5acb-f7c0-5077-ac7a-5b16f6bd912c',
    'https://loremflickr.com/640/480',
    '5160ff82-c4c6-575d-b648-ecb422aba682'
  ),
  (
    '51260ab7-e67f-5e4b-ae51-c8408a906171',
    'https://loremflickr.com/640/480',
    'a9a45972-984e-5aea-b842-c2715b525b8e'
  ),
  (
    '6dcc7949-0199-59f0-bb58-755f3940e4a2',
    'https://loremflickr.com/640/480',
    '7addc36a-15e7-5553-9865-fb244284dd61'
  );

INSERT INTO
  public."ProfileBiography" (
    id,
    content,
    "profileId",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    'b3585e80-4e3d-5266-b64d-3d565402f944',
    'Fortitudin linae quibus rebus summam, vester oculatem fugiendum epicoria non metu.',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-05-13T04:20:52.000Z'
  ),
  (
    'a62466e4-4a28-5299-931b-89832ffbb8aa',
    'Reprehenim sic abillam inter repere.',
    '1ee6bca9-c544-5609-9981-73dcfeb18963',
    DEFAULT,
    '2020-03-15T03:03:39.000Z'
  ),
  (
    'f044201e-f648-55c7-b15e-0802833530a8',
    'Accusanium abilesse sit diuturo de perpetenter.',
    '97ef1f22-a524-5f8f-94e7-22c44af4ee0d',
    DEFAULT,
    '2020-11-11T22:10:31.000Z'
  ),
  (
    'cf8b4732-f489-50c5-ac6d-54783aed7ff9',
    'Probante meliora aut mune ignavi, sent et nis animus non dicer aut.',
    'b2d66d43-15bd-5ff7-a634-b7a42388a1ff',
    DEFAULT,
    '2020-04-24T16:03:24.000Z'
  ),
  (
    'c4b39694-cb40-5fc7-9dc3-c6774652d1ab',
    'Explicabit nulla nihille tamendae scripta, candi efficillae potest praeteratib et gaudem e docendi.',
    'dafbc531-2bc4-5541-9a07-2e98083da1fe',
    DEFAULT,
    '2020-12-24T11:29:06.000Z'
  ),
  (
    '91c3ea67-f7ae-5d0a-a23c-16b93c20c223',
    'Gravitione quae inesse e ad diligitiae gratiam.',
    'c61b9067-71a6-52b7-8f74-ab8731f1d966',
    DEFAULT,
    '2020-12-28T11:25:20.000Z'
  ),
  (
    'a1bebf8e-b403-5609-b1fd-c589d8e31236',
    'Voluptatum benivolum cohaeresset uberea dixi vel causa, us e sit quem omnia.',
    '65e1e78b-de05-597e-a6a3-fdc7c631564c',
    DEFAULT,
    '2020-10-22T09:58:45.000Z'
  ),
  (
    '1cb9e16d-4a57-5b7b-889c-844ba6e0dee8',
    'Collaudanim numquam non quarum naturam sequam eosdemocul.',
    '961bfa21-7df6-5469-87d5-ff05e3cafc2b',
    DEFAULT,
    '2020-10-10T21:58:26.000Z'
  ),
  (
    '0d37f341-0529-568b-9bc4-10579b990f43',
    'Sol albam regionum ant videret quae maiorem.',
    '6da3e4c9-f72c-5797-9d09-9fdec51a586e',
    DEFAULT,
    '2020-09-01T08:09:45.000Z'
  ),
  (
    '93132da0-4daf-502f-8417-0bf59e3ce695',
    'Parvam is nam physicis imum.',
    '943476c7-c42e-59d6-b192-0d7241643faf',
    DEFAULT,
    '2020-03-23T02:20:54.000Z'
  );

INSERT INTO
  public."ProfileBiographySocial" (
    id,
    type,
    href,
    "profileBiographyId",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    '657662c5-956c-53a7-9a19-2e4205f51dd7',
    'FACEBOOK',
    '01747e98-66ee-5a05-9cc7-18454c4df6b2',
    'b3585e80-4e3d-5266-b64d-3d565402f944',
    DEFAULT,
    '2020-01-21T00:52:26.000Z'
  ),
  (
    'cb849a29-5ae4-5b75-acb0-366217c124f1',
    'TWITTER',
    '23423ec9-3158-537c-bc89-d3125bcaf231',
    'a62466e4-4a28-5299-931b-89832ffbb8aa',
    DEFAULT,
    '2020-11-07T23:11:45.000Z'
  ),
  (
    '19dedc87-806d-5bae-8c35-cda483bc5947',
    'INSTAGRAM',
    'e307a655-5313-5270-b477-33c1b4753933',
    'f044201e-f648-55c7-b15e-0802833530a8',
    DEFAULT,
    '2020-03-23T02:33:15.000Z'
  ),
  (
    'ade9715f-316a-5f42-aa12-27aac17521d5',
    'TWITCH',
    '41e1b534-2243-538e-b68c-2053d93260ae',
    'cf8b4732-f489-50c5-ac6d-54783aed7ff9',
    DEFAULT,
    '2020-09-21T21:05:12.000Z'
  ),
  (
    '73b32b5f-8b3a-5f96-bc61-6866d49a521a',
    'YOUTUBE',
    '169127a8-5d24-52d5-9d16-1f69c80dbd4e',
    'c4b39694-cb40-5fc7-9dc3-c6774652d1ab',
    DEFAULT,
    '2020-07-19T18:20:11.000Z'
  ),
  (
    '73dbc8b0-4b06-5494-981c-df36fa49b1e8',
    'YOUTUBE',
    '024b8d42-b4d9-502e-b240-7a305510b98d',
    '91c3ea67-f7ae-5d0a-a23c-16b93c20c223',
    DEFAULT,
    '2020-03-11T14:52:37.000Z'
  ),
  (
    '426cbb8f-9de5-5bd2-bdd7-d498e926f366',
    'TWITCH',
    'ee7c4de9-6ef2-5b3d-8407-d4c806ecc3b6',
    'a1bebf8e-b403-5609-b1fd-c589d8e31236',
    DEFAULT,
    '2020-03-23T14:56:33.000Z'
  ),
  (
    'defcde41-215a-5cea-b632-b050ea9366ba',
    'FACEBOOK',
    '3c672c3c-e7e3-53bf-aed2-8d8c8abf527e',
    '1cb9e16d-4a57-5b7b-889c-844ba6e0dee8',
    DEFAULT,
    '2020-07-03T06:58:14.000Z'
  ),
  (
    '76e3f189-c0a3-51af-8f93-d3a59154869e',
    'TWITTER',
    'b7513b3c-4437-5326-ac70-fc43eb51b73e',
    '0d37f341-0529-568b-9bc4-10579b990f43',
    DEFAULT,
    '2020-11-11T10:33:08.000Z'
  ),
  (
    'd1f86d3b-7cec-5045-998c-02fc6d90a3bb',
    'TWITTER',
    'ebbad16c-c0c1-598f-a885-7401fbfa21aa',
    '93132da0-4daf-502f-8417-0bf59e3ce695',
    DEFAULT,
    '2020-07-15T06:21:09.000Z'
  );

INSERT INTO
  public."Area" (id, title, "createdAt", "updatedAt")
VALUES
  (
    '6d379527-b5e6-5a24-a124-a23f658263aa',
    'Norval Gerhold',
    DEFAULT,
    '2020-06-18T05:44:13.000Z'
  ),
  (
    'e0083673-0686-5f99-91f1-c2e567154603',
    'Lacy Fisher',
    DEFAULT,
    '2020-10-14T21:10:51.000Z'
  ),
  (
    'e8efaf4d-5bee-5396-8ece-9aa6e761ad96',
    'Kelsie Beier',
    DEFAULT,
    '2020-12-20T23:55:36.000Z'
  ),
  (
    'e59de3f2-dfde-5741-b3d1-7ffc755d09f4',
    'Gay Hilll',
    DEFAULT,
    '2020-01-21T12:22:01.000Z'
  ),
  (
    '77072cee-077e-5718-befa-2a2b6d5481c4',
    'Tristian Roob',
    DEFAULT,
    '2020-05-17T04:57:10.000Z'
  ),
  (
    '5c804634-11f1-5f62-8573-340dc8020d98',
    'Cordelia Stokes',
    DEFAULT,
    '2020-10-14T21:24:50.000Z'
  ),
  (
    'e70f7a92-39d6-5287-95d4-e975e9969177',
    'Narciso Lesch',
    DEFAULT,
    '2020-03-11T02:37:36.000Z'
  ),
  (
    '8502b462-6595-56d8-b481-56ce4b3560cc',
    'Alexandrea Heathcote',
    DEFAULT,
    '2020-08-24T07:49:34.000Z'
  ),
  (
    '0d4558ee-55d1-56eb-aed0-7908419e5342',
    'Libby O''Conner',
    DEFAULT,
    '2020-10-22T21:58:04.000Z'
  ),
  (
    '287069a8-52a8-5206-8882-b6d31a8fb033',
    'Jamar Friesen',
    DEFAULT,
    '2020-04-04T03:43:01.000Z'
  );

INSERT INTO
  public."ProfileBiographyArea" (
    id,
    "biographyId",
    "areaId",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    'a042a244-5319-5d58-a1f1-158e8c718ab7',
    'b3585e80-4e3d-5266-b64d-3d565402f944',
    '6d379527-b5e6-5a24-a124-a23f658263aa',
    DEFAULT,
    '2020-10-26T10:00:06.000Z'
  ),
  (
    '9ebee5b0-98fa-586e-8194-e95eea22499d',
    'a62466e4-4a28-5299-931b-89832ffbb8aa',
    'e0083673-0686-5f99-91f1-c2e567154603',
    DEFAULT,
    '2020-08-16T19:31:02.000Z'
  ),
  (
    '5ed47fbd-de4c-53c8-a5ac-b22e0431142b',
    'f044201e-f648-55c7-b15e-0802833530a8',
    'e8efaf4d-5bee-5396-8ece-9aa6e761ad96',
    DEFAULT,
    '2020-05-01T04:41:39.000Z'
  ),
  (
    'd895c582-12a1-53e6-ac88-abd0499c4369',
    'cf8b4732-f489-50c5-ac6d-54783aed7ff9',
    'e59de3f2-dfde-5741-b3d1-7ffc755d09f4',
    DEFAULT,
    '2020-01-17T00:03:53.000Z'
  ),
  (
    '77cda578-5c5a-5785-b6c3-6e5cf23f6c3c',
    'c4b39694-cb40-5fc7-9dc3-c6774652d1ab',
    '77072cee-077e-5718-befa-2a2b6d5481c4',
    DEFAULT,
    '2020-09-21T21:01:49.000Z'
  ),
  (
    '2455ca30-5323-5e96-a1dd-a77bbd9a8123',
    '91c3ea67-f7ae-5d0a-a23c-16b93c20c223',
    '5c804634-11f1-5f62-8573-340dc8020d98',
    DEFAULT,
    '2020-01-17T00:33:29.000Z'
  ),
  (
    'a7072aff-96df-5b34-b49b-b1c3881f816c',
    'a1bebf8e-b403-5609-b1fd-c589d8e31236',
    'e70f7a92-39d6-5287-95d4-e975e9969177',
    DEFAULT,
    '2020-07-11T18:19:28.000Z'
  ),
  (
    'd20d0b4f-5add-5329-a82e-9c9c39d130a7',
    '1cb9e16d-4a57-5b7b-889c-844ba6e0dee8',
    '8502b462-6595-56d8-b481-56ce4b3560cc',
    DEFAULT,
    '2020-11-23T10:21:20.000Z'
  ),
  (
    '131c5690-6f7f-5035-b135-71bd11224b97',
    '0d37f341-0529-568b-9bc4-10579b990f43',
    '0d4558ee-55d1-56eb-aed0-7908419e5342',
    DEFAULT,
    '2020-05-13T04:10:51.000Z'
  ),
  (
    'e0f16f83-ded4-571e-95c2-4bd41b94e1ea',
    '93132da0-4daf-502f-8417-0bf59e3ce695',
    '287069a8-52a8-5206-8882-b6d31a8fb033',
    DEFAULT,
    '2020-12-08T11:35:15.000Z'
  );

INSERT INTO
  public."Post" (
    id,
    content,
    status,
    "isArchived",
    "profileId",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    '0429bb71-682c-5fe7-9aab-feeffcf6294e',
    'Talibus evolesse primum plane dolore, elli forenda sum quoniam itia. Qui homin cordans sent privaviscun hoc, maxim parvos nihiliarum dictum praetormidin. Qui in iudicare natura eo stulti quod. Et forenimo si est efficii. Vivere confirme causamicur quae rem.',
    DEFAULT,
    DEFAULT,
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-10-18T10:07:54.000Z'
  ),
  (
    '640d98f5-e451-5e7d-857c-2461bab7d355',
    'Quid esset es ratu nihilest sensibi accediter, natur sequimurum quae ab potes etsi. Sit a fuit deinde mihi as. Epicur plena qui inem facientiam contem temporisset dedectamquam. Igit gloriae de summa de meminam. Uti autem ignorate dixi nomendum incidanim. Si voluptatem vero modum deorsustulis te, via bonum volunt unt bonorteat disciperat tamendit.',
    DEFAULT,
    DEFAULT,
    '1ee6bca9-c544-5609-9981-73dcfeb18963',
    DEFAULT,
    '2020-01-01T00:15:44.000Z'
  ),
  (
    'c0a9a481-e894-57ba-9244-33f418624c61',
    'Quidem sine in extremum abo incidanim, honesset commodius argument a are es nullo. Amicis sent aut referata appellantur. Ea non vocanim et restinis quaeque ruant, si copulla maxim incordant et. Eturum est omis pectate et.',
    DEFAULT,
    DEFAULT,
    '97ef1f22-a524-5f8f-94e7-22c44af4ee0d',
    DEFAULT,
    '2020-12-08T23:24:53.000Z'
  ),
  (
    '59d235ad-233c-5a4d-86a3-3a50694ac52c',
    'Eadem et eamque aliudicus nihil, possum modo atione sicinvidiae huic soleat macedicit ullustriora. Et eas ipsa voluperit et ant et eosdemoccul. Sicut tum abhorreat philos et perpetum, quosvis ad stoicistotel quamquam sequant nunc. Doloraris quae sed liberitem confirmatur natur voluptates. Evernatur dicatomnes ad esset quod potestia tam.',
    DEFAULT,
    DEFAULT,
    'b2d66d43-15bd-5ff7-a634-b7a42388a1ff',
    DEFAULT,
    '2020-05-05T16:30:24.000Z'
  ),
  (
    '2d064e6e-735a-5096-b0f9-c232e7edb5ed',
    'Tantum nullo quod endae paterendit, sine eo recte ne regulsa. Consilia vita ter mollitur virtute libent potes. Sapiens non locat uto reret omneminor.',
    DEFAULT,
    DEFAULT,
    'dafbc531-2bc4-5541-9a07-2e98083da1fe',
    DEFAULT,
    '2020-08-16T19:20:11.000Z'
  ),
  (
    '4d34dba0-c67d-5581-a7d9-c92a9635654d',
    'Explicatrum diviter conclusum potuimus ubi ut multi et, ac inflammatur animum est corpus ego despicorum non. Docti periora ine quae tam expeccanes. Est exis in penitia cupid melius habet, haberet secum nihilius philos et tituro. Acest quaeque significur vitiis cotid inorates tentia volueris, illud vel et hoc habemus archum. Per iisque eturi noceturam modo difficitaq, cum laudatur se nostrum beata tractatistrar aut.',
    DEFAULT,
    DEFAULT,
    'c61b9067-71a6-52b7-8f74-ab8731f1d966',
    DEFAULT,
    '2020-07-19T06:29:09.000Z'
  ),
  (
    'a8453af8-30b2-5132-9b70-eb770eb0b669',
    'Posse ut suspicat oper nec me voluptas eum. Inostentia solet scribendi ut praesenimo ut saturi memin. Octavit ilem instituto docetiam hoc modum nec, nec posuit enime tamentur iactari aliqui. Inut tum el epulis ocarare ertim libera supplicetit, plurim eum putarem verum maiorest nescio ut. Dolornatur si litatu paravis labefficta, beatequid qui illo habeatur in seritia.',
    DEFAULT,
    DEFAULT,
    '65e1e78b-de05-597e-a6a3-fdc7c631564c',
    DEFAULT,
    '2020-12-12T11:52:26.000Z'
  ),
  (
    'f2829999-4ee8-5e80-b0b7-8d08c8003178',
    'As sunt iam autem metu circum iis, videt legendum autem initias dolordation. Nec tamendo esse ant ut genia epicari quo, filium esset pervenistam incurrunt quaeri omnia sint. Ex cur isti in formavit tere disserui. Posse suo etur praecepicur virtutes. Nostram et qua potertamen contra sunt ine. Desid quod quantum doloritem rerum doloresse ea. Habeo per il eaque melius quod consentiunt uta.',
    DEFAULT,
    DEFAULT,
    '961bfa21-7df6-5469-87d5-ff05e3cafc2b',
    DEFAULT,
    '2020-06-14T05:57:33.000Z'
  ),
  (
    '50bc9ae4-3f4e-5fe8-b712-63c5e75f6397',
    'Non ex quibus sed amur aut mihi in. Tur nisi es nemo facillud quo, ophortatis philos tolerum natur quam neque se. Dissermo il providcirco ant se desperfectum probisse multo.',
    DEFAULT,
    DEFAULT,
    '6da3e4c9-f72c-5797-9d09-9fdec51a586e',
    DEFAULT,
    '2020-02-22T01:03:06.000Z'
  ),
  (
    '4bf300d9-0b88-53a5-9569-51688539c59a',
    'Causa id cognitio difficiantur homin quid uti e. Fuisse ut sicut suscipi mortempercip igi rationem reiciendarum. Quondam guberito ilius nostrum probat a, loqui fortas inprobitia corpore in sitatione inum expetentur. Portunt natura sine si dicanimus modus mihi, dolore parte firmatum habeat facille. Constituantur non mihi perant qui, causa summam nam liberatque quas consed tota eas.',
    DEFAULT,
    DEFAULT,
    '943476c7-c42e-59d6-b192-0d7241643faf',
    DEFAULT,
    '2020-10-06T22:09:20.000Z'
  );

INSERT INTO
  public."PostShare" (id, "profileId", "postId")
VALUES
  (
    '5bd4d208-14f2-594f-92d1-b54d8f9e66b9',
    '96610422-40dc-593f-97d8-fc9545244772',
    '0429bb71-682c-5fe7-9aab-feeffcf6294e'
  ),
  (
    '5f10ee4d-18f3-5a21-896e-bd189ccf2f08',
    '96610422-40dc-593f-97d8-fc9545244772',
    '640d98f5-e451-5e7d-857c-2461bab7d355'
  ),
  (
    '29a7bdaf-bf33-5af1-84ab-57a7fbe9dc35',
    '96610422-40dc-593f-97d8-fc9545244772',
    'c0a9a481-e894-57ba-9244-33f418624c61'
  ),
  (
    '19f85c81-8637-5fba-9d99-1bd00bd2590a',
    '96610422-40dc-593f-97d8-fc9545244772',
    '59d235ad-233c-5a4d-86a3-3a50694ac52c'
  ),
  (
    'c881211a-dab2-507d-b61a-d12ba7a7c859',
    '96610422-40dc-593f-97d8-fc9545244772',
    '2d064e6e-735a-5096-b0f9-c232e7edb5ed'
  ),
  (
    '9c7cebad-6f9a-5883-96d9-668501970887',
    '96610422-40dc-593f-97d8-fc9545244772',
    '4d34dba0-c67d-5581-a7d9-c92a9635654d'
  ),
  (
    '61d76911-2704-5eaf-b584-8302fca911c7',
    '96610422-40dc-593f-97d8-fc9545244772',
    'a8453af8-30b2-5132-9b70-eb770eb0b669'
  ),
  (
    'b67ce41f-4364-5397-a5ba-91239925f6b2',
    '96610422-40dc-593f-97d8-fc9545244772',
    'f2829999-4ee8-5e80-b0b7-8d08c8003178'
  ),
  (
    '14942303-de69-5667-9352-a0c826e0a399',
    '96610422-40dc-593f-97d8-fc9545244772',
    '50bc9ae4-3f4e-5fe8-b712-63c5e75f6397'
  ),
  (
    '79d273e2-9a22-5473-95f9-de164127dd0b',
    '96610422-40dc-593f-97d8-fc9545244772',
    '4bf300d9-0b88-53a5-9569-51688539c59a'
  );

INSERT INTO
  public."PostSave" (id, "profileId", "postId")
VALUES
  (
    '3f497ee8-625a-5149-8f99-356b679e7362',
    '96610422-40dc-593f-97d8-fc9545244772',
    '0429bb71-682c-5fe7-9aab-feeffcf6294e'
  ),
  (
    '2939d4c2-529f-5036-bfa4-3081a350dec0',
    '96610422-40dc-593f-97d8-fc9545244772',
    '640d98f5-e451-5e7d-857c-2461bab7d355'
  ),
  (
    'de0090fb-6823-57c3-8693-d9e39ac482db',
    '96610422-40dc-593f-97d8-fc9545244772',
    'c0a9a481-e894-57ba-9244-33f418624c61'
  ),
  (
    'eea519c8-f305-54d5-b3e2-9f31090d724c',
    '96610422-40dc-593f-97d8-fc9545244772',
    '59d235ad-233c-5a4d-86a3-3a50694ac52c'
  ),
  (
    '06b4d7a3-b94b-5e90-9e2c-e98bf32b7a6c',
    '96610422-40dc-593f-97d8-fc9545244772',
    '2d064e6e-735a-5096-b0f9-c232e7edb5ed'
  ),
  (
    'f9a7a566-70a0-5349-be5b-007fba604938',
    '96610422-40dc-593f-97d8-fc9545244772',
    '4d34dba0-c67d-5581-a7d9-c92a9635654d'
  ),
  (
    '3216c478-208b-571f-abd8-439426123390',
    '96610422-40dc-593f-97d8-fc9545244772',
    'a8453af8-30b2-5132-9b70-eb770eb0b669'
  ),
  (
    'c61c0815-ca7a-54c2-97ba-b5408736002b',
    '96610422-40dc-593f-97d8-fc9545244772',
    'f2829999-4ee8-5e80-b0b7-8d08c8003178'
  ),
  (
    'cd2dbe37-834c-51af-b28c-19046646ec96',
    '96610422-40dc-593f-97d8-fc9545244772',
    '50bc9ae4-3f4e-5fe8-b712-63c5e75f6397'
  ),
  (
    'e8592f0c-4200-5341-a5dd-aa7fccd27597',
    '96610422-40dc-593f-97d8-fc9545244772',
    '4bf300d9-0b88-53a5-9569-51688539c59a'
  );

INSERT INTO
  public."PostLike" (id, "profileId", "postId")
VALUES
  (
    '6c8813e3-63da-5621-a195-7576f3852d7f',
    '96610422-40dc-593f-97d8-fc9545244772',
    '0429bb71-682c-5fe7-9aab-feeffcf6294e'
  ),
  (
    '5b2f8db4-05b1-5087-8b70-8143926d5359',
    '96610422-40dc-593f-97d8-fc9545244772',
    '640d98f5-e451-5e7d-857c-2461bab7d355'
  ),
  (
    '4d45ba82-ca05-56f3-9439-1f6539cd7f3d',
    '96610422-40dc-593f-97d8-fc9545244772',
    'c0a9a481-e894-57ba-9244-33f418624c61'
  ),
  (
    '17802d1d-e8f0-5be4-bce4-5c0c35560666',
    '96610422-40dc-593f-97d8-fc9545244772',
    '59d235ad-233c-5a4d-86a3-3a50694ac52c'
  ),
  (
    '15d177ff-fba5-5686-887a-bf7fb74a77b1',
    '96610422-40dc-593f-97d8-fc9545244772',
    '2d064e6e-735a-5096-b0f9-c232e7edb5ed'
  ),
  (
    '5eb231b3-72f7-5ca3-9604-079f71e42317',
    '96610422-40dc-593f-97d8-fc9545244772',
    '4d34dba0-c67d-5581-a7d9-c92a9635654d'
  ),
  (
    'aec8c285-a696-5a8a-914d-315c9dcb7a70',
    '96610422-40dc-593f-97d8-fc9545244772',
    'a8453af8-30b2-5132-9b70-eb770eb0b669'
  ),
  (
    '2e39396f-1beb-5062-8534-5df18ee73ef8',
    '96610422-40dc-593f-97d8-fc9545244772',
    'f2829999-4ee8-5e80-b0b7-8d08c8003178'
  ),
  (
    'a9b13317-2c73-5f2b-b3e6-79a64ab9cc01',
    '96610422-40dc-593f-97d8-fc9545244772',
    '50bc9ae4-3f4e-5fe8-b712-63c5e75f6397'
  ),
  (
    '3382c404-cd2b-5851-a9d5-3abba9b8203d',
    '96610422-40dc-593f-97d8-fc9545244772',
    '4bf300d9-0b88-53a5-9569-51688539c59a'
  );

INSERT INTO
  public."PostImage" (id, url, "postId")
VALUES
  (
    '91f2243b-da1a-5d6a-92a1-d320df4e4d49',
    'https://loremflickr.com/640/480',
    '0429bb71-682c-5fe7-9aab-feeffcf6294e'
  ),
  (
    '428a037c-5725-55c9-9b9e-51f5d08a6ce6',
    'https://loremflickr.com/640/480',
    '640d98f5-e451-5e7d-857c-2461bab7d355'
  ),
  (
    '9b381081-992c-5482-90ea-6d8ad952aaad',
    'https://loremflickr.com/640/480',
    'c0a9a481-e894-57ba-9244-33f418624c61'
  ),
  (
    'e9d398ea-1b5e-577e-b465-66f54464b55c',
    'https://loremflickr.com/640/480',
    '59d235ad-233c-5a4d-86a3-3a50694ac52c'
  ),
  (
    'd69fe363-76ef-5129-b213-35b883370823',
    'https://loremflickr.com/640/480',
    '2d064e6e-735a-5096-b0f9-c232e7edb5ed'
  ),
  (
    '396d60ff-d163-55ad-ab82-455110d821cd',
    'https://loremflickr.com/640/480',
    '4d34dba0-c67d-5581-a7d9-c92a9635654d'
  ),
  (
    '0a4a0977-993a-5e37-813b-8e83df8e657b',
    'https://loremflickr.com/640/480',
    'a8453af8-30b2-5132-9b70-eb770eb0b669'
  ),
  (
    '670e6e76-a2db-5212-823f-e08838a2a5b8',
    'https://loremflickr.com/640/480',
    'f2829999-4ee8-5e80-b0b7-8d08c8003178'
  ),
  (
    '6012ad6c-f885-5286-8292-e3ce28c86968',
    'https://loremflickr.com/640/480',
    '50bc9ae4-3f4e-5fe8-b712-63c5e75f6397'
  ),
  (
    '14bf6327-f9ed-589b-9b78-d264e34d5d7e',
    'https://loremflickr.com/640/480',
    '4bf300d9-0b88-53a5-9569-51688539c59a'
  );

INSERT INTO
  public."PostComment" (
    id,
    content,
    image,
    "isArchived",
    "profileId",
    "postId",
    "parentCommentId",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    '168f2776-9c3d-5b2d-8407-a73176238a73',
    'This is exactly what I needed to read today. Thank you!',
    'https://gaseous-statue.net',
    DEFAULT,
    '96610422-40dc-593f-97d8-fc9545244772',
    '0429bb71-682c-5fe7-9aab-feeffcf6294e',
    NULL,
    DEFAULT,
    '2020-11-03T11:06:54.000Z'
  ),
  (
    'a3feb97a-fb2e-54e4-8ceb-e9d32fbc96b0',
    'Can anyone recommend additional resources on this topic?',
    'https://revise-experience.info',
    DEFAULT,
    '96610422-40dc-593f-97d8-fc9545244772',
    '640d98f5-e451-5e7d-857c-2461bab7d355',
    NULL,
    DEFAULT,
    '2020-01-01T12:09:20.000Z'
  ),
  (
    '58f9ce4c-a61f-5c90-b631-ec056a7871bd',
    'Could you dive deeper into the methodology behind these findings?',
    'https://transmogrifybench.com',
    DEFAULT,
    '96610422-40dc-593f-97d8-fc9545244772',
    'c0a9a481-e894-57ba-9244-33f418624c61',
    NULL,
    DEFAULT,
    '2020-11-19T10:52:50.000Z'
  ),
  (
    '0297c366-f296-570d-93cc-49da790bb32b',
    'Your writing style is engaging and makes complex topics easily understandable.',
    'https://pleased-sidewalk.net',
    DEFAULT,
    '96610422-40dc-593f-97d8-fc9545244772',
    '59d235ad-233c-5a4d-86a3-3a50694ac52c',
    NULL,
    DEFAULT,
    '2020-04-16T04:02:06.000Z'
  ),
  (
    'c56242b3-4803-5c09-94c4-9c9d4007bed9',
    'This is exactly what I needed to read today. Thank you!',
    'https://legitimate-difference.net',
    DEFAULT,
    '96610422-40dc-593f-97d8-fc9545244772',
    '2d064e6e-735a-5096-b0f9-c232e7edb5ed',
    NULL,
    DEFAULT,
    '2020-02-10T02:01:31.000Z'
  ),
  (
    '8c597baf-35bb-5dcf-a689-61a8e41b4b21',
    'I have a question about one of the points made. Can you elaborate?',
    'https://second-handmobster.biz',
    DEFAULT,
    '96610422-40dc-593f-97d8-fc9545244772',
    '4d34dba0-c67d-5581-a7d9-c92a9635654d',
    NULL,
    DEFAULT,
    '2020-06-06T05:24:47.000Z'
  ),
  (
    '63be9143-9428-598e-a359-3c0e15551b9a',
    'This perspective is quite refreshing and offers a new way to look at things.',
    'https://notch-hardcover.biz',
    DEFAULT,
    '96610422-40dc-593f-97d8-fc9545244772',
    'a8453af8-30b2-5132-9b70-eb770eb0b669',
    NULL,
    DEFAULT,
    '2020-10-22T21:09:56.000Z'
  ),
  (
    '03ee82a1-6f91-54c8-a82e-ad136ae7a4d3',
    'This article has motivated me to make some changes in my own life.',
    'https://healthycustard.org',
    DEFAULT,
    '96610422-40dc-593f-97d8-fc9545244772',
    'f2829999-4ee8-5e80-b0b7-8d08c8003178',
    NULL,
    DEFAULT,
    '2020-07-27T06:33:43.000Z'
  ),
  (
    '16e7a55f-425d-5a43-bb93-9469423247c0',
    'I have a question about one of the points made. Can you elaborate?',
    'https://elaborateturret.com',
    DEFAULT,
    '96610422-40dc-593f-97d8-fc9545244772',
    '50bc9ae4-3f4e-5fe8-b712-63c5e75f6397',
    NULL,
    DEFAULT,
    '2020-10-18T09:34:42.000Z'
  ),
  (
    '95eaabfe-3d46-535b-b4fc-cb480b99b01b',
    'Insightful article! I appreciate the depth of research and thoughtfulness.',
    'https://plighteasel.com',
    DEFAULT,
    '96610422-40dc-593f-97d8-fc9545244772',
    '4bf300d9-0b88-53a5-9569-51688539c59a',
    NULL,
    DEFAULT,
    '2020-02-06T13:03:39.000Z'
  );

INSERT INTO
  public."PostCommentLike" (id, "profileId", "postCommentId")
VALUES
  (
    '1e525c3b-01d6-5313-be47-b8de09744223',
    '96610422-40dc-593f-97d8-fc9545244772',
    '168f2776-9c3d-5b2d-8407-a73176238a73'
  ),
  (
    '9e5c9e3c-7feb-5636-9083-e1b2690e0557',
    '96610422-40dc-593f-97d8-fc9545244772',
    'a3feb97a-fb2e-54e4-8ceb-e9d32fbc96b0'
  ),
  (
    'f588862b-0690-5bde-ac35-5c60323e373e',
    '96610422-40dc-593f-97d8-fc9545244772',
    '58f9ce4c-a61f-5c90-b631-ec056a7871bd'
  ),
  (
    '0759fad4-42fc-5492-9d1e-a8d6a3303524',
    '96610422-40dc-593f-97d8-fc9545244772',
    '0297c366-f296-570d-93cc-49da790bb32b'
  ),
  (
    '4c2f1051-4965-5bd3-927b-06075cd98e15',
    '96610422-40dc-593f-97d8-fc9545244772',
    'c56242b3-4803-5c09-94c4-9c9d4007bed9'
  ),
  (
    '09084c36-bcb8-5af9-be43-b6b682319b96',
    '96610422-40dc-593f-97d8-fc9545244772',
    '8c597baf-35bb-5dcf-a689-61a8e41b4b21'
  ),
  (
    'c9c8d4ac-45be-538c-8c25-60ffe98f67e2',
    '96610422-40dc-593f-97d8-fc9545244772',
    '63be9143-9428-598e-a359-3c0e15551b9a'
  ),
  (
    'aaea6372-6abe-5de5-b470-413e279ece0a',
    '96610422-40dc-593f-97d8-fc9545244772',
    '03ee82a1-6f91-54c8-a82e-ad136ae7a4d3'
  ),
  (
    '27ee6dc0-55af-5bee-9526-03b51a5ce8c9',
    '96610422-40dc-593f-97d8-fc9545244772',
    '16e7a55f-425d-5a43-bb93-9469423247c0'
  ),
  (
    'da45f82b-d07c-502d-9abd-589641d905f6',
    '96610422-40dc-593f-97d8-fc9545244772',
    '95eaabfe-3d46-535b-b4fc-cb480b99b01b'
  );

INSERT INTO
  public."Event" (id, title, "hostId", "createdAt", "updatedAt")
VALUES
  (
    '96a43e90-c4d1-5c79-b956-8f65a5e1e0da',
    'Karen Bradtke',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-04-16T03:36:49.000Z'
  ),
  (
    'a03c95d1-69f5-542e-94dd-1ce1c0b03c01',
    'Elta Gleichner',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-09-13T08:19:31.000Z'
  ),
  (
    '748945d6-a584-5d77-94ba-510f765af77d',
    'Dasia Rohan',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-11-27T10:37:43.000Z'
  ),
  (
    '32915bef-74dd-5b28-b84c-d9fbfabe9701',
    'Amelia Moore',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-07-23T18:40:17.000Z'
  ),
  (
    'a74edde7-2ec6-50ff-945b-ed3ae6513ae2',
    'Tyson Feest',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-05-25T16:55:20.000Z'
  ),
  (
    '3ae11e5c-f26b-5aee-bdc4-1f4712c6b3e8',
    'Guillermo Pfannerstill',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-06-18T17:53:17.000Z'
  ),
  (
    '594c6c82-125a-5805-afcf-8dce6e53023b',
    'Tina Fahey',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-01-01T00:24:35.000Z'
  ),
  (
    '24659035-c713-578a-a62b-214a6797e288',
    'Florian Yundt',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-04-20T03:30:14.000Z'
  ),
  (
    '277f2a7d-5129-516a-8784-21fe05bcdeb1',
    'Gudrun Emmerich',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-06-10T05:45:14.000Z'
  ),
  (
    '3d927eee-10f9-53db-b976-d1b2c5f78d2a',
    'Delbert Osinski',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-04-24T15:04:05.000Z'
  );

INSERT INTO
  public."EventProfile" (
    id,
    "eventId",
    "profileId",
    "createdAt",
    "updatedAt"
  )
VALUES
  (
    'd0ee9c16-b7c3-5396-ac1c-fc7451f0daa8',
    '96a43e90-c4d1-5c79-b956-8f65a5e1e0da',
    '96610422-40dc-593f-97d8-fc9545244772',
    DEFAULT,
    '2020-01-17T00:12:38.000Z'
  ),
  (
    'a757a56b-0bc2-5e4b-851a-e50678279934',
    'a03c95d1-69f5-542e-94dd-1ce1c0b03c01',
    '1ee6bca9-c544-5609-9981-73dcfeb18963',
    DEFAULT,
    '2020-09-17T20:48:21.000Z'
  ),
  (
    'bd054c15-ea4e-569c-9f84-5facfe519d27',
    '748945d6-a584-5d77-94ba-510f765af77d',
    '97ef1f22-a524-5f8f-94e7-22c44af4ee0d',
    DEFAULT,
    '2020-11-15T23:09:47.000Z'
  ),
  (
    '511f6507-6c18-55bb-89c6-ec296d3e9a78',
    '32915bef-74dd-5b28-b84c-d9fbfabe9701',
    'b2d66d43-15bd-5ff7-a634-b7a42388a1ff',
    DEFAULT,
    '2020-06-10T05:42:34.000Z'
  ),
  (
    'cff6d8ae-f0de-587c-bc23-6eaf62dd09c3',
    'a74edde7-2ec6-50ff-945b-ed3ae6513ae2',
    'dafbc531-2bc4-5541-9a07-2e98083da1fe',
    DEFAULT,
    '2020-06-10T05:29:09.000Z'
  ),
  (
    '40477941-f543-5e39-8747-e6aad54e1bac',
    '3ae11e5c-f26b-5aee-bdc4-1f4712c6b3e8',
    'c61b9067-71a6-52b7-8f74-ab8731f1d966',
    DEFAULT,
    '2020-07-07T18:58:11.000Z'
  ),
  (
    '58d48b3a-ae85-5637-ad55-f44927563013',
    '594c6c82-125a-5805-afcf-8dce6e53023b',
    '65e1e78b-de05-597e-a6a3-fdc7c631564c',
    DEFAULT,
    '2020-06-02T17:19:57.000Z'
  ),
  (
    '517436a1-fcae-5b16-90eb-79c8bfca0a33',
    '24659035-c713-578a-a62b-214a6797e288',
    '961bfa21-7df6-5469-87d5-ff05e3cafc2b',
    DEFAULT,
    '2020-02-26T13:16:07.000Z'
  ),
  (
    '857a9427-7a63-5e28-a571-c1623aecce6f',
    '277f2a7d-5129-516a-8784-21fe05bcdeb1',
    '6da3e4c9-f72c-5797-9d09-9fdec51a586e',
    DEFAULT,
    '2020-08-12T07:27:07.000Z'
  ),
  (
    '1f83766e-c68a-5d9c-8980-15e98864c8af',
    '3d927eee-10f9-53db-b976-d1b2c5f78d2a',
    '943476c7-c42e-59d6-b192-0d7241643faf',
    DEFAULT,
    '2020-03-11T14:57:52.000Z'
  );