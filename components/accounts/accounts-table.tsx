"use client";

import { useCreateAccount } from "@/hooks/use-create-account";
import { useModalAction } from "@/hooks/use-modal-action";
import { AccountLib } from "@/types/type";
import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import {
  ChevronDownIcon,
  MoreVertical,
  PlusIcon,
  SearchIcon,
  Sheet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Key, useCallback, useMemo, useState } from "react";

interface AccountsProps {
  accounts: AccountLib[];
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  AWAITING: "default",
  STUDYING: "warning",
  APPROVED: "success",
  DROPPED: "danger",
};

const columns = [
  { name: "Id", uid: "id", sortable: true },
  { name: "Mã học sinh", uid: "student.studentCode", sortable: true },
  { name: "Tên tài khoản", uid: "name", sortable: true },
  { name: "Email", uid: "email", sortable: true },
  { name: "CCCD/CMND", uid: "idCardNumber", sortable: true },
  { name: "Số điện thoại", uid: "phoneNumber", sortable: true },
  { name: "Ngày sinh", uid: "dob", sortable: true },
  { name: "Địa chỉ", uid: "address", sortable: true },
  { name: "Xác thực email", uid: "emailVerified", sortable: true },
  { name: "Ảnh đại diện", uid: "image" },
  { name: "Trạng thái", uid: "student.status", sortable: true },
  { name: "Hành động", uid: "actions" },
];

const statusOptions = [
  { name: "CHỜ DUYỆT", uid: "AWAITING" },
  { name: "ĐANG HỌC", uid: "STUDYING" },
  { name: "ĐÃ DUYỆT", uid: "APPROVED" },
  { name: "ĐÃ NGHỈ HỌC/TỪ CHỐI", uid: "DROPPED" },
];

const INITIAL_COLUMNS = [
  "student.studentCode",
  "name",
  "email",
  "idCardNumber",
  "student.status",
  "actions",
];

export const AccountsTable = ({ accounts }: AccountsProps) => {
  const action = useModalAction();
  const account = useCreateAccount();
  const router = useRouter();

  const [filterNameValue, setFilterNameValue] = useState("");
  const [filterStudentCodeValue, setFilterStudentCodeValue] = useState("");
  const [filterEmailValue, setFilterEmailValue] = useState("");
  const [filterCardValue, setFilterCardValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});

  const [page, setPage] = useState(1);

  const hasSearchStudentCodeFilter = Boolean(filterStudentCodeValue);
  const hasSearchNameFilter = Boolean(filterNameValue);
  const hasSearchEmailFilter = Boolean(filterEmailValue);
  const hasSearchCardFilter = Boolean(filterCardValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredAccounts = [...accounts];

    if (hasSearchNameFilter) {
      filteredAccounts = filteredAccounts.filter((account) =>
        account.name.toLowerCase().includes(filterNameValue.toLowerCase())
      );
    }

    if (hasSearchStudentCodeFilter) {
      filteredAccounts = filteredAccounts.filter((account) =>
        account.student?.studentCode
          ?.toLowerCase()
          .includes(filterStudentCodeValue.toLowerCase())
      );
    }

    if (hasSearchEmailFilter) {
      filteredAccounts = filteredAccounts.filter((account) =>
        account.email.toLowerCase().includes(filterEmailValue.toLowerCase())
      );
    }

    if (hasSearchCardFilter) {
      filteredAccounts = filteredAccounts.filter((account) =>
        account.idCardNumber
          .toLowerCase()
          .includes(filterCardValue.toLowerCase())
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredAccounts = filteredAccounts.filter((account) =>
        Array.from(statusFilter).includes(account.student?.status!)
      );
    }

    return filteredAccounts;
  }, [
    accounts,
    filterNameValue,
    filterStudentCodeValue,
    filterEmailValue,
    filterCardValue,
    statusFilter,
    hasSearchNameFilter,
    hasSearchStudentCodeFilter,
    hasSearchEmailFilter,
    hasSearchCardFilter,
  ]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: AccountLib, b: AccountLib) => {
      const first = a[
        sortDescriptor.column as keyof AccountLib
      ] as unknown as number;
      const second = b[
        sortDescriptor.column as keyof AccountLib
      ] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((account: AccountLib, columnKey: Key) => {
    switch (columnKey) {
      case "id":
        return <p className="font-bold text-tiny text-primary">{account.id}</p>;
      case "student.studentCode":
        return (
          <p className="font-bold text-tiny text-primary">
            {account.student?.studentCode ?? "Không có thông tin"}
          </p>
        );
      case "name":
        return (
          <p className="font-bold text-tiny text-primary">{account.name}</p>
        );
      case "email":
        return (
          <p className="font-bold text-tiny text-primary">{account.email}</p>
        );
      case "idCardNumber":
        return (
          <p className="font-bold text-tiny text-primary">
            {account.idCardNumber}
          </p>
        );
      case "phoneNumber":
        return (
          <p className="font-bold text-tiny text-primary">
            {account.phoneNumber}
          </p>
        );
      case "dob":
        return (
          <p className="font-bold text-tiny text-primary">
            {format(account.dob, "dd MMMM, yyyy", {
              locale: vi,
            })}
          </p>
        );
      case "address":
        return (
          <p className="font-bold text-tiny text-primary">{account.address}</p>
        );
      case "emailVerified":
        return (
          <p className="font-bold text-tiny text-primary">
            {account.emailVerified
              ? format(account.emailVerified, "dd MMMM, yyyy", {
                  locale: vi,
                })
              : "Chưa xác thực"}
          </p>
        );
      case "image":
        return (
          <p className="font-bold text-tiny text-primary">
            {account.image ?? "Không có thông tin"}
          </p>
        );
      case "student.status":
        return (
          <div className="flex items-center justify-center">
            <Chip
              className="capitalize"
              color={statusColorMap[account.student?.status!]}
              size="sm"
              variant="flat"
            >
              {account.student?.status}
            </Chip>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <MoreVertical className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  endContent={<Sheet className="size-4" />}
                  href={`/managements/students/${account.student?.id!}`}
                >
                  Xem thông tin chi tiết
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return <div></div>;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchStudentCodeChange = useCallback((value?: string) => {
    if (value) {
      setFilterStudentCodeValue(value);
      setPage(1);
    } else {
      setFilterStudentCodeValue("");
    }
  }, []);

  const onSearchNameChange = useCallback((value?: string) => {
    if (value) {
      setFilterNameValue(value);
      setPage(1);
    } else {
      setFilterNameValue("");
    }
  }, []);

  const onSearchEmailChange = useCallback((value?: string) => {
    if (value) {
      setFilterEmailValue(value);
      setPage(1);
    } else {
      setFilterEmailValue("");
    }
  }, []);

  const onSearchCardChange = useCallback((value?: string) => {
    if (value) {
      setFilterCardValue(value);
      setPage(1);
    } else {
      setFilterCardValue("");
    }
  }, []);

  const onClearStudentCode = useCallback(() => {
    setFilterStudentCodeValue("");
    setPage(1);
  }, []);

  const onClearName = useCallback(() => {
    setFilterNameValue("");
    setPage(1);
  }, []);

  const onClearEmail = useCallback(() => {
    setFilterEmailValue("");
    setPage(1);
  }, []);

  const onClearCard = useCallback(() => {
    setFilterCardValue("");
    setPage(1);
  }, []);

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Input
            isClearable
            className="w-full"
            placeholder="Tìm kiếm theo mã học sinh..."
            startContent={<SearchIcon />}
            value={filterStudentCodeValue}
            onClear={() => onClearStudentCode()}
            onValueChange={onSearchStudentCodeChange}
          />
          <Input
            isClearable
            className="w-full"
            placeholder="Tìm kiếm theo tên tài khoản..."
            startContent={<SearchIcon />}
            value={filterNameValue}
            onClear={() => onClearName()}
            onValueChange={onSearchNameChange}
          />
          <Input
            isClearable
            className="w-full"
            placeholder="Tìm kiếm theo email..."
            startContent={<SearchIcon />}
            value={filterEmailValue}
            onClear={() => onClearEmail()}
            onValueChange={onSearchEmailChange}
          />
          <Input
            isClearable
            className="w-full"
            placeholder="Tìm kiếm theo cccd/cmnd..."
            startContent={<SearchIcon />}
            value={filterCardValue}
            onClear={() => onClearCard()}
            onValueChange={onSearchCardChange}
          />
        </div>
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Trạng thái
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Danh mục
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              endContent={<PlusIcon />}
              onPress={account.onOpen}
            >
              Thêm học sinh
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Tổng số: {accounts.length} tin tức
          </span>
          <label className="flex items-center text-default-400 text-small">
            Số dòng mỗi trang:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    account.onOpen,
    accounts.length,
    filterStudentCodeValue,
    filterNameValue,
    filterEmailValue,
    filterCardValue,
    visibleColumns,
    onSearchNameChange,
    onSearchStudentCodeChange,
    onSearchEmailChange,
    onSearchCardChange,
    onRowsPerPageChange,
    onClearStudentCode,
    onClearName,
    onClearEmail,
    onClearCard,
    statusFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Đã lựa chọn: Tất cả"
            : `${selectedKeys.size} trên ${filteredItems.length} đã lựa chọn`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Trước
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Sau
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    page,
    pages,
    filteredItems.length,
    onNextPage,
    onPreviousPage,
  ]);

  if (!accounts || !accounts.every((account) => account.student)) return null;

  return (
    <Table
      aria-label="Accounts table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: "max-w-[80vw]",
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            allowsSorting={column.sortable}
            className="text-center"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Không tìm thấy tin tức"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
