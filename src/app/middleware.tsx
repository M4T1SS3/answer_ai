"use client";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

interface IProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

const Providers = ({ session, children }: IProvidersProps) => {
  return (
        <SessionProvider session={session}>{children}</SessionProvider>
  );
};

export default Providers;