// lib/philosophers.ts

export interface PhilosopherPrinciple {
  id: string
  content: string
  tags: string[]
}

export interface Philosopher {
  id: string
  name: string
  era: string
  tradition: string
  tagline: string
  emoji: string
  principles: PhilosopherPrinciple[]
}

export const PHILOSOPHERS: Philosopher[] = [
  // ── Marcus Aurelius ───────────────────────────────────────────────────────
  {
    id: "marcus-aurelius",
    name: "Marcus Aurelius",
    era: "121–180 AD",
    tradition: "Stoicism",
    tagline: "Roman Emperor. Stoic philosopher. Led with reason, not power.",
    emoji: "⚖️",
    principles: [
      {
        id: "ma-1",
        content: "You have power over your mind, not outside events. Realise this and you will find strength.",
        tags: ["mindset", "control", "stoicism"],
      },
      {
        id: "ma-2",
        content: "The obstacle in the path becomes the path. What blocks you is also what advances you.",
        tags: ["resilience", "stoicism", "adversity"],
      },
      {
        id: "ma-3",
        content: "Do not indulge in dreams of what you do not have. Count what you have and be grateful.",
        tags: ["gratitude", "stoicism", "contentment"],
      },
      {
        id: "ma-4",
        content: "Waste no more time arguing about what a good person should be. Be one.",
        tags: ["action", "character", "stoicism"],
      },
      {
        id: "ma-5",
        content: "The best revenge is to be unlike the person who hurt you.",
        tags: ["character", "stoicism", "relationships"],
      },
      {
        id: "ma-6",
        content: "When you wake up in the morning, think about the privilege of being alive — to breathe, to think, to enjoy, to love.",
        tags: ["gratitude", "stoicism", "mindset"],
      },
      {
        id: "ma-7",
        content: "If it is not right, do not do it. If it is not true, do not say it.",
        tags: ["integrity", "stoicism", "character"],
      },
    ],
  },

  // ── Epictetus ─────────────────────────────────────────────────────────────
  {
    id: "epictetus",
    name: "Epictetus",
    era: "50–135 AD",
    tradition: "Stoicism",
    tagline: "Born a slave. Became one of the most powerful minds of the ancient world.",
    emoji: "🔓",
    principles: [
      {
        id: "ep-1",
        content: "Make the best use of what is in your power and take the rest as it happens.",
        tags: ["control", "stoicism", "acceptance"],
      },
      {
        id: "ep-2",
        content: "Seek not that the things which happen should happen as you wish. Wish the things which happen to be as they are.",
        tags: ["acceptance", "stoicism", "peace"],
      },
      {
        id: "ep-3",
        content: "No man is free who is not master of himself.",
        tags: ["discipline", "stoicism", "freedom"],
      },
      {
        id: "ep-4",
        content: "First say to yourself what you would be, then do what you have to do.",
        tags: ["identity", "action", "stoicism"],
      },
      {
        id: "ep-5",
        content: "It is not what happens to you, but how you react to it that matters.",
        tags: ["mindset", "stoicism", "resilience"],
      },
      {
        id: "ep-6",
        content: "He is a wise man who does not grieve for the things which he has not, but rejoices for those which he has.",
        tags: ["gratitude", "stoicism", "contentment"],
      },
    ],
  },

  // ── Miyamoto Musashi ──────────────────────────────────────────────────────
  {
    id: "miyamoto-musashi",
    name: "Miyamoto Musashi",
    era: "1584–1645",
    tradition: "Bushido / Mastery",
    tagline: "Undefeated samurai. Master strategist. Student of the way.",
    emoji: "⚔️",
    principles: [
      {
        id: "mm-1",
        content: "Do nothing that is of no use. Every action should have a purpose.",
        tags: ["discipline", "focus", "mastery"],
      },
      {
        id: "mm-2",
        content: "Think lightly of yourself and deeply of the world.",
        tags: ["humility", "perspective", "mastery"],
      },
      {
        id: "mm-3",
        content: "Accept everything just the way it is. Do not seek pleasure for its own sake.",
        tags: ["acceptance", "discipline", "mastery"],
      },
      {
        id: "mm-4",
        content: "In battle, if you make your opponent flinch, you have already won. Apply this to all things.",
        tags: ["strategy", "mastery", "mindset"],
      },
      {
        id: "mm-5",
        content: "Study strategy over the years and achieve the spirit of the warrior. Today is victory over yourself of yesterday.",
        tags: ["growth", "mastery", "discipline"],
      },
      {
        id: "mm-6",
        content: "You must understand that there is more than one path to the top of the mountain.",
        tags: ["perspective", "mastery", "open-mindedness"],
      },
      {
        id: "mm-7",
        content: "Respect Buddha and the gods without counting on their help.",
        tags: ["self-reliance", "mastery", "discipline"],
      },
    ],
  },

  // ── Confucius ─────────────────────────────────────────────────────────────
  {
    id: "confucius",
    name: "Confucius",
    era: "551–479 BC",
    tradition: "Confucianism",
    tagline: "Teacher. Philosopher. Architect of East Asian moral thought.",
    emoji: "📜",
    principles: [
      {
        id: "co-1",
        content: "It does not matter how slowly you go as long as you do not stop.",
        tags: ["persistence", "discipline", "growth"],
      },
      {
        id: "co-2",
        content: "Before you embark on a journey of revenge, dig two graves.",
        tags: ["decisions", "emotions", "relationships"],
      },
      {
        id: "co-3",
        content: "The man who asks a question is a fool for a minute. The man who does not ask is a fool for life.",
        tags: ["curiosity", "learning", "humility"],
      },
      {
        id: "co-4",
        content: "Choose a job you love and you will never have to work a day in your life.",
        tags: ["work", "purpose", "fulfilment"],
      },
      {
        id: "co-5",
        content: "When you know a thing, hold that you know it. When you do not know a thing, allow that you do not know it.",
        tags: ["honesty", "learning", "humility"],
      },
      {
        id: "co-6",
        content: "The strength of a nation derives from the integrity of the home.",
        tags: ["relationships", "integrity", "character"],
      },
    ],
  },

  // ── Laozi ─────────────────────────────────────────────────────────────────
  {
    id: "laozi",
    name: "Laozi",
    era: "6th century BC",
    tradition: "Taoism",
    tagline: "Founder of Taoism. Author of the Tao Te Ching. Master of simplicity.",
    emoji: "☯️",
    principles: [
      {
        id: "lz-1",
        content: "Nature does not hurry, yet everything is accomplished. Trust the process.",
        tags: ["patience", "taoism", "trust"],
      },
      {
        id: "lz-2",
        content: "Knowing others is intelligence. Knowing yourself is true wisdom. Mastering others is strength. Mastering yourself is true power.",
        tags: ["self-awareness", "taoism", "wisdom"],
      },
      {
        id: "lz-3",
        content: "When you realise there is nothing lacking, the whole world belongs to you.",
        tags: ["contentment", "taoism", "gratitude"],
      },
      {
        id: "lz-4",
        content: "A journey of a thousand miles begins with a single step.",
        tags: ["action", "taoism", "persistence"],
      },
      {
        id: "lz-5",
        content: "The key to growth is to introduce higher dimensions of consciousness into our awareness.",
        tags: ["growth", "taoism", "mindset"],
      },
      {
        id: "lz-6",
        content: "He who talks more is sooner exhausted. Better to keep silent and remain centred.",
        tags: ["silence", "taoism", "discipline"],
      },
    ],
  },

  // ── Viktor Frankl ─────────────────────────────────────────────────────────
  {
    id: "viktor-frankl",
    name: "Viktor Frankl",
    era: "1905–1997",
    tradition: "Existentialism / Logotherapy",
    tagline: "Holocaust survivor. Psychiatrist. Found meaning in the darkest of places.",
    emoji: "🕯️",
    principles: [
      {
        id: "vf-1",
        content: "Between stimulus and response there is a space. In that space is our power to choose our response.",
        tags: ["mindset", "choice", "resilience"],
      },
      {
        id: "vf-2",
        content: "Those who have a why to live can bear almost any how.",
        tags: ["purpose", "resilience", "meaning"],
      },
      {
        id: "vf-3",
        content: "When we are no longer able to change a situation, we are challenged to change ourselves.",
        tags: ["resilience", "growth", "acceptance"],
      },
      {
        id: "vf-4",
        content: "Everything can be taken from a person but one thing — the last of human freedoms — the choice of attitude in any given set of circumstances.",
        tags: ["freedom", "mindset", "resilience"],
      },
      {
        id: "vf-5",
        content: "Do not aim at success. The more you aim at it and make it a target, the more you are going to miss it.",
        tags: ["purpose", "meaning", "work"],
      },
      {
        id: "vf-6",
        content: "Suffering ceases to be suffering the moment it finds a meaning.",
        tags: ["meaning", "resilience", "perspective"],
      },
    ],
  },

  // ── Buddha ────────────────────────────────────────────────────────────────
  {
    id: "buddha",
    name: "Buddha",
    era: "563–483 BC",
    tradition: "Buddhism",
    tagline: "The awakened one. Teacher of the middle path and the end of suffering.",
    emoji: "🪷",
    principles: [
      {
        id: "bu-1",
        content: "The mind is everything. What you think, you become.",
        tags: ["mindset", "buddhism", "thought"],
      },
      {
        id: "bu-2",
        content: "Three things cannot be long hidden: the sun, the moon, and the truth.",
        tags: ["truth", "buddhism", "integrity"],
      },
      {
        id: "bu-3",
        content: "Do not dwell in the past, do not dream of the future. Concentrate the mind on the present moment.",
        tags: ["presence", "buddhism", "mindset"],
      },
      {
        id: "bu-4",
        content: "Peace comes from within. Do not seek it without.",
        tags: ["peace", "buddhism", "self-awareness"],
      },
      {
        id: "bu-5",
        content: "You will not be punished for your anger. You will be punished by your anger.",
        tags: ["emotions", "buddhism", "mindset"],
      },
      {
        id: "bu-6",
        content: "In the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go.",
        tags: ["love", "buddhism", "perspective"],
      },
    ],
  },

  // ── Bruce Lee ─────────────────────────────────────────────────────────────
  {
    id: "bruce-lee",
    name: "Bruce Lee",
    era: "1940–1973",
    tradition: "Jeet Kune Do / Philosophy",
    tagline: "Martial artist. Philosopher. Pioneer of personal expression and adaptability.",
    emoji: "🌊",
    principles: [
      {
        id: "bl-1",
        content: "Be like water. Water shapes itself to whatever container it is poured into. Adapt and flow.",
        tags: ["adaptability", "mindset", "philosophy"],
      },
      {
        id: "bl-2",
        content: "Absorb what is useful, discard what is not, add what is uniquely your own.",
        tags: ["learning", "growth", "philosophy"],
      },
      {
        id: "bl-3",
        content: "A goal is not always meant to be reached. It often serves simply as something to aim at.",
        tags: ["goals", "purpose", "philosophy"],
      },
      {
        id: "bl-4",
        content: "Knowing is not enough. We must apply. Willing is not enough. We must do.",
        tags: ["action", "discipline", "philosophy"],
      },
      {
        id: "bl-5",
        content: "The key to immortality is first living a life worth remembering.",
        tags: ["purpose", "legacy", "philosophy"],
      },
      {
        id: "bl-6",
        content: "If you spend too much time thinking about a thing, you will never get it done.",
        tags: ["action", "discipline", "focus"],
      },
    ],
  },

  // ── Seneca ────────────────────────────────────────────────────────────────
  {
    id: "seneca",
    name: "Seneca",
    era: "4 BC–65 AD",
    tradition: "Stoicism",
    tagline: "Roman statesman. Playwright. Wrote the most practical letters on how to live.",
    emoji: "✉️",
    principles: [
      {
        id: "se-1",
        content: "We suffer more in imagination than in reality. Most of what you fear will never happen.",
        tags: ["anxiety", "stoicism", "mindset"],
      },
      {
        id: "se-2",
        content: "Luck is what happens when preparation meets opportunity.",
        tags: ["discipline", "stoicism", "preparation"],
      },
      {
        id: "se-3",
        content: "It is not that I am brave. It is just that I am busy.",
        tags: ["action", "stoicism", "focus"],
      },
      {
        id: "se-4",
        content: "Begin at once to live and count each separate day as a separate life.",
        tags: ["presence", "stoicism", "time"],
      },
      {
        id: "se-5",
        content: "Treat a friend as a person who may one day become an enemy. Treat an enemy as one who may one day become a friend.",
        tags: ["relationships", "stoicism", "wisdom"],
      },
      {
        id: "se-6",
        content: "Retire into yourself as much as possible. Associate with people who are likely to improve you.",
        tags: ["relationships", "stoicism", "growth"],
      },
    ],
  },

  // ── Sun Tzu ───────────────────────────────────────────────────────────────
  {
    id: "sun-tzu",
    name: "Sun Tzu",
    era: "544–496 BC",
    tradition: "Strategy / Philosophy",
    tagline: "General. Strategist. Author of The Art of War — still studied by leaders worldwide.",
    emoji: "🗺️",
    principles: [
      {
        id: "st-1",
        content: "Know yourself and know your enemy and you will not be defeated in a hundred battles.",
        tags: ["strategy", "self-awareness", "wisdom"],
      },
      {
        id: "st-2",
        content: "Supreme excellence consists in breaking the enemy's resistance without fighting.",
        tags: ["strategy", "wisdom", "conflict"],
      },
      {
        id: "st-3",
        content: "In the midst of chaos, there is also opportunity.",
        tags: ["strategy", "mindset", "resilience"],
      },
      {
        id: "st-4",
        content: "Move swift as the wind and closely formed as the wood. Attack like the fire and be still as the mountain.",
        tags: ["strategy", "discipline", "focus"],
      },
      {
        id: "st-5",
        content: "The greatest victory is that which requires no battle. Choose your fights wisely.",
        tags: ["strategy", "wisdom", "decisions"],
      },
      {
        id: "st-6",
        content: "Opportunities multiply as they are seized.",
        tags: ["action", "strategy", "growth"],
      },
    ],
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

// Get all traditions for filtering
export const TRADITIONS = Array.from(
  new Set(PHILOSOPHERS.map((p) => p.tradition))
)

// Get a philosopher by id
export function getPhilosopher(id: string): Philosopher | undefined {
  return PHILOSOPHERS.find((p) => p.id === id)
}

// Get all principles from a list of philosopher ids
export function getPrinciplesForPhilosophers(
  philosopherIds: string[]
): { principle: PhilosopherPrinciple; philosopher: Philosopher }[] {
  return PHILOSOPHERS.filter((p) => philosopherIds.includes(p.id)).flatMap(
    (philosopher) =>
      philosopher.principles.map((principle) => ({ principle, philosopher }))
  )
}