import Header from "./components/Header/Header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="txt-color relative min-h-screen">
        <Header />
        {/* <body className="container relative flex flex-col mx-auto min-h-screen"> */}
        <main className="body-content container mx-auto h-full px-4 pt-6">
          {children}
        </main>
      </body>
    </html>
  );
}
