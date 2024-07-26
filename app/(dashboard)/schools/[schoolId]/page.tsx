import { Navbar } from "@/components/navbar";
import { SchoolInformation } from "@/components/schools/school-information";
import { SchoolTabs } from "@/components/schools/school-tabs";
import { GetSchoolInformation } from "@/data/schools";
import { redirect } from "next/navigation";

type Props = {
  params: {
    schoolId: string;
  };
};

type TabItem = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

const SchoolIdPage = async ({ params }: Props) => {
  const school = await GetSchoolInformation(params.schoolId);

  if (!school) {
    redirect("/schools");
  }

  const tabs: TabItem[] = [
    {
      title: "Thông tin",
      value: "info",
      content: (
        <div className="w-full overflow-hidden relative h-full gap-4 rounded-2xl p-10 text-xl md:text-4xl font-bold text-main dark:text-main-foreground dark:bg-main-component shadow-md border bg-main-foreground">
          <SchoolInformation school={school} />
        </div>
      ),
    },
    {
      title: "Học sinh",
      value: "students",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Học sinh</p>
        </div>
      ),
    },
    {
      title: "Cơ sở",
      value: "teachers",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Cơ sở</p>
        </div>
      ),
    },
    {
      title: "Ngành đào tạo",
      value: "courses",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Ngành đào tạo</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <Navbar title={`Thông tin trường học`} description={school.name} />
      {!school.isPublished && (
        <div className="w-full h-16 bg-yellow-200 text-black flex items-center justify-center mt-20 mb-8">
          <p className="text-center">
            Trường học hiện đang ở ché độ{" "}
            <strong className="text-rose-500">TẠM ẨN</strong>. Vui lòng đổi chế
            độ để hiển thị trường.
          </p>
        </div>
      )}
      <div className="size-full [perspective:1000px] relative b flex flex-col mx-auto items-start justify-star">
        <SchoolTabs tabs={tabs} />
      </div>
    </>
  );
};

export default SchoolIdPage;
