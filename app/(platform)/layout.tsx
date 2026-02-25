import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full">
      <ClerkProvider>
        <QueryProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </QueryProvider>
      </ClerkProvider>
    </section>
  );
}
