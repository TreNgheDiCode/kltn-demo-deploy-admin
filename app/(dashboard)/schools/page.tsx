import { SchoolNavbar } from "@/components/schools/school-navbar";
import { SchoolsBackground } from "@/components/schools/schools-background";
import { GetSchoolsCard } from "@/data/schools";

const SchoolsPage = async () => {
  const schools = await GetSchoolsCard();

  return (
    <>
      <SchoolNavbar />
      <div className="pt-20">
        <SchoolsBackground schools={schools} />
      </div>
    </>
  );
};

export default SchoolsPage;
