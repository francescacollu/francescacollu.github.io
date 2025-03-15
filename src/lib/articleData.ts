import { Article } from '../components/ArticleCard';

// Mock article data
export const articles: Article[] = [
  {
    id: 1,
    title: "Stories Matter",
    category: "Data Journalism",
    image: "/images/stories.png",
    slug: "stories-matter",
    excerpt: "How data journalism is changing the way we understand the world around us."
  },
  {
    id: 2,
    title: "Mineral Formations",
    category: "Visualization",
    image: "/images/minerals.png",
    slug: "mineral-formations",
    excerpt: "Exploring the beauty of mineral formations through data visualization techniques."
  },
  {
    id: 3,
    title: "European Parliament",
    category: "Politics",
    image: "/images/eu.png",
    slug: "european-parliament",
    excerpt: "An analysis of voting patterns in the European Parliament over the last decade."
  },
];

// Function to get all articles
export function getAllArticles(): Article[] {
  return articles;
}

// Function to get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
} 