// lib/curated-principles.ts

export interface CuratedPrinciple {
  id: string
  content: string
  source: string
  tags: string[]
  category: string
}

export const CURATED_PRINCIPLES: CuratedPrinciple[] = [
  // ── Stoicism ──────────────────────────────────────────────────────────────
  {
    id: "s1",
    content: "You have power over your mind, not outside events. Realise this and you will find strength.",
    source: "Meditations — Marcus Aurelius",
    tags: ["stoicism", "mindset"],
    category: "Stoicism",
  },
  {
    id: "s2",
    content: "The obstacle is the way. What stands in the way becomes the way.",
    source: "Meditations — Marcus Aurelius",
    tags: ["stoicism", "resilience"],
    category: "Stoicism",
  },
  {
    id: "s3",
    content: "He who fears death will never do anything worth of a man who is alive.",
    source: "Letters — Seneca",
    tags: ["stoicism", "courage"],
    category: "Stoicism",
  },
  {
    id: "s4",
    content: "We suffer more in imagination than in reality.",
    source: "Letters — Seneca",
    tags: ["stoicism", "mindset"],
    category: "Stoicism",
  },
  {
    id: "s5",
    content: "Make the best use of what is in your power and take the rest as it happens.",
    source: "Enchiridion — Epictetus",
    tags: ["stoicism", "control"],
    category: "Stoicism",
  },
  {
    id: "s6",
    content: "It is not the man who has too little who is poor, but the one who hankers after more.",
    source: "Letters — Seneca",
    tags: ["stoicism", "gratitude"],
    category: "Stoicism",
  },

  // ── Discipline & Habits ───────────────────────────────────────────────────
  {
    id: "d1",
    content: "You do not rise to the level of your goals. You fall to the level of your systems.",
    source: "Atomic Habits — James Clear",
    tags: ["habits", "discipline"],
    category: "Discipline & Habits",
  },
  {
    id: "d2",
    content: "Every action you take is a vote for the type of person you wish to become.",
    source: "Atomic Habits — James Clear",
    tags: ["habits", "identity"],
    category: "Discipline & Habits",
  },
  {
    id: "d3",
    content: "Motivation is what gets you started. Habit is what keeps you going.",
    source: "Jim Ryun",
    tags: ["habits", "discipline"],
    category: "Discipline & Habits",
  },
  {
    id: "d4",
    content: "Consistency beats intensity. Showing up every day matters more than occasional heroic efforts.",
    source: "Atomic Habits — James Clear",
    tags: ["habits", "consistency"],
    category: "Discipline & Habits",
  },
  {
    id: "d5",
    content: "The most reliable way to change who you are is to change what you do.",
    source: "Atomic Habits — James Clear",
    tags: ["habits", "identity"],
    category: "Discipline & Habits",
  },

  // ── Mindset & Growth ──────────────────────────────────────────────────────
  {
    id: "m1",
    content: "In a growth mindset, challenges are exciting rather than threatening.",
    source: "Mindset — Carol Dweck",
    tags: ["mindset", "growth"],
    category: "Mindset & Growth",
  },
  {
    id: "m2",
    content: "Hard choices, easy life. Easy choices, hard life.",
    source: "Jerzy Gregorek",
    tags: ["mindset", "discipline"],
    category: "Mindset & Growth",
  },
  {
    id: "m3",
    content: "The mind is everything. What you think you become.",
    source: "Buddha",
    tags: ["mindset", "focus"],
    category: "Mindset & Growth",
  },
  {
    id: "m4",
    content: "Do not pray for an easy life. Pray for the strength to endure a difficult one.",
    source: "Bruce Lee",
    tags: ["mindset", "resilience"],
    category: "Mindset & Growth",
  },
  {
    id: "m5",
    content: "The cave you fear to enter holds the treasure you seek.",
    source: "Joseph Campbell",
    tags: ["mindset", "courage"],
    category: "Mindset & Growth",
  },

  // ── Decision Making ───────────────────────────────────────────────────────
  {
    id: "dec1",
    content: "Never make a permanent decision based on a temporary emotion.",
    source: "Personal wisdom",
    tags: ["decisions", "emotions"],
    category: "Decision Making",
  },
  {
    id: "dec2",
    content: "If it is not a clear yes, it is a no.",
    source: "Derek Sivers",
    tags: ["decisions", "clarity"],
    category: "Decision Making",
  },
  {
    id: "dec3",
    content: "When in doubt, zoom out. Most urgent problems are not important in the long run.",
    source: "Personal wisdom",
    tags: ["decisions", "perspective"],
    category: "Decision Making",
  },
  {
    id: "dec4",
    content: "Judge a man by his questions rather than his answers.",
    source: "Voltaire",
    tags: ["decisions", "thinking"],
    category: "Decision Making",
  },

  // ── Relationships ─────────────────────────────────────────────────────────
  {
    id: "r1",
    content: "You are the average of the five people you spend the most time with.",
    source: "Jim Rohn",
    tags: ["relationships", "environment"],
    category: "Relationships",
  },
  {
    id: "r2",
    content: "Be genuinely interested in other people. Everyone has something to teach you.",
    source: "How to Win Friends — Dale Carnegie",
    tags: ["relationships", "curiosity"],
    category: "Relationships",
  },
  {
    id: "r3",
    content: "Seek first to understand, then to be understood.",
    source: "The 7 Habits — Stephen Covey",
    tags: ["relationships", "communication"],
    category: "Relationships",
  },

  // ── Entrepreneurship ──────────────────────────────────────────────────────
  {
    id: "e1",
    content: "Done is better than perfect. Ship it, then improve it.",
    source: "Reid Hoffman",
    tags: ["entrepreneurship", "execution"],
    category: "Entrepreneurship",
  },
  {
    id: "e2",
    content: "The best time to start was yesterday. The second best time is now.",
    source: "Personal wisdom",
    tags: ["entrepreneurship", "action"],
    category: "Entrepreneurship",
  },
  {
    id: "e3",
    content: "Your most unhappy customers are your greatest source of learning.",
    source: "Bill Gates",
    tags: ["entrepreneurship", "growth"],
    category: "Entrepreneurship",
  },
  {
    id: "e4",
    content: "Fall in love with the problem, not the solution.",
    source: "Uri Levine",
    tags: ["entrepreneurship", "focus"],
    category: "Entrepreneurship",
  },
]

// Get all unique categories in order
export const CURATED_CATEGORIES = Array.from(
  new Set(CURATED_PRINCIPLES.map((p) => p.category))
)