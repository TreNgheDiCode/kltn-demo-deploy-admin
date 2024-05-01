"use client";

import { NewsLib } from "@/types/type";
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
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import {
  ChevronDownIcon,
  MoreVertical,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { ChangeEvent, Key, useCallback, useMemo, useState } from "react";

interface NewsProps {
  news: NewsLib[];
}

const typeColorMap: Record<string, ChipProps["color"]> = {
  ANNOUNCEMENT: "default",
  EVENT: "warning",
  BLOG: "success",
};

const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "default",
};

const columns = [
  { name: "Id", uid: "id", sortable: true },
  { name: "Tiêu đề", uid: "title", sortable: true },
  { name: "Loại tin tức", uid: "type", sortable: true },
  { name: "Trạng thái", uid: "isPublished", sortable: true },
  { name: "Trường học", uid: "schoolName", sortable: true },
  { name: "Ngày tạo", uid: "createdAt", sortable: true },
  { name: "Ngày cập nhật", uid: "updatedAt", sortable: true },
  { name: "Ảnh đại diện", uid: "cover" },
  { name: "Hành động", uid: "actions" },
];

const typeOptions = [
  { name: "THÔNG BÁO", uid: "ANNOUNCEMENT" },
  { name: "SỰ KIỆN", uid: "EVENT" },
  { name: "BÀI ĐĂNG", uid: "BLOG" },
];

const statusOptions = [
  { name: "HIỂN THỊ", uid: "true" },
  { name: "TẠM ẨN", uid: "false" },
];

const INITIAL_COLUMNS = [
  "title",
  "type",
  "isPublished",
  "schoolName",
  "createdAt",
  "actions",
];

export const NewsTable = ({ news }: NewsProps) => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_COLUMNS)
  );
  const [typeFilter, setTypeFilter] = useState<Selection>("all");
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredNews = [...news];

    if (hasSearchFilter) {
      filteredNews = filteredNews.filter((news) =>
        news.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      typeFilter !== "all" &&
      Array.from(typeFilter).length !== typeOptions.length
    ) {
      filteredNews = filteredNews.filter((news) =>
        Array.from(typeFilter).includes(news.type)
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredNews = filteredNews.filter((news) =>
        Array.from(statusFilter).includes(news.isPublished.toString())
      );
    }

    return filteredNews;
  }, [news, filterValue, typeFilter, statusFilter, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: NewsLib, b: NewsLib) => {
      const first = a[
        sortDescriptor.column as keyof NewsLib
      ] as unknown as number;
      const second = b[
        sortDescriptor.column as keyof NewsLib
      ] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((news: NewsLib, columnKey: Key) => {
    switch (columnKey) {
      case "id":
        return <p className="font-bold text-tiny text-primary">{news.id}</p>;
      case "title":
        return <p className="font-bold text-tiny text-primary">{news.title}</p>;
      case "type":
        return (
          <div className="flex items-center justify-center">
            <Chip
              className="capitalize"
              color={typeColorMap[news.type]}
              size="sm"
              variant="flat"
            >
              {news.type}
            </Chip>
          </div>
        );
      case "isPublished":
        return (
          <div className="flex items-center justify-center">
            <Chip
              className="capitalize"
              color={statusColorMap[news.isPublished.toString()]}
              size="sm"
              variant="flat"
            >
              {news.isPublished.toString().toUpperCase()}
            </Chip>
          </div>
        );
      case "schoolName":
        return (
          <p className="font-bold text-tiny text-primary">
            {news.school?.name || "Không có thông tin"}
          </p>
        );
      case "createdAt":
        return (
          <p className="font-bold text-tiny capitalize text-primary">
            {format(news.createdAt, "dd MMMM, yyyy", {
              locale: vi,
            })}
          </p>
        );
      case "updatedAt":
        return (
          <p className="font-bold text-tiny capitalize text-primary">
            {format(news.updatedAt, "dd MMMM, yyyy", {
              locale: vi,
            })}
          </p>
        );
      case "cover":
        return (
          <p className="font-bold text-tiny capitalize text-primary">
            {news.cover}
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
                <DropdownItem href={`/managements/news/${news.id}`}>
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
            placeholder="Tìm kiếm theo tiêu đề..."
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
                  Loại tin tức
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={typeFilter}
                selectionMode="multiple"
                onSelectionChange={setTypeFilter}
              >
                {typeOptions.map((type) => (
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
            <Button
              as={Link}
              href="/managements/news/create"
              color="primary"
              endContent={<PlusIcon />}
            >
              Thêm tin tức
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Tổng số: {news.length} tin tức
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
    typeFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    news.length,
    onClear,
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

  return (
    <Table
      aria-label="News table with custom cells, pagination and sorting"
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
