import { NewsData } from '@/components/Tabs';
import formatArticleImage from '@/utils/formatArticleImage';
import axios, { AxiosResponse } from 'axios';

const newsAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEWS_API_BASE_URL
});

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getNews = async (category: string): Promise<NewsData[]> => {
  try {
    const {
      data: { articles },
      status
    }: AxiosResponse = await newsAxios.get('/', {
      params: {
        country: 'kr',
        category: category,
        pageSize: 100,
        apiKey: API_KEY
      }
    });

    if (status !== 200) {
      throw new Error('Network response was not ok');
    }

    return articles.map(formatArticleImage);
  } catch (error) {
    console.error('뉴스 조회 중 오류 발생:', error);
    return [];
  }
};
