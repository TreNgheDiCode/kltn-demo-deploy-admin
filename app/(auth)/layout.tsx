const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center bg-background w-full h-full">
      {children}
    </div>
  );
};

export default AuthLayout;
