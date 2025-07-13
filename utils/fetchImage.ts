import { translate } from "./translate";

const UNSPLASH_ACCESS_KEY = 'JZu3idicQrKgHUD0VDAZ5RkY2eBR2U1RyVAr2GuPnYA'

export async function fetchImage(query: string): Promise<string[]> {
  
  try {
    // const searchQuery =  translate word in english
    const searchQuery = await translate(query, 'en');

    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=6&content_filter=high`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      console.error('Ошибка загрузки картинки:', response.status);
      return [];
    }

    const data = await response.json();

    return data.results.map((item: any) => item.urls.small);
  } catch (error) {
    console.error('Ошибка fetchImage:', error);
    return [];
  }
}
