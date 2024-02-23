import { Button, Link } from "@nextui-org/react";

const NotFound = () => {
  return (
    <div className="w-full h-full bg-white dark:bg-background flex justify-center items-center flex-col gap-3">
      <h1 className="text-4xl font-bold text-rose-500">Lỗi!</h1>
      <p className="font-semibold text-lg text-primary">
        Không tìm thấy địa chỉ web bạn đang tìm kiếm
      </p>
      <Button as={Link} href="/" variant="shadow" color="primary">
        Quay về trang chủ
      </Button>
    </div>
  );
};

export default NotFound;
