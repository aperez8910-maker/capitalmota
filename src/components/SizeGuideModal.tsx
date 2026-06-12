import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const rows: { size: string; chest: string; length: string }[] = [
  { size: "S",   chest: "20\"", length: "28\"" },
  { size: "M",   chest: "22\"", length: "29\"" },
  { size: "L",   chest: "24\"", length: "30\"" },
  { size: "XL",  chest: "26\"", length: "31\"" },
  { size: "2XL", chest: "28\"", length: "32\"" },
  { size: "3XL", chest: "30\"", length: "33\"" },
];

const SizeGuideModal = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display tracking-wider text-xl">
            SIZE GUIDE
          </DialogTitle>
        </DialogHeader>
        <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">
          Pro Club heavyweight — boxy / oversized fit. Measurements in inches,
          garment laid flat.
        </p>
        <div className="border border-border rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="font-display tracking-wider text-xs">
                <th className="px-3 py-2 text-left">SIZE</th>
                <th className="px-3 py-2 text-left">CHEST</th>
                <th className="px-3 py-2 text-left">LENGTH</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.size} className="border-t border-border/60">
                  <td className="px-3 py-2 font-display tracking-wider">
                    {r.size}
                  </td>
                  <td className="px-3 py-2 font-body">{r.chest}</td>
                  <td className="px-3 py-2 font-body">{r.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-body text-xs text-muted-foreground">
          Between sizes? Size down for a classic fit, true-to-size for the
          boxy drape we build for.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideModal;