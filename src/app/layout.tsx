import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import ReactQueryProvider from "@/context/QueryClientProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <ReactQueryProvider>
          <body>{children}</body>
        </ReactQueryProvider>
      </AuthProvider>
    </html>
  );
}
