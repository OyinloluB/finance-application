import Button from "@/components/atoms/Button";
import SidebarItem from "@/components/atoms/SidebarItem";

export default function Home() {
  return (
    <div>
      <div className="bg-white w-full p-200 flex gap-200">
        <Button text="Placeholder" type="primary" />
        <Button text="Placeholder" type="secondary" />
        <Button text="Placeholder" type="tertiary" />
        <Button text="Placeholder" type="destroy" />
      </div>
      <div className="bg-grey-900 w-full">
        <SidebarItem icon="HouseIcon" label="Overview" active />
        <SidebarItem icon="ArrowsDownUpIcon" label="Transactions" />
        <SidebarItem icon="ChartDonutIcon" label="Budgets" />
        <SidebarItem icon="ReceiptIcon" label="Pots" />
        <SidebarItem icon="ListBulletsIcon" label="Recurring bills" />
      </div>
    </div>
  );
}
