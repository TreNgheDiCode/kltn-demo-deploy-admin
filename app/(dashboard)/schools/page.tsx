import { GetSchools } from "@/data/schools";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
const SchoolsPage = async ({ searchParams }: Props) => {
  const schools = await GetSchools(
    parseInt(searchParams.page as string),
    parseInt(searchParams.pageSize as string)
  );

  if (!schools) {
    return (
      <div className="justify-center items-center flex font-medium text-4xl">
        Không có dữ liệu trường học
      </div>
    );
  }

  return <div>{schools?.data.length}</div>;
};

export default SchoolsPage;
