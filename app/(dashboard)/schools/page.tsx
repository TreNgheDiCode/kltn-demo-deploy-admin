import { SchoolsBackground } from "@/components/schools/schools-background";
import { GetSchoolsCard } from "@/data/schools";

const SchoolsPage = async () => {
  const schools = await GetSchoolsCard();

  return <SchoolsBackground schools={schools} />;
};

export default SchoolsPage;
