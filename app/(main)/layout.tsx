import { ThemeProvider } from "@/components/providers/theme-provider";
import { UIProvider } from "@/components/providers/ui-provider";
import { Sidebar } from "@/components/sidebar/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      storageKey="theme"
      attribute="class"
      defaultTheme="light"
      enableSystem
    >
      <UIProvider>
        <main className="w-full flex bg-gray-200 dark:bg-background">
          <Sidebar />
          <div className="w-full">{children}</div>
        </main>
      </UIProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
