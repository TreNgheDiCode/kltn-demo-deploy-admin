import { HeadingStudent } from "@/components/student/heading-student";
import { GetStudentById } from "@/lib/student";
import { StudentLib } from "@/types/type";
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
    <div>
      <HeadingStudent student={student} />
    </div>
  );
};

export default StudentIdPage;
