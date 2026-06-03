import AddPrincipleForm from "@/components/principles/AddPrincipleForm"
import PrincipleList from "@/components/principles/PrincipleList"

export default function PrinciplesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">My Principles</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Lessons you have collected from books, podcasts, and life.
        </p>
      </div>

      {/* Add principle form */}
      <AddPrincipleForm />

      {/* Principles list */}
      <PrincipleList />

    </div>
  )
}