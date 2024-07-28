import { CreateSchoolForm } from "@/components/forms/school/create/create-school-form";
import { Navbar } from "@/components/navbar";

const CreateSchoolPage = () => {
  return (
    <>
      <Navbar
        title="Thêm trường học"
        description="Vui lòng cung cấp thông tin cần thiết để tạo trường học mới"
      />
      <div className="pt-20 size-full">
        <CreateSchoolForm />
      </div>
    </>
  );
};

export default CreateSchoolPage;
