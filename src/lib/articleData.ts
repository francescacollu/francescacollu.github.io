import { Article } from '../components/ArticleCard';

// Mock article data
export const articles: Article[] = [
  {
    id: 1,
    title: "Women Presence in Netflix",
    category: "Gender Equality",
    image: "/images/women_in_netflix.png",
    slug: "gender-equality",
    excerpt: "How data journalism is changing the way we understand the world around us.",
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
    excerpt: "Exploring the beauty of mineral formations through data visualization techniques.",
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
    excerpt: "An analysis of voting patterns in the European Parliament over the last decade.",
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
    excerpt: "An analysis of voting patterns in the European Parliament over the last decade.",
    url: "https://medium.com/@colluf6/gender-in-the-spotlight-the-voices-i-hear-on-italian-television-talk-shows-0a0106d2a963",
    platform: "Medium",
    date: "2024-07-25",
    language: "English"
  },
  
  // Add new articles below this line
  // Example format:
  // {
  //   id: 4,
  //   title: "Your New Article Title",
  //   category: "Category",
  //   image: "/images/your-image.png",
  //   slug: "your-article-slug",
  //   excerpt: "Brief description of your article.",
  //   url: "https://link-to-your-article.com",
  //   platform: "Platform Name",
  //   date: "YYYY-MM-DD",
  //   language: "English" // or "Italian" or other languages
  // },
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