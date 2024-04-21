"use client";

import { updateStudent } from "@/actions/student";
import { useCities, useDistricts, useWards } from "@/hooks/use-country";
import { useModalAction } from "@/hooks/use-modal-action";
import { useSchools } from "@/hooks/use-schools";
import { useUpdateAccount } from "@/hooks/use-update-account";
import { UpdateStudent } from "@/types";
import { City, District, Ward } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseDate } from "@internationalized/date";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DateInput,
  Divider,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Selection,
  Textarea,
} from "@nextui-org/react";
import {
  CertificateType,
  DegreeType,
  Gender,
  GradeType,
  StudentStatus,
} from "@prisma/client";
import { I18nProvider } from "@react-aria/i18n";
import { Calendar, Home, Mail, NotebookText, Phone, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidCity } from "react-icons/bi";
import { FaStreetView } from "react-icons/fa";
import { GiStreetLight } from "react-icons/gi";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

type AccountSchema = z.infer<typeof UpdateStudent>;

const UpdateAccountModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, data } = useUpdateAccount();
  const [status, setStatus] = useState<string>("");
  const [additional, setAdditional] = useState("");
  const cancel = useModalAction();

  useEffect(() => {
    setStatus(data?.status.toString() ?? "");
    setAdditional(data?.additional ?? "");
  }, [data?.status, data?.additional]);

  const onDispose = () => {
    onClose();
    cancel.onClose();
  };

  const schools = useSchools();

  const addressComps = data?.account?.address.split(", ");

  const form = useForm<AccountSchema>({
    resolver: zodResolver(UpdateStudent),
    defaultValues: {
      email: data?.account?.email,
      name: data?.account?.name,
      dob: data?.account?.dob,
      gender: data?.account?.gender,
      phoneNumber: data?.account?.phoneNumber,
      idCardNumber: data?.account?.idCardNumber,
      city: addressComps && addressComps[3],
      district: addressComps && addressComps[2],
      ward: addressComps && addressComps[1],
      addressLine: addressComps && addressComps[0],
      schoolName: data?.school?.name,
      programName: data?.program?.program.name,
      degreeType: data?.degreeType,
      certificateType: data?.certificateType,
      gradeType: data?.gradeType,
      gradeScore: data?.gradeScore.toString(),
    },
  });

  const onSubmit = async (values: AccountSchema) => {
    setIsLoading(true);

    const selectStatus: StudentStatus = status as StudentStatus;

    await updateStudent(data?.id!, {
      status: selectStatus,
      additional,
      ...values,
    })
      .then((res) => {
        if (res.success) {
          toast.success(res.success);
          router.refresh();
          onClose();
        }

        if (res.error) {
          toast.error(res.error);
        }
      })
      .finally(() => setIsLoading(false));
  };

  form.watch("schoolName");
  form.watch("gradeType");
  form.watch("certificateType");
  form.watch("degreeType");

  const cities: City[] = useCities() || [];
  const districts: District[] = useDistricts(form.getValues("city")!) || [];
  const wards: Ward[] =
    useWards(form.getValues("city")!, form.getValues("district")!) || [];

  if (!schools) {
    return (
      <div className="flex items-center justify-center text-center font-bold text-priamry text-2xl">
        Lỗi dữ liệu không tìm thấy trường học
      </div>
    );
  }

  const programs =
    schools.find((school) => school.name === form.getValues("schoolName"))
      ?.programs || [];

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  return (
    <Modal
      size="5xl"
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      hideCloseButton
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-[#7D1F1F] text-xl dark:text-primary font-bold">
              Cập nhật thông tin tài khoản
            </ModalHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <ModalBody className="text-primary flex-col gap-4 max-h-[60vh] overflow-y-scroll">
                  <h1 className="text-[#7D1F1F] dark:text-primary text-base font-semibold">
                    Tài khoản
                  </h1>
                  {/* Account */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Email */}
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              isDisabled={isLoading}
                              label="Email"
                              labelPlacement="outside"
                              type="email"
                              variant="bordered"
                              size="md"
                              placeholder="Nhập email tài khoản"
                              startContent={<Mail className="size-4" />}
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              isRequired
                              isClearable
                              onValueChange={field.onChange}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {/* Name */}
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              isDisabled={isLoading}
                              label="Fullname"
                              labelPlacement="outside"
                              variant="bordered"
                              size="md"
                              placeholder="Enter your fullname"
                              startContent={<Tag className="size-4" />}
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              isRequired
                              isClearable
                              onValueChange={field.onChange}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Select
                      disallowEmptySelection
                      items={[
                        StudentStatus.APPROVED,
                        StudentStatus.AWAITING,
                        StudentStatus.DROPPED,
                        StudentStatus.STUDYING,
                      ]}
                      isDisabled={isLoading}
                      label="Trạng thái"
                      labelPlacement="outside"
                      variant="bordered"
                      size="md"
                      aria-label="Chọn bằng cấp"
                      placeholder="Chọn bằng cấp"
                      isRequired
                      onChange={handleStatusChange}
                      defaultSelectedKeys={[data?.status!]}
                      classNames={{
                        listbox: "text-primary",
                      }}
                    >
                      <SelectItem key={StudentStatus.AWAITING}>
                        AWAITING
                      </SelectItem>
                      <SelectItem key={StudentStatus.APPROVED}>
                        APPROVED
                      </SelectItem>
                      <SelectItem key={StudentStatus.DROPPED}>
                        DROPPED
                      </SelectItem>
                      <SelectItem key={StudentStatus.STUDYING}>
                        STUDYING
                      </SelectItem>
                    </Select>
                  </div>
                  <Divider />
                  <h1 className="text-[#7D1F1F] dark:text-primary text-base font-semibold">
                    Hồ sơ
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Date of birth */}
                    <FormField
                      name="dob"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <I18nProvider locale="hi-u-ca">
                              <DateInput
                                isDisabled={isLoading}
                                startContent={<Calendar className="size-4" />}
                                minValue={parseDate("1970-01-01")}
                                defaultValue={parseDate("2006-01-01")}
                                maxValue={parseDate("2006-12-31")}
                                label="Ngày sinh"
                                labelPlacement="outside"
                                variant="bordered"
                                size="md"
                                errorMessage={fieldState.error?.message}
                                isInvalid={!!fieldState.error}
                                isRequired
                                onChange={(e) => {
                                  const calendarDate = e;
                                  field.onChange(
                                    new Date(
                                      calendarDate.year,
                                      calendarDate.month - 1,
                                      calendarDate.day
                                    )
                                  );
                                }}
                              />
                            </I18nProvider>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {/* Gender */}
                    <FormField
                      name="gender"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              orientation="horizontal"
                              isDisabled={isLoading}
                              label="Giới tính"
                              size="md"
                              defaultValue={Gender.MALE}
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              isRequired
                              classNames={{
                                label: "text-sm text-primary",
                              }}
                              onValueChange={field.onChange}
                              {...field}
                            >
                              <Radio value={Gender.MALE}>Male</Radio>
                              <Radio value={Gender.FEMALE}>Female</Radio>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {/* Phone Number */}
                    <FormField
                      name="phoneNumber"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              isDisabled={isLoading}
                              label="Số điện thoại"
                              labelPlacement="outside"
                              variant="bordered"
                              size="md"
                              placeholder="Nhập số điện thoại"
                              startContent={<Phone className="size-4" />}
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              isRequired
                              isClearable
                              onValueChange={field.onChange}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {/* Id Card Number */}
                    <FormField
                      name="idCardNumber"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              isDisabled={isLoading}
                              label="CCCD/CMND"
                              labelPlacement="outside"
                              variant="bordered"
                              size="md"
                              placeholder="Nhập CCCD/CMND"
                              startContent={<NotebookText className="size-4" />}
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              isRequired
                              isClearable
                              onValueChange={field.onChange}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <h1 className="text-[#7D1F1F] dark:text-primary text-sm font-semibold">
                    Địa chỉ
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Select city */}
                    <FormField
                      name="city"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <Autocomplete
                              defaultItems={cities}
                              selectedKey={field.value}
                              isDisabled={isLoading}
                              label="Tỉnh/thành phố"
                              labelPlacement="outside"
                              variant="bordered"
                              size="md"
                              placeholder="Chọn một tỉnh/thành phố"
                              startContent={
                                <BiSolidCity className="text-xl font-thin" />
                              }
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              isRequired
                              listboxProps={{
                                itemClasses: {
                                  base: [
                                    "rounded-medium",
                                    "text-default-500",
                                    "transition-opacity",
                                    "data-[hover=true]:text-foreground",
                                    "data-[pressed=true]:opacity-70",
                                    "data-[hover=true]:bg-default-200",
                                    "data-[selectable=true]:focus:bg-default-100",
                                    "data-[focus-visible=true]:ring-default-500",
                                  ],
                                },
                              }}
                              onSelectionChange={field.onChange}
                              {...field}
                            >
                              {cities.map((city) => (
                                <AutocompleteItem key={city.Name}>
                                  {city.Name}
                                </AutocompleteItem>
                              ))}
                            </Autocomplete>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {/* Select district */}
                    <FormField
                      name="district"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <Autocomplete
                              defaultItems={districts}
                              selectedKey={field.value}
                              isDisabled={isLoading}
                              label="Quận/huyện"
                              labelPlacement="outside"
                              variant="bordered"
                              size="md"
                              placeholder="Chọn một quận/huyện"
                              startContent={
                                <GiStreetLight className="text-xl font-thin" />
                              }
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              isRequired
                              listboxProps={{
                                itemClasses: {
                                  base: [
                                    "rounded-medium",
                                    "text-default-500",
                                    "transition-opacity",
                                    "data-[hover=true]:text-foreground",
                                    "data-[pressed=true]:opacity-70",
                                    "data-[hover=true]:bg-default-200",
                                    "data-[selectable=true]:focus:bg-default-100",
                                    "data-[focus-visible=true]:ring-default-500",
                                  ],
                                },
                              }}
                              onSelectionChange={field.onChange}
                              {...field}
                            >
                              {districts.length > 0 ? (
                                districts.map((district) => (
                                  <AutocompleteItem key={district.Name}>
                                    {district.Name}
                                  </AutocompleteItem>
                                ))
                              ) : (
                                <AutocompleteItem key={"Empty"}>
                                  <span>Vui lòng chọn tỉnh/thành phố</span>
                                </AutocompleteItem>
                              )}
                            </Autocomplete>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {/* Select a ward */}
                    <FormField
                      name="ward"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <Autocomplete
                              defaultItems={wards}
                              selectedKey={field.value}
                              isDisabled={isLoading}
                              label="Phường"
                              labelPlacement="outside"
                              variant="bordered"
                              size="md"
                              placeholder="Vui lòng chọn phường"
                              startContent={
                                <FaStreetView className="text-xl font-thin" />
                              }
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              isRequired
                              listboxProps={{
                                itemClasses: {
                                  base: [
                                    "rounded-medium",
                                    "text-default-500",
                                    "transition-opacity",
                                    "data-[hover=true]:text-foreground",
                                    "data-[pressed=true]:opacity-70",
                                    "data-[hover=true]:bg-default-200",
                                    "data-[selectable=true]:focus:bg-default-100",
                                    "data-[focus-visible=true]:ring-default-500",
                                  ],
                                },
                              }}
                              onSelectionChange={field.onChange}
                              {...field}
                            >
                              {wards.length > 0 ? (
                                wards.map((ward) => (
                                  <AutocompleteItem key={ward.Name}>
                                    {ward.Name}
                                  </AutocompleteItem>
                                ))
                              ) : (
                                <AutocompleteItem key={"Empty"}>
                                  <span>Vui lòng chọn phường</span>
                                </AutocompleteItem>
                              )}
                            </Autocomplete>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="addressLine"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FormItem className="col-span-1 md:col-span-2 lg:col-span-3">
                          <FormControl>
                            <Input
                              isDisabled={isLoading}
                              label="Địa chỉ thường trú"
                              labelPlacement="outside"
                              variant="bordered"
                              size="md"
                              placeholder="Vui lòng nhập địa chỉ thường trú"
                              description="Ví dụ: Tòa nhà 4B Block A, 6A Trần Quốc Toản"
                              startContent={<Home className="size-4" />}
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              isRequired
                              isClearable
                              className="pt-6"
                              onValueChange={field.onChange}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Divider />
                  <h1 className="text-[#7D1F1F] dark:text-primary text-base font-semibold">
                    Trường học
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* School Name */}
                    <FormField
                      name="schoolName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              data-testid="school-name"
                              disallowEmptySelection
                              items={schools}
                              isDisabled={isLoading}
                              label="School"
                              selectedKeys={[field.value!]}
                              labelPlacement="outside"
                              variant="bordered"
                              size="md"
                              aria-label="Chọn trường học"
                              placeholder="Chọn trường học"
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              isRequired
                              onSelectionChange={field.onChange}
                              classNames={{
                                listbox: "text-primary",
                              }}
                              {...field}
                            >
                              {schools.map((school) => (
                                <SelectItem
                                  key={school.name}
                                  startContent={
                                    <Image
                                      width={30}
                                      src={
                                        schools.filter(
                                          (item) => item.name === school.name
                                        )[0].logo
                                      }
                                      alt="Logo"
                                    />
                                  }
                                >
                                  {school.name}
                                </SelectItem>
                              ))}
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.getValues("schoolName") && (
                      <>
                        {/* Program Name */}
                        <FormField
                          name="programName"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormControl>
                                <Select
                                  onSelectionChange={field.onChange}
                                  disallowEmptySelection
                                  items={programs}
                                  isDisabled={isLoading}
                                  label="Ngành đào tạo"
                                  labelPlacement="outside"
                                  variant="bordered"
                                  size="md"
                                  aria-label="Choose ngành đào tạo"
                                  placeholder="Choose ngành đào tạo"
                                  errorMessage={fieldState.error?.message}
                                  isInvalid={!!fieldState.error}
                                  isRequired
                                  selectedKeys={[field.value!]}
                                  classNames={{
                                    listbox: "text-primary",
                                  }}
                                  {...field}
                                >
                                  {programs.map((program) => (
                                    <SelectItem key={program.name}>
                                      {program.name}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        {/* degreeName */}
                        <FormField
                          name="degreeType"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormControl>
                                <Select
                                  disallowEmptySelection
                                  items={[
                                    DegreeType.HIGHSCHOOL,
                                    DegreeType.UNIVERSITY,
                                  ]}
                                  isDisabled={isLoading}
                                  label="Bằng cấp"
                                  labelPlacement="outside"
                                  variant="bordered"
                                  size="md"
                                  aria-label="Chọn bằng cấp"
                                  placeholder="Chọn bằng cấp"
                                  errorMessage={fieldState.error?.message}
                                  isInvalid={!!fieldState.error}
                                  isRequired
                                  onSelectionChange={field.onChange}
                                  defaultSelectedKeys={[DegreeType.HIGHSCHOOL]}
                                  classNames={{
                                    listbox: "text-primary",
                                  }}
                                  {...field}
                                >
                                  <SelectItem key={DegreeType.HIGHSCHOOL}>
                                    Highschool
                                  </SelectItem>
                                  <SelectItem key={DegreeType.UNIVERSITY}>
                                    University
                                  </SelectItem>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* Language Type */}
                        <FormField
                          name="certificateType"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormControl>
                                <Select
                                  disallowEmptySelection
                                  items={[
                                    CertificateType.IELTS,
                                    CertificateType.TOEFL,
                                  ]}
                                  isDisabled={isLoading}
                                  label="Chứng chỉ"
                                  labelPlacement="outside"
                                  variant="bordered"
                                  size="md"
                                  aria-label="Chọn chứng chỉ"
                                  placeholder="Chọn chứng chỉ"
                                  errorMessage={fieldState.error?.message}
                                  isInvalid={!!fieldState.error}
                                  isRequired
                                  onSelectionChange={field.onChange}
                                  defaultSelectedKeys={[CertificateType.IELTS]}
                                  classNames={{
                                    listbox: "text-primary",
                                  }}
                                  {...field}
                                >
                                  <SelectItem key={CertificateType.IELTS}>
                                    IELTS
                                  </SelectItem>
                                  <SelectItem key={CertificateType.TOEFL}>
                                    TOEFL
                                  </SelectItem>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        {/* Overall Score */}
                        <FormField
                          name="gradeType"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormControl>
                                <RadioGroup
                                  orientation="horizontal"
                                  isDisabled={isLoading}
                                  label="Overall Score"
                                  size="md"
                                  defaultValue={field.value}
                                  errorMessage={fieldState.error?.message}
                                  isInvalid={!!fieldState.error}
                                  isRequired
                                  classNames={{
                                    label: "text-sm text-primary",
                                    wrapper: "gap-x-4",
                                  }}
                                  onValueChange={field.onChange}
                                  {...field}
                                >
                                  <Radio value={GradeType.GPA}>
                                    GPA (?/4.0)
                                  </Radio>
                                  <Radio value={GradeType.CGPA}>
                                    CGPA (?/10.0)
                                  </Radio>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* Grade Score */}
                        <FormField
                          name="gradeScore"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  isDisabled={isLoading}
                                  defaultValue={"1"}
                                  type="number"
                                  min={0}
                                  max={
                                    form.getValues("gradeType") ===
                                    GradeType.GPA
                                      ? 4
                                      : 10
                                  }
                                  step={0.1}
                                  label="Điểm trung bình tích lũy"
                                  labelPlacement="outside"
                                  variant="bordered"
                                  size="md"
                                  errorMessage={fieldState.error?.message}
                                  isInvalid={!!fieldState.error}
                                  isRequired
                                  className="w-full max-w-[150px] pt-6"
                                  onValueChange={field.onChange}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </div>
                  <h1 className="text-[#7D1F1F] dark:text-primary text-base font-semibold">
                    Thông tin bổ sung
                  </h1>
                  <Textarea
                    size="md"
                    variant="bordered"
                    label={"Thông tin bổ sung? (nếu có)"}
                    labelPlacement="outside"
                    defaultValue={additional}
                    placeholder="Mô tả chi tiết tại đây"
                    onValueChange={(value) => setAdditional(value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() =>
                      cancel.onOpen(
                        onDispose,
                        "Bạn chắc chắn muốn đóng?",
                        "Hành động này sẽ hủy bỏ mọi thông tin đã nhập."
                      )
                    }
                  >
                    Đóng
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isDisabled={isLoading}
                    isLoading={isLoading}
                  >
                    Cập nhật
                  </Button>
                </ModalFooter>
              </form>
            </Form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdateAccountModal;
