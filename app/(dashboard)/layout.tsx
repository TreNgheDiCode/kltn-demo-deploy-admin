type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <main className="size-full">{children}</main>
    </>
  );
};

export default DashboardLayout;
