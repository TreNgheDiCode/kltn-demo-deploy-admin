"use client";

interface InformationHolderProps {
  label: string;
  data?: string | null;
}

export const InformationHolder = ({
  label,
  data,
}: Readonly<InformationHolderProps>) => {
  return (
    <p className="text-sm">
      <strong>{label}: </strong>
      {data ? data : "Không có thông tin"}
    </p>
  );
};
