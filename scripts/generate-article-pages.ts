import * as fs from 'fs';
import * as path from 'path';
import { articlesRaw } from '../src/lib/articleDataRaw';

const BASE_URL = 'https://francescacollu.github.io';
const AUTHOR_NAME = 'Francesca Collu';

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function getAbsoluteImageUrl(imagePath: string): string {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return `${BASE_URL}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
}

function generateArticleHTML(article: typeof articlesRaw[0], baseHTML: string): string {
  // Use trailing slash for consistency with GitHub Pages and React Router
  const articleUrl = `${BASE_URL}/articles/${article.slug}/`;
  const imageUrl = getAbsoluteImageUrl(article.image);
  const description = article.excerpt || `Read ${article.title} by ${AUTHOR_NAME}`;
  
  // Escape HTML entities
  const safeTitle = escapeHtml(article.title);
  const safeDescription = escapeHtml(description);
  const safeImageUrl = escapeHtml(imageUrl);
  const safeArticleUrl = escapeHtml(articleUrl);
  
  let html = baseHTML;
  
  // Replace the title tag
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${safeTitle} | ${AUTHOR_NAME}</title>`
  );
  
  // Remove existing meta tags that we'll replace
  // Remove description meta tag
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, '');
  // Remove og: meta tags
  html = html.replace(/<meta\s+property="og:[^"]*"\s+content="[^"]*"\s*\/?>/gi, '');
  // Remove twitter: meta tags
  html = html.replace(/<meta\s+name="twitter:[^"]*"\s+content="[^"]*"\s*\/?>/gi, '');
  // Remove canonical link if exists
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gi, '');
  
  // Insert new meta tags before the closing </head> tag
  const metaTags = `<meta name="title" content="${safeTitle}" />
<meta name="description" content="${safeDescription}" />
<meta name="author" content="${AUTHOR_NAME}" />
<meta property="og:type" content="article" />
<meta property="og:url" content="${safeArticleUrl}" />
<meta property="og:title" content="${safeTitle}" />
<meta property="og:description" content="${safeDescription}" />
<meta property="og:image" content="${safeImageUrl}" />
<meta property="og:site_name" content="${AUTHOR_NAME}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${safeArticleUrl}" />
<meta name="twitter:title" content="${safeTitle}" />
<meta name="twitter:description" content="${safeDescription}" />
<meta name="twitter:image" content="${safeImageUrl}" />
<meta name="twitter:creator" content="${AUTHOR_NAME}" />
<link rel="canonical" href="${safeArticleUrl}" />`;
  
  // Insert meta tags before the closing </head> tag
  html = html.replace('</head>', `${metaTags}</head>`);
  
  return html;
}

function generateArticlePages(): void {
  const buildDir = path.join(__dirname, '..', 'build');
  const indexHtmlPath = path.join(buildDir, 'index.html');
  
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: build/index.html not found. Please run "npm run build" first.');
    process.exit(1);
  }
  
  const baseHTML = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Get unique slugs (in case there are duplicates)
  const uniqueSlugs = [...new Set(articlesRaw.map(a => a.slug))];
  
  uniqueSlugs.forEach(slug => {
    const article = articlesRaw.find(a => a.slug === slug);
    if (!article) return;
    
    const articleDir = path.join(buildDir, 'articles', slug);
    const articleHtmlPath = path.join(articleDir, 'index.html');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(articleDir)) {
      fs.mkdirSync(articleDir, { recursive: true });
    }
    
    // Generate HTML with article-specific meta tags
    const articleHTML = generateArticleHTML(article, baseHTML);
    
    // Write the HTML file
    fs.writeFileSync(articleHtmlPath, articleHTML, 'utf8');
    console.log(`Generated: articles/${slug}/index.html`);
  });
  
  console.log(`\nSuccessfully generated ${uniqueSlugs.length} article pages with meta tags!`);
  console.log(`\nNext steps:`);
  console.log(`1. Verify files exist: check build/articles/[slug]/index.html`);
  console.log(`2. Deploy: npm run deploy`);
  console.log(`3. Test URLs:`);
  uniqueSlugs.forEach(slug => {
    console.log(`   - https://francescacollu.github.io/articles/${slug}/`);
  });
  console.log(`\nNote: GitHub Pages serves index.html files when URLs end with '/'.`);
  console.log(`Make sure to test URLs WITH trailing slashes in social media debuggers.`);
}

generateArticlePages();

