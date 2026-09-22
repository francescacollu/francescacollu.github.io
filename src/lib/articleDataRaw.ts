// Raw article data without React component imports
// This file is used by both articleData.ts and the build script

export interface ArticleRaw {
  id: number;
  title: string;
  category: string;
  image: string;
  slug: string;
  excerpt: string;
  url?: string;
  platform?: string;
  date?: string;
  language?: string;
  peculiarities?: string;
}

export const articlesRaw: ArticleRaw[] = [
  {
    id: 1,
    title: "Women Presence in Netflix",
    category: "Gender Equality",
    image: "/images/women_in_netflix.png",
    slug: "gender-equality",
    excerpt: "Analyzing gender representation in Netflix's movies and shows: progress, pitfalls, and persistent imbalances.",
    url: "https://medium.com/@colluf6/women-presence-in-netflix-f06eeb73bede",
    platform: "Medium",
    date: "2022-05-9",
    language: "English",
    peculiarities: "First-name gender inference"
  },
  {
    id: 2,
    title: "Italian Politics in 4-Years-Tweets",
    category: "Italian Politics",
    image: "/images/tweets_ita_politics.png",
    slug: "italian-politics",
    excerpt: "An analysis of six Italian leaders' Twitter activity (2018–2022), highlighting engagement, rhetoric, and themes.",
    url: "https://medium.com/@colluf6/italian-politics-in-4-years-tweets-a1131de823ac",
    platform: "Medium",
    date: "2022-09-11",
    language: "English",
    peculiarities: "Twitter corpus (2018–2022), NLP (lemmatization, TTR)"
  },
  {
    id: 3,
    title: "Le voci che ascolto in TV",
    category: "Media",
    image: "/images/talk_shows_guests.png",
    slug: "media",
    excerpt: "Un'analisi della rappresentazione di genere tra gli ospiti di quattro talk show di La7 (2023-2024).",
    url: "https://medium.com/@colluf6/le-voci-che-ascolto-in-tv-a88d683786ff",
    platform: "Medium",
    date: "2024-07-21",
    language: "Italian",
    peculiarities: "Web scraping (La7 RivediLa7), first-name gender inference"
  },
  {
    id: 4,
    title: "Gender in the Spotlight: The Voices I Hear on Italian Television",
    category: "Media",
    image: "/images/talk_shows_guests.png",
    slug: "media",
    excerpt: "An analysis of gender representation among guests on four La7 political TV shows (2023–2024).",
    url: "https://medium.com/@colluf6/gender-in-the-spotlight-the-voices-i-hear-on-italian-television-talk-shows-0a0106d2a963",
    platform: "Medium",
    date: "2024-07-25",
    language: "English",
    peculiarities: "Web scraping (La7 RivediLa7), first-name gender inference"
  },
  {
    id: 5,
    title: "The Last 25 Years of Dog Fatalities",
    category: "Animals",
    image: "/images/dog_fatalities.png",
    slug: "animals",
    excerpt: "Data-driven insights into global dog-related fatalities and their causes over the past 25 years.",
    url: "https://medium.com/@colluf6/the-last-25-years-of-dog-fatalities-0041ca445f38",
    platform: "Medium",
    date: "2024-08-08",
    language: "English",
    peculiarities: "Wikipedia list extraction"
  },
  {
    id: 6,
    title: "Is Italy a Representative Democracy?",
    category: "Inequalities",
    image: "/images/camera_dei_deputati.jpg",
    slug: "is-italy-a-representative-democracy",
    excerpt: "Italy is a republic founded on representative democracy, yet this does not guarantee that all citizens are truly represented.",
    date: "2025-03-21",
    language: "English",
    peculiarities: "Scrollytelling, custom parliament & map visuals"
  },
  {
    id: 7,
    title: "When Immigration Law Forces Women Out of Work",
    category: "Immigration",
    image: "/images/visa.JPG",
    slug: "mms-final",
    excerpt: "In Silicon Valley, visa rules bar many spouses of skilled foreign workers from working, wasting talent and causing personal hardship.",
    date: "2025-08-12",
    language: "English",
    peculiarities: "Scrollytelling, video interview production (editing and audio mixing)"
  },
  {
    id: 8,
    title: "Una vittima di femminicidio su tre ha più di 65 anni. Ma i giornali non la raccontano",
    category: "Gender Inequalities",
    image: "/images/femminicidi-italia-vittime-anziane.jpg",
    slug: "ageismo-femminicidi",
    excerpt: "Un terzo delle vittime di femminicidio è una donna anziana, ma non trova uno spazio proporzionato sui giornali nazionali.",
    date: "2025-11-19",
    language: "Italian",
    peculiarities: "NUDM victim database, web scraping (Repubblica/Corriere)"
  },
  {
    id: 9,
    title: "For Silicon Valley Students, the Grass Is Greener on the Wealthier Side",
    category: "Education",
    image: "/images/articles/greenery-sv-schools/greenery-in-sv-schools-thumbnail.png",
    slug: "greenery-in-silicon-valley-schools",
    excerpt: "In Silicon Valley, schools serving more low-income students tend to have less greenery, reflecting a subtle everyday divide.",
    date: "2026-03-27",
    language: "English",
    peculiarities: "NDVI analysis (Google Earth Engine), CDE data, NLCD tree canopy"
  },
  {
    id: 10,
    title: "Summer in Europe: Hotter Than Yesterday, Colder Than Tomorrow",
    category: "Climate Change",
    image: "/images/articles/summer-in-europe/summer-in-europe.png",
    slug: "summer-in-europe-hotter-than-yesterday-colder-than-tomorrow",
    excerpt: "Europe is warming twice as fast as the global average and this summer. Two record-breaking heatwaves in two months have pushed temperatures above seasonal norms and driven heat-related deaths into the thousands. This is the output of several converging physical processes, but with each passing summer, the window for a cooler tomorrow grows narrower.",
    url: "https://www.fairobserver.com/more/environment/summer-in-europe-hotter-than-yesterday-colder-than-tomorrow/",
    platform: "Fair Observer",
    date: "2026-07-29",
    language: "English",
    peculiarities: ""
  },
  {
    id: 11,
    title: "Ceci N’Est Pas Une Amie, But Loneliness Is Real",
    category: "Technology",
    image: "/images/articles/ceci-nest-pas-une-amie/ceci-nest-pas-une-amie.png",
    slug: "ceci-nest-pas-une-amie",
    excerpt: "Despite promises that technology would bring people closer together, many retreat into the digital world the moment they pick up their smartphones. In the age of AI, human connection can become even more distant as people increasingly turn to AI companions for companionship and conversation. Yet the alternative may not be deeper relationships with other people, but no connection at all.",
    url: "https://www.fairobserver.com/world-news/ceci-nest-pas-une-amie-but-loneliness-is-real/",
    platform: "Fair Observer",
    date: "2026-08-26",
    language: "English",
    peculiarities: ""
  },
  {
    id: 12,
    title: "In Trump’s Casino, the House Always Wins",
    category: "Politics",
    image: "/images/articles/trump-graft/trump-graft.png",
    slug: "trump-graft",
    excerpt: "During the first year of his second presidency, Donald Trump’s income has more than tripled. Whether that reflects profit from his institutional role or simple coincidence almost doesn’t matter. As both player and referee, he holds the power to shape the market his personal fortune depends on. That overlap raises a question about whether it is appropriate for him to keep controlling his personal business, but most of all, whether laws meant to prevent presidential conflicts of interest are adequate at all.",
    url: "https://www.fairobserver.com/united-states/in-trumps-casino-the-house-always-wins/",
    platform: "Fair Observer",
    date: "2026-09-16",
    language: "English",
    peculiarities: ""
  },
];

