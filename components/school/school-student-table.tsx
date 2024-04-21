"use client";

import { SchoolStudentExtend } from "@/types/type";
import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import {
  ChevronDownIcon,
  MoreVertical,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { ChangeEvent, Key, useCallback, useMemo, useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { useCreateAccount } from "@/hooks/use-create-account";

interface SchoolStudentProps {
  students: SchoolStudentExtend[];
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  AWAITING: "default",
  STUDYING: "warning",
  APPROVED: "success",
  DROPPED: "danger",
};

const degreeColorMap: Record<string, ChipProps["color"]> = {
  HIGHSCHOOL: "warning",
  UNIVERSITY: "success",
};

const columns = [
  { name: "Id", uid: "id", sortable: true },
  { name: "Học sinh", uid: "name" },
  { name: "Ngày sinh", uid: "dob" },
  { name: "Ngành đào tạo", uid: "program", sortable: true },
  { name: "Trạng thái", uid: "status", sortable: true },
  { name: "Bằng cấp", uid: "degree", sortable: true },
  { name: "Điểm tích lũy", uid: "gradeScore", sortable: true },
  { name: "Hành động", uid: "actions" },
];

const statusOptions = [
  { name: "AWAITING", uid: "AWAITING" },
  { name: "STUDYING", uid: "STUDYING" },
  { name: "APPROVED", uid: "APPROVED" },
  { name: "DROPPED", uid: "DROPPED" },
];

const INITIAL_COLUMNS = ["name", "program", "status", "actions"];

export const SchoolStudentTable = ({ students }: SchoolStudentProps) => {
  const account = useCreateAccount();

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "account.name",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredStudents = [...students];

    if (hasSearchFilter) {
      filteredStudents = filteredStudents.filter((student) =>
        student.account.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredStudents = filteredStudents.filter((student) =>
        Array.from(statusFilter).includes(student.status)
      );
    }

    return filteredStudents;
  }, [students, filterValue, statusFilter, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: SchoolStudentExtend, b: SchoolStudentExtend) => {
      const first = a[
        sortDescriptor.column as keyof SchoolStudentExtend
      ] as number;
      const second = b[
        sortDescriptor.column as keyof SchoolStudentExtend
      ] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback(
    (student: SchoolStudentExtend, columnKey: Key) => {
      switch (columnKey) {
        case "id":
          return (
            <p className="font-bold text-tiny text-primary">{student.id}</p>
          );
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: student.account.image || "" }}
              description={student.studentCode}
              name={student.account.name}
            />
          );
        case "dob":
          return (
            <p className="font-bold text-tiny capitalize text-primary">
              {format(student.account.dob, "dd MMMM, yyyy", {
                locale: vi,
              })}
            </p>
          );
        case "program":
          return (
            <p className="font-bold text-tiny capitalize text-primary">
              {student.program?.program.name}
            </p>
          );
        case "degree":
          return (
            <div className="flex items-center justify-center">
              <Chip
                className="capitalize"
                color={degreeColorMap[student.degreeType]}
                size="sm"
                variant="flat"
              >
                {student.degreeType}
              </Chip>
            </div>
          );
        case "status":
          return (
            <div className="flex items-center justify-center">
              <Chip
                className="capitalize"
                color={statusColorMap[student.status]}
                size="sm"
                variant="flat"
              >
                {student.status}
              </Chip>
            </div>
          );
        case "gradeScore":
          return (
            <p className="font-bold text-tiny capitalize text-primary text-center">
              {student.gradeScore + " (" + student.gradeType + ")"}
            </p>
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
                  <DropdownItem href={`/managements/students/${student.id}`}>
                    Xem thông tin chi tiết
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return <div></div>;
      }
    },
    []
  );

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

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Tìm kiếm theo tên..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
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
            Tổng số: {students.length} học sinh
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
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    students.length,
    onClear,
    account.onOpen,
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

  return (
    <Table
      aria-label="School students table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
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
      <TableBody emptyContent={"Không tìm thấy học sinh"} items={sortedItems}>
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
