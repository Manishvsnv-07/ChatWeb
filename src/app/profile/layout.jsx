import QueryProvider from "@/Providers/QueryProvider";

export default function ProfileLayout({ children }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  )
}