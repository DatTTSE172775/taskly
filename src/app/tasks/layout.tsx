import Header from "@/components/user/header/Header";
import Sidebar from "@/components/user/sidebar/Sidebar";
import { Providers } from "@/store/Providers";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="p-6 flex-1">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
