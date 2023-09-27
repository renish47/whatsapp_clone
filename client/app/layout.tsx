import "./globals.css";
import ToasterProvider from "@/provider/ToasterProvider";
import StoreProvider from "@/provider/StoreProvider";
import AuthProvider from "@/provider/AuthProvider";

export const metadata = {
  title: "WhatsApp Clone",
  description: "This is the clone version of Whatsapp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" cursor-default">
        <StoreProvider>
          <div id="photoPickerElement"></div>
          <ToasterProvider />
          <AuthProvider>{children}</AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
