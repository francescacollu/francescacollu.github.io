import { Article } from '../components/ArticleCard';
import ItalianParliamentGap from '../components/articles/ItalianParliamentGap';
import MmsFinal from '../components/articles/mms_final';

// Mock article data
export const articles: Article[] = [
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
    language: "English"
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
    language: "English"
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
    language: "Italian"
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
    language: "English"
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
    language: "English"
  },
  {
    id: 6,
    title: "Is Italy a Representative Democracy?",
    category: "Inequalities",
    image: "/images/women_in_netflix.png", // Using an existing image for testing
    slug: "is-italy-a-representative-democracy",
    excerpt: "Italy is a republic characterized by a representative democracy, but this does not mean that everybody is represented there.",
    content: ItalianParliamentGap,
    date: "2025-03-21",
    language: "English"
  },
  {
    id: 7,
    title: "When Immigration Law Forces Women Out of Work",
    category: "Immigration",
    image: "/images/visa.JPG", 
    slug: "mms-final",
    excerpt: "In Silicon Valley, visa rules bar many spouses of skilled foreign workers from working, wasting talent and causing personal hardship.",
    content: MmsFinal,
    date: "2025-08-12",
    language: "English"
  },
];

// Get unique categories from articles
export function getUniqueCategories(): string[] {
  const categories = articles.map(article => article.category);
  return Array.from(new Set(categories)).sort();
}

// Get unique languages from articles
export function getUniqueLanguages(): string[] {
  const languages = articles.map(article => article.language).filter(Boolean) as string[];
  return Array.from(new Set(languages)).sort();
}

// Get unique platforms from articles
export function getUniquePlatforms(): string[] {
  const platforms = articles.map(article => article.platform).filter(Boolean) as string[];
  return Array.from(new Set(platforms)).sort();
}

// Function to get all articles sorted by date (newest first)
export function getAllArticles(): Article[] {
  return [...articles].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA; // Sort in descending order (newest first)
  });
}

// Function to get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
} 