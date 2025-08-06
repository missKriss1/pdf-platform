import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";

export function SortToggle({
  onChange,
}: {
  onChange: (val: "date" | "folder") => void;
}) {
  return (
    <ToggleGroup
      type="single"
      defaultValue="date"
      onValueChange={(val) => val && onChange(val as "date" | "folder")}
    >
      <ToggleGroupItem value="date">Дата</ToggleGroupItem>
      <ToggleGroupItem value="folder">Папки</ToggleGroupItem>
    </ToggleGroup>
  );
}
