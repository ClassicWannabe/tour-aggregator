export default function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <section className="h-full bg-colorBgLayout">{children}</section>
}
