import { HeadingSchool } from "@/components/school/heading";
import { HeadingNavigation } from "@/components/school/heading-navigation";
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
    <div className="space-y-3 max-h-screen">
      <HeadingSchool schools={schools} />

      {selectSchool ? (
        <>
          <Card className="overflow-y-auto max-h-[calc(100vh-116px)]">
            <CardBody className="scrollbar-hide relative">
              {searchParams.category === "list" && (
                <HeadingNavigation school={selectSchool} />
              )}
            </CardBody>
          </Card>
        </>
      ) : (
        <div className="font-semibold text-center text-lg">
          Vui lòng chọn một trường để hiển thị
        </div>
      )}
    </div>
  );
};

export default SchoolPage;
