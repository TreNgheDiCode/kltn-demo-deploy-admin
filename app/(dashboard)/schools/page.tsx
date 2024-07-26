import { Navbar } from "@/components/navbar";
import { SchoolsBackground } from "@/components/schools/schools-background";
import { GetSchoolsCard } from "@/data/schools";

const SchoolsPage = async () => {
  const schools = await GetSchoolsCard();

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <SchoolsBackground schools={schools} />
      </div>
    </>
  );
};

export default SchoolsPage;
