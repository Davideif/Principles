import LogForm from "@/components/logs/LogForm";

export default function Logs() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Situation Log</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Describe what is happening and your principles will guide you.
        </p>
      </div>
      <LogForm />
    </div>
  );
}