import {
  IconBrandOpenai,
  IconBrandTabler,
  IconInfoOctagon,
  IconListDetails,
  IconNews,
  IconNewSection,
  IconSchool,
  IconUserBolt,
  IconUserPlus,
  IconUsersGroup,
} from "@tabler/icons-react";

export type NavItemProps = {
  label: string;
  href?: string;
  icon: React.ReactNode | React.JSX.Element;
  children?: {
    label: string;
    href: string;
    icon: React.ReactNode | React.JSX.Element;
  }[];
};

export const navItems: NavItemProps[] = [
  {
    label: "Bảng điều khiển",
    href: "/",
    icon: (
      <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Quản lý tài khoản",
    icon: (
      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    children: [
      {
        label: "Danh sách tài khoản",
        href: "/accounts",
        icon: (
          <IconUsersGroup className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: "Thêm tài khoản",
        href: "/accounts/create",
        icon: (
          <IconUserPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
    ],
  },
  {
    label: "Trường học",
    icon: (
      <IconSchool className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    children: [
      {
        label: "Danh sách trường học",
        href: "/schools",
        icon: (
          <IconUsersGroup className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: "Thêm trường học",
        href: "/schools/create",
        icon: (
          <IconUserPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
    ],
  },
  {
    label: "Tin tức",
    icon: (
      <IconNews className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    children: [
      {
        label: "Danh sách tin tức",
        href: "/news",
        icon: (
          <IconListDetails className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: "Thêm tin tức",
        href: "/news/create",
        icon: (
          <IconNewSection className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
    ],
  },
  {
    label: "Hỗ trợ",
    href: "/support",
    icon: (
      <IconInfoOctagon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Chat Bot",
    href: "/chatbot",
    icon: (
      <IconBrandOpenai className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];
