"use client";

import { register } from "@/actions/account";
import { useAccountCertificateImage } from "@/hooks/use-account-certificate-image";
import { useCities, useDistricts, useWards } from "@/hooks/use-country";
import { useCreateAccount } from "@/hooks/use-create-account";
import { useModalAction } from "@/hooks/use-modal-action";
import { useSchools } from "@/hooks/use-schools";
import { RegisterSchema } from "@/types";
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
} from "@nextui-org/react";
import { CertificateType, DegreeType, Gender, GradeType } from "@prisma/client";
import { I18nProvider } from "@react-aria/i18n";
import {
  Calendar,
  Eye,
  EyeOff,
  File,
  Home,
  Key,
  Mail,
  NotebookText,
  Phone,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidCity } from "react-icons/bi";
import { FaStreetView } from "react-icons/fa";
import { GiStreetLight } from "react-icons/gi";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

type AccountSchema = z.infer<typeof RegisterSchema>;

const CreateAccountModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const { isOpen, onClose } = useCreateAccount();
  const cancel = useModalAction();
  const certificate = useAccountCertificateImage();

  const onDispose = () => {
    onClose();
    cancel.onClose();
  };

  const toggleVisibility = () => {
    setIsVisible(true);

    setTimeout(() => setIsVisible(false), 1000);
  };

  const toggleConfirmVisibility = () => {
    setIsConfirmVisible(true);

    setTimeout(() => setIsConfirmVisible(false), 1000);
  };

  const schools = useSchools();

  const form = useForm<AccountSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      dob: new Date("2006-01-01"),
      gender: Gender.MALE,
      phoneNumber: "",
      idCardNumber: "",
      city: "",
      district: "",
      ward: "",
      addressLine: "",
      schoolName: "",
      programName: "",
      degreeType: DegreeType.HIGHSCHOOL,
      certificateType: CertificateType.IELTS,
      gradeType: GradeType.GPA,
      gradeScore: "0",
    },
  });

  const onSubmit = async (values: AccountSchema) => {
    setIsLoading(true);

    await register(values)
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
  form.watch("certificateImg");
  form.watch("gradeType");
  form.watch("certificateType");
  form.watch("degreeType");

  const cities: City[] = useCities() || [];
  const districts: District[] = useDistricts(form.getValues("city")) || [];
  const wards: Ward[] =
    useWards(form.getValues("city"), form.getValues("district")) || [];

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
              Thêm tài khoản mới
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
                    {/* Password */}
                    <FormField
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              isDisabled={isLoading}
                              label="Mật khẩu"
                              labelPlacement="outside"
                              type={isVisible ? "text" : "password"}
                              variant="bordered"
                              size="md"
                              placeholder="Nhập mật khẩu tài khoản"
                              startContent={<Key className="size-4" />}
                              endContent={
                                <button
                                  className="focus:outline-none"
                                  type="button"
                                  onClick={toggleVisibility}
                                >
                                  {isVisible ? (
                                    <EyeOff className="size-4" />
                                  ) : (
                                    <Eye className="size-4" />
                                  )}
                                </button>
                              }
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              isRequired
                              onValueChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {/* Confirm Password */}
                    <FormField
                      name="confirmPassword"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              isDisabled={isLoading}
                              label="Nhập lại mật khẩu"
                              labelPlacement="outside"
                              type={isConfirmVisible ? "text" : "password"}
                              variant="bordered"
                              size="md"
                              placeholder="Nhập lại mật khẩu tài khoản"
                              startContent={<Key className="size-4" />}
                              endContent={
                                <button
                                  className="focus:outline-none"
                                  type="button"
                                  onClick={toggleConfirmVisibility}
                                >
                                  {isConfirmVisible ? (
                                    <EyeOff className="size-4" />
                                  ) : (
                                    <Eye className="size-4" />
                                  )}
                                </button>
                              }
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              isRequired
                              onValueChange={field.onChange}
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
                              selectedKeys={[field.value]}
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
                                  selectedKeys={[field.value]}
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
                                    {
                                      key: "HIGHSCHOOL",
                                      label: "Highschool",
                                      value: DegreeType.HIGHSCHOOL,
                                    },
                                    {
                                      key: "UNIVERSITY",
                                      label: "University",
                                      value: DegreeType.UNIVERSITY,
                                    },
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
                                    {
                                      key: "IELTS",
                                      label: "IELTS",
                                      value: CertificateType.IELTS,
                                    },
                                    {
                                      key: "TOEFL",
                                      label: "TOEFL",
                                      value: CertificateType.TOEFL,
                                    },
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
                        {/* Language Image URL */}
                        {form.getValues("certificateType") != null &&
                          (form.getValues("certificateImg") != null ? (
                            <FormField
                              name="certificateImg"
                              control={form.control}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <HoverCard>
                                      <HoverCardTrigger>
                                        <Input
                                          readOnly={true}
                                          label="Ảnh chứng chỉ"
                                          labelPlacement="outside"
                                          size="md"
                                          variant="faded"
                                          classNames={{
                                            input: "cursor-default",
                                          }}
                                          isClearable
                                          onValueChange={field.onChange}
                                          {...field}
                                          value={
                                            field.value &&
                                            "Trỏ chuột để hiển thị hình ảnh chi tiết"
                                          }
                                        />
                                      </HoverCardTrigger>
                                      <HoverCardContent
                                        align="center"
                                        alignOffset={10}
                                        className="flex w-80 items-center justify-center rounded-md"
                                      >
                                        <Image
                                          width={300}
                                          src={field.value}
                                          alt="certificate-image"
                                          isZoomed
                                          isBlurred
                                          shadow="md"
                                        />
                                      </HoverCardContent>
                                    </HoverCard>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          ) : (
                            <>
                              <FormField
                                name="certificateImg"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        onClick={() =>
                                          certificate.onOpen((e) =>
                                            form.setValue("certificateImg", e)
                                          )
                                        }
                                        role="button"
                                        value="Đăng tải hình ảnh"
                                        readOnly={true}
                                        label="Đường dẫn hình ảnh"
                                        labelPlacement="outside"
                                        size="md"
                                        variant="faded"
                                        startContent={
                                          <File className="mr-2 size-4" />
                                        }
                                        errorMessage={fieldState.error?.message}
                                        isInvalid={!!fieldState.error}
                                        isRequired
                                        classNames={{
                                          input: "cursor-default",
                                        }}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </>
                          ))}
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
                  <Button color="primary" type="submit" isDisabled={isLoading}>
                    Thêm
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

export default CreateAccountModal;
