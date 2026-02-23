// Get api key from environment variables
const NY_TIMES_API_KEY = import.meta.env.VITE_NY_TIMES_API_KEY;
const BASE_URL = 'https://api.nytimes.com/svc';


export const fetchTopStories = async () => {
  try {
    // ⚠️ SECURITY ISSUE #2: API key is exposed in the URL
    const response = await fetch(
      `${BASE_URL}/topstories/v2/home.json?api-key=${NY_TIMES_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch top stories');
    }
    
    const data = await response.json();
    
    // Format the articles for our app
    return data.results.slice(0, 12).map(article => ({
      title: article.title,
      abstract: article.abstract,
      url: article.url,
      section: article.section,
      published_date: article.published_date
    }));
  } catch (error) {
    console.error('Error fetching top stories:', error);
    throw error;
  }
};


export const searchArticles = async (query) => {
  try {
    // ⚠️ SECURITY ISSUE #3: API key is exposed in the URL
    const response = await fetch(
      `${BASE_URL}/search/v2/articlesearch.json?q=${query}&api-key=${NY_TIMES_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search articles');
    }
    
    const data = await response.json();
    
    // Format the articles for our app
    return data.response.docs.slice(0, 12).map(article => ({
      title: article.headline.main,
      abstract: article.abstract,
      url: article.web_url,
      section: article.section_name,
      published_date: article.pub_date
    }));
  } catch (error) {
    console.error('Error searching articles:', error);
    throw error;
  }
};