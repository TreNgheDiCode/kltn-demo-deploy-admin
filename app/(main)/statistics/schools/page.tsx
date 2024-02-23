import { HeadingSchool } from "@/components/school/heading";
import { GetSchoolsById, GetSchoolsLib } from "@/lib/schools";

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
        <div></div>
      ) : (
        <div className="font-semibold text-center text-lg">
          Vui lòng chọn một trường để hiển thị
        </div>
      )}
    </div>
  );
};

export default SchoolPage;
