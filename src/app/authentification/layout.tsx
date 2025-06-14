
export default function Layout({
 children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={"hero-gradient p-5 min-h-screen m-0 flex flex-col justify-start items-center"}>
        <h1 className={"items-center text-center font-bold text-[32px] my-5 "}>
          <span className={" bg-linear-to-r from-brand-purple to-brand-coral bg-clip-text text-transparent"}>Winali</span>
        </h1>
        {children}
      </div>
    </>
  )
}