import LogForm from "@/components/logs/LogForm";

export default function Logs() {    
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Situation Logs</h1>
            <p className="text-sm text-muted-foreground">
                View and manage your situation logs.
            </p>
            <LogForm />
        </div>
    );
}
