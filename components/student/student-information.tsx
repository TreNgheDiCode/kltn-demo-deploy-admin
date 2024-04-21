"use client";

import { StudentLib } from "@/types/type";
import { Avatar, Card, CardBody, ChipProps } from "@nextui-org/react";
import { InformationHolder } from "./information-holder";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { GradeType } from "@prisma/client";

interface StudentInformationProps {
  student: StudentLib;
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  AWAITING: "default",
  STUDYING: "warning",
  APPROVED: "success",
  DROPPED: "danger",
};

const genderLabelMap: Record<string, string> = {
  MALE: "Nam",
  FEMALE: "Nữ",
};

const degreeLabelMap: Record<string, string> = {
  UNIVERSITY: "Đại học",
  HIGHSCHOOL: "Trung học phổ thông",
};

export const StudentInformation = ({
  student,
}: Readonly<StudentInformationProps>) => {
  if (!student || !student.account) return null;

  return (
    <Card>
      <CardBody>
        <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-4 divide-x-3">
          <div className="flex flex-col gap-3">
            <Avatar
              color={statusColorMap[student.status]}
              alt="avatar"
              isBordered
              className="w-24 h-24"
              src={student.account.image || ""}
            />
            <h1 className="font-bold text-[#7D1F1F] dark:text-primary">
              Thông tin học sinh
            </h1>
            <InformationHolder label="Mã học sinh" data={student.studentCode} />
            <InformationHolder label="Họ và tên" data={student.account.name} />
            <InformationHolder
              label="Giới tính"
              data={genderLabelMap[student.account.gender]}
            />
            <InformationHolder
              label="Ngày sinh"
              data={format(student.account.dob, "dd MMMM, yyyy", {
                locale: vi,
              })}
            />
            <InformationHolder
              label="CMND/CCCD"
              data={student.account.idCardNumber}
            />
            <InformationHolder label="Email" data={student.account.email} />
            <InformationHolder
              label="Địa chỉ liên lạc"
              data={student.account.address}
            />
          </div>
          <div className="pl-3 flex flex-col gap-3">
            <h1 className="font-bold text-[#7D1F1F] dark:text-primary">
              Thông tin đào tạo
            </h1>
            <InformationHolder label="Trường học" data={student.school?.name} />
            <InformationHolder
              label="Ngành đào tạo"
              data={student.program?.program.name}
            />
            <InformationHolder
              label="Cơ sở"
              data={student.location?.location.name}
            />
            <InformationHolder
              label="Địa chỉ cơ sở chính"
              data={student.location?.location.address}
            />
            <InformationHolder label="Lớp" />
            <InformationHolder
              label="Điểm trung bình tích lũy (Hồ sơ)"
              data={`${student.gradeScore} (${
                student.gradeType === GradeType.CGPA ? "CGPA" : "GPA"
              })`}
            />
            <InformationHolder
              label="Chứng chỉ ngoại ngữ"
              data={student.certificateType}
            />
            <InformationHolder
              label="Trình độ học tập"
              data={student.degreeType}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
