import AddPrincipleForm from "@/components/principles/AddPrincipleForm";
import PrincipleCard from "@/components/principles/PrincipleCard";

export default function Principles() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold mb-4">Principles</h1>
            <PrincipleCard principle={{
                id: "1",
                content: "Always write clean and maintainable code.",
                source: "Clean Code by Robert C. Martin",
                created_at: new Date().toISOString(),
                tags: ["coding", "best practices"]
            }}  />
            <AddPrincipleForm  />
        </div>    
        );
}   
        
