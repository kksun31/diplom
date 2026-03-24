import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";

const clerkRuLocalization = {
  ...ruRU,
  signUp: {
    ...ruRU.signUp,
    start: {
      ...ruRU.signUp?.start,
      subtitle:
        'чтобы продолжить работу в сервисе Фокус',
    },
  },
  createOrganization: {
    ...ruRU.createOrganization,
    title: "Настройте вашу организацию",
    subtitle: "Введите данные организации, чтобы продолжить",
    formTitle: "Настройте вашу организацию",
    formSubtitle: "Введите данные организации, чтобы продолжить",
  },
  taskChooseOrganization: {
    ...ruRU.taskChooseOrganization,
    createOrganization: {
      ...ruRU.taskChooseOrganization?.createOrganization,
      title: "Настройте вашу организацию",
      subtitle: "Введите данные организации, чтобы продолжить",
      formFieldLabel__name: "Название",
      formFieldInputPlaceholder__name: "Моя организация",
      formButtonSubmit: "Продолжить",
      formButtonReset: "Отмена",
    },
  },
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full">
      <ClerkProvider localization={clerkRuLocalization}>
        <QueryProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </QueryProvider>
      </ClerkProvider>
    </section>
  );
}
