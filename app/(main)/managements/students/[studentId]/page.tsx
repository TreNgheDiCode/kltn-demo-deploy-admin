import { HeadingStudent } from "@/components/student/heading-student";
import { StudentInformation } from "@/components/student/student-information";
import { StudentNavigation } from "@/components/student/student-navigation";
import { StudentTool } from "@/components/student/student-tool";
import { GetStudentById } from "@/lib/student";
import { StudentLib } from "@/types/type";
import { Card, CardBody } from "@nextui-org/react";
import { redirect } from "next/navigation";

const StudentIdPage = async ({
  params: { studentId },
}: {
  params: { studentId: string };
}) => {
  const student: StudentLib = await GetStudentById(studentId);

  if (!student) {
    redirect("/managements/schools");
  }

  return (
    <div className="space-y-4">
      <HeadingStudent student={student} />
      <div className="grid grid-cols-1 md:grid-cols-[1fr,300px] gap-4">
        <StudentInformation student={student} />
        <StudentTool student={student} />
      </div>
      {student.studentCode && (
        <Card>
          <CardBody>
            <StudentNavigation student={student} />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default StudentIdPage;
