

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className=" bg-gray-50 p-0 m-0">
      {children}
    </div>
    </>
  );
}