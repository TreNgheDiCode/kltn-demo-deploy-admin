import { HeadingSchool } from "@/components/school/heading";
import { HeadingNavigation } from "@/components/school/heading-navigation";
import { SchoolHeader } from "@/components/school/school-header";
import { GetSchoolsById, GetSchoolsLib } from "@/lib/schools";
import { Card, CardBody } from "@nextui-org/react";

const SchoolPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const schools = await GetSchoolsLib();
  const selectSchool = await GetSchoolsById((searchParams.id as string) ?? "");

  return (
    <div className="space-y-3">
      <HeadingSchool schools={schools} />
      {selectSchool ? (
        <div className="space-y-3">
          <SchoolHeader selectSchool={selectSchool} />
          <HeadingNavigation school={selectSchool} />
        </div>
      ) : (
        <div className="font-semibold text-center text-lg">
          Vui lòng chọn một trường để hiển thị
        </div>
      )}
    </div>
  );
};

export default SchoolPage;
