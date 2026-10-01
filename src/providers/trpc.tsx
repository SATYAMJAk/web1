import type { ReactNode } from "react";

// Mocking trpc to bypass missing dependencies for the UI preview
export const trpc = {
  contact: {
    send: {
      useMutation: (options: any) => ({
        mutate: () => {
          setTimeout(() => options?.onSuccess?.(), 1000);
        },
        isPending: false
      }),
    }
  },
  appointments: {
    book: {
      useMutation: (options: any) => ({
        mutate: () => {
          setTimeout(() => options?.onSuccess?.(), 1000);
        },
        isPending: false
      }),
    }
  }
} as any;

export function TRPCProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
