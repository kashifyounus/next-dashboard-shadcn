import CardsPage from "@/components/cards/CardsPage";
import { DemoCreateAccount } from "@/components/cards/components/create-account";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="">
      <div
        className={cn(
          "flex items-center justify-center [&>div]:w-full",
        )}
      >
        <DemoCreateAccount />
      </div>
    </div>
  );
}
