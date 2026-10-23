import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";

export const metadata: Metadata = {
  title: "Order confirmed",
};

export default function OrderConfirmedPage() {
  return <OrderConfirmation />;
}
