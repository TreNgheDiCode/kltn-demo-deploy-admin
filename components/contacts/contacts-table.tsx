"use client";

import { deleteNews } from "@/actions/news";
import { useModalAction } from "@/hooks/use-modal-action";
import { ContactLib } from "@/types/type";
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
} from "@nextui-org/react";
import { ContactTitle } from "@prisma/client";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import {
  ChevronDownIcon,
  MoreVertical,
  PlusIcon,
  SearchIcon,
  Sheet,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Key, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

interface ContactsProps {
  contacts: ContactLib[];
}

const titleColorMap: Record<ContactTitle, ChipProps["color"]> = {
  FEEDBACK: "default",
  SYSTEM: "warning",
  REFUND: "danger",
  BILLING: "danger",
  SUBSCRIPTION: "secondary",
  SCHOLARSHIP: "success",
  PROCEDURE: "secondary",
};

const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "danger",
};

const columns = [
  { name: "Id", uid: "id", sortable: true },
  { name: "Tiêu đề", uid: "title", sortable: true },
  { name: "Tên người gửi", uid: "name", sortable: true },
  { name: "Số điện thoại", uid: "phone", sortable: true },
  { name: "Email", uid: "email", sortable: true },
  { name: "Nội dung", uid: "message", sortable: true },
  { name: "Trường học", uid: "school", sortable: true },
  { name: "Ngày tạo", uid: "createdAt", sortable: true },
  { name: "Đã đọc", uid: "isRead", sortable: true },
  { name: "Hành động", uid: "actions" },
];

const titleOptions = [
  { name: "NHẬN XÉT", uid: "FEEDBACK" },
  { name: "BÁO CÁO LỖI HỆ THỐNG", uid: "SYSTEM" },
  { name: "YÊU CẦU HOÀN TIỀN", uid: "REFUND" },
  { name: "HỌC PHÍ VÀ THANH TOÁN", uid: "BILLING" },
  { name: "HỦY ĐĂNG KÝ", uid: "SUBSCRIPTION" },
  { name: "HỌC BỔNG", uid: "SCHOLARSHIP" },
  { name: "THỦ TỤC DU HỌC", uid: "PROCEDURE" },
];

const statusOptions = [
  { name: "ĐÃ TIẾP NHẬN", uid: "true" },
  { name: "CHƯA TIẾP NHẬN", uid: "false" },
];

const INITIAL_COLUMNS = [
  "name",
  "title",
  "phone",
  "email",
  "message",
  "school",
  "actions",
];

export const ContactsTable = ({ contacts }: ContactsProps) => {
  const action = useModalAction();
  const router = useRouter();

  const [filterEmailValue, setFilterEmailValue] = useState("");
  const [filterPhoneValue, setFilterPhoneValue] = useState("");
  const [filterNameValue, setFilterNameValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_COLUMNS)
  );
  const [titleFilter, setTitleFilter] = useState<Selection>("all");
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});

  const [page, setPage] = useState(1);

  const hasSearchNameFilter = Boolean(filterNameValue);
  const hasSearchEmailFilter = Boolean(filterEmailValue);
  const hasSearchPhoneFilter = Boolean(filterPhoneValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredContacts = [...contacts];

    if (hasSearchNameFilter) {
      filteredContacts = filteredContacts.filter((contact) =>
        contact.name.toLowerCase().includes(filterNameValue.toLowerCase())
      );
    }

    if (hasSearchEmailFilter) {
      filteredContacts = filteredContacts.filter((contact) =>
        contact.email.toLowerCase().includes(filterEmailValue.toLowerCase())
      );
    }

    if (hasSearchPhoneFilter) {
      filteredContacts = filteredContacts.filter((contact) =>
        contact.phone.toLowerCase().includes(filterPhoneValue.toLowerCase())
      );
    }

    if (
      titleFilter !== "all" &&
      Array.from(titleFilter).length !== titleOptions.length
    ) {
      filteredContacts = filteredContacts.filter((contact) =>
        Array.from(titleFilter).includes(contact.title)
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredContacts = filteredContacts.filter((contact) =>
        Array.from(statusFilter).includes(contact.isRead.toString())
      );
    }

    return filteredContacts;
  }, [
    contacts,
    filterEmailValue,
    filterNameValue,
    filterPhoneValue,
    titleFilter,
    statusFilter,
    hasSearchNameFilter,
    hasSearchEmailFilter,
    hasSearchPhoneFilter,
  ]);

  console.log(contacts);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: ContactLib, b: ContactLib) => {
      const first = a[
        sortDescriptor.column as keyof ContactLib
      ] as unknown as number;
      const second = b[
        sortDescriptor.column as keyof ContactLib
      ] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onDelete = useCallback(
    async (id: string) => {
      await deleteNews(id).then((res) => {
        if (res.error) {
          toast.error(res.error);
        }

        if (res.success) {
          toast.success(res.success);
          action.onClose();
          router.refresh();
        }
      });
    },
    [action, router]
  );

  const renderCell = useCallback(
    (contact: ContactLib, columnKey: Key) => {
      switch (columnKey) {
        case "id":
          return (
            <p className="font-bold text-tiny text-primary">{contact.id}</p>
          );
        case "title":
          return (
            <div className="flex items-center justify-center">
              <Chip
                className="capitalize"
                color={titleColorMap[contact.title]}
                size="sm"
                variant="flat"
              >
                {titleOptions.find((type) => type.uid === contact.title)?.name}
              </Chip>
            </div>
          );
        case "name":
          return (
            <p className="font-bold text-tiny text-primary">{contact.name}</p>
          );
        case "email":
          return (
            <p className="font-bold text-tiny text-primary">{contact.email}</p>
          );
        case "phone":
          return (
            <p className="font-bold text-tiny text-primary">{contact.phone}</p>
          );
        case "message":
          return (
            <p className="font-bold text-tiny text-primary">
              {contact.message}
            </p>
          );
        case "school":
          return (
            <p className="font-bold text-tiny text-primary">
              {contact.school?.name || "Không có thông tin"}
            </p>
          );
        case "isRead":
          return (
            <div className="flex items-center justify-center">
              <Chip
                className="capitalize"
                color={statusColorMap[contact.isRead.toString()]}
                size="sm"
                variant="flat"
              >
                {contact.isRead.toString().toUpperCase()}
              </Chip>
            </div>
          );
        case "createdAt":
          return (
            <p className="font-bold text-tiny capitalize text-primary">
              {format(contact.createdAt, "dd MMMM, yyyy", {
                locale: vi,
              })}
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
                  <DropdownItem
                    endContent={<Sheet className="size-4" />}
                    href={`/managements/contacts/${contact.id}`}
                  >
                    Xem thông tin chi tiết
                  </DropdownItem>
                  <DropdownItem
                    endContent={<Trash className="size-4" />}
                    color="danger"
                    onPress={() =>
                      action.onOpen(
                        () => onDelete(contact.id),
                        "Bạn có chắc chắn muốn xóa phản hồi này?",
                        "Hành động đã thực hiện sẽ không thể hủy bỏ"
                      )
                    }
                  >
                    Xóa phản hồi
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return <div></div>;
      }
    },
    [action, onDelete]
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

  const onSearchPhoneChange = useCallback((value?: string) => {
    if (value) {
      setFilterPhoneValue(value);
      setPage(1);
    } else {
      setFilterPhoneValue("");
    }
  }, []);

  const onClearName = useCallback(() => {
    setFilterNameValue("");
    setPage(1);
  }, []);

  const onClearEmail = useCallback(() => {
    setFilterEmailValue("");
    setPage(1);
  }, []);

  const onClearPhone = useCallback(() => {
    setFilterPhoneValue("");
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
            placeholder="Tìm kiếm tên người gửi..."
            startContent={<SearchIcon />}
            value={filterNameValue}
            onClear={() => onClearName()}
            onValueChange={onSearchNameChange}
          />
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Tìm kiếm email..."
            startContent={<SearchIcon />}
            value={filterEmailValue}
            onClear={() => onClearEmail()}
            onValueChange={onSearchEmailChange}
          />
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Tìm kiếm số điện thoại..."
            startContent={<SearchIcon />}
            value={filterPhoneValue}
            onClear={() => onClearPhone()}
            onValueChange={onSearchPhoneChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Tiêu đề
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={titleFilter}
                selectionMode="multiple"
                onSelectionChange={setTitleFilter}
              >
                {titleOptions.map((type) => (
                  <DropdownItem key={type.uid} className="capitalize">
                    {capitalize(type.name)}
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
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Tổng số: {contacts.length} tin tức
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
    filterEmailValue,
    filterNameValue,
    filterPhoneValue,
    titleFilter,
    statusFilter,
    visibleColumns,
    onSearchNameChange,
    onSearchEmailChange,
    onSearchPhoneChange,
    onRowsPerPageChange,
    contacts.length,
    onClearName,
    onClearEmail,
    onClearPhone,
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
      aria-label="Contacts table with custom cells, pagination and sorting"
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
      <TableBody emptyContent={"Không tìm thấy phản hồi"} items={sortedItems}>
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
