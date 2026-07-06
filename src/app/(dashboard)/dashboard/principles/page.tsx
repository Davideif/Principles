import AddPrincipleForm from "@/components/principles/AddPrincipleForm"
import PrincipleList from "@/components/principles/PrincipleList"

export default function PrinciplesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">

    {/* Header */}
    <div>
      <div className="flex items-center gap-4 mb-3">
        <div className="h-px w-8 bg-primary/40" />
        <span className="text-xs tracking-[0.2em] uppercase text-primary font-sans">
          Your principles
        </span>
      </div>
      <h1 className="font-serif font-normal text-3xl text-foreground">
        My Principles
      </h1>
      <p className="text-sm text-muted-foreground font-sans mt-2">
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