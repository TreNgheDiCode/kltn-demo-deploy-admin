"use client";

import { CreateSchoolFormValues } from "@/data/form-schema";
import { PreviewSchoolInformation } from "./preview-school-information";
import { SchoolTabs } from "@/components/schools/school-tabs";
import { PreviewSchoolTabs } from "./preview-school-tabs";

type Props = {
  data?: CreateSchoolFormValues;
};

type TabItem = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const CreateSchoolPreview = ({ data }: Props) => {
  if (!data) return null;
  const tabs: TabItem[] = [
    {
      title: "Thông tin",
      value: "info",
      content: (
        <div className="w-full overflow-hidden relative h-full gap-4 rounded-2xl p-10 text-xl md:text-4xl font-bold text-main dark:text-main-foreground dark:bg-main-component shadow-md border bg-main-foreground">
          <PreviewSchoolInformation school={data} />
        </div>
      ),
    },
    {
      title: "Cơ sở",
      value: "locations",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Cơ sở</p>
        </div>
      ),
    },
    {
      title: "Ngành đào tạo",
      value: "programs",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Ngành đào tạo</p>
        </div>
      ),
    },
    {
      title: "Bộ sưu tập",
      value: "galleries",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Bộ sưu tập</p>
        </div>
      ),
    },
    {
      title: "Học bổng",
      value: "scholarships",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Học bổng</p>
        </div>
      ),
    },
  ];

  return (
    <div className="size-full [perspective:1000px] relative flex flex-col mx-auto items-start justify-star mb-16">
      <PreviewSchoolTabs tabs={tabs} />
    </div>
  );
};
