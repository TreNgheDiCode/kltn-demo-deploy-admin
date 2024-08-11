import { HeadingStudent } from "@/components/student/heading-student";
import { StudentInformation } from "@/components/student/student-information";
import { StudentNavigation } from "@/components/student/student-navigation";
import { StudentTool } from "@/components/student/student-tool";
import { GetStudentById, GetStudentFeedbacks } from "@/lib/student";
import { FeedbackLib, StudentLib } from "@/types/type";
import { Card, CardBody } from "@nextui-org/react";

const StudentIdPage = async ({
  params: { studentId },
}: {
  params: { studentId: string };
}) => {
  const student: StudentLib = await GetStudentById(studentId);
  const feedbacks: FeedbackLib[] = await GetStudentFeedbacks(
    student?.account?.email,
    student?.account?.phoneNumber
  );

  if (!student) {
    return (
      <div className="flex items-center justify-center font-bold text-3xl">
        Thông tin học sinh không tồn tại
      </div>
    );
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
            <StudentNavigation student={student} feedbacks={feedbacks} />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default StudentIdPage;
