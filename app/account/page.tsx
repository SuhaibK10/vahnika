import type { Metadata } from "next";
import { Account } from "@/components/account/Account";

export const metadata: Metadata = {
  title: "My account",
};

export default function AccountPage() {
  return <Account />;
}
