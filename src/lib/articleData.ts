import { Article } from '../components/ArticleCard';
import ItalianParliamentGap from '../components/articles/ItalianParliamentGap';
import MmsFinal from '../components/articles/mms_final';
import VittimeAnzianeFemminicidio from '../components/articles/vittime-anziane-femminicidio';
import { articlesRaw } from './articleDataRaw';

// Article data with React components added
// Base data comes from articleDataRaw.ts to avoid duplication
export const articles: Article[] = articlesRaw.map(article => {
  // Add React component content for articles that have it
  const articleWithContent: Article = { ...article };
  
  if (article.slug === 'is-italy-a-representative-democracy') {
    articleWithContent.content = ItalianParliamentGap;
  } else if (article.slug === 'mms-final') {
    articleWithContent.content = MmsFinal;
  } else if (article.slug === 'ageismo-femminicidi') {
    articleWithContent.content = VittimeAnzianeFemminicidio;
  }
  
  return articleWithContent;
});

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