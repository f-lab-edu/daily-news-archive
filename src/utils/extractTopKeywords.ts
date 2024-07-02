import { EXCEPT_WORDS } from '@/constant/ExceptWords';

interface NewsItem {
  title: string;
  [key: string]: any;
}

interface KeywordResult {
  keyword: string;
  count: number;
}

/**
 * 뉴스 제목 데이터에서 상위 키워드를 추출합니다.
 * @param data 뉴스 아이템 배열
 * @param numKeywords 추출할 키워드 수 (기본값: 5)
 * @returns 키워드 결과 배열
 */
const extractTopKeywords = (
  data: NewsItem[],
  numKeywords: number = 5
): KeywordResult[] => {
  const processedTitles = data.map(item => preprocessTitle(item.title));
  const allTitles = processedTitles.join(' ');
  const cleanTitles = cleanText(allTitles);
  const filteredWords = getFilteredWords(cleanTitles, new Set(EXCEPT_WORDS));
  const wordCounts = countWordFrequencies(filteredWords);
  return getTopKeywords(wordCounts, numKeywords);
};

export default extractTopKeywords;

/**
 * 제목에서 / 또는 - 이후의 모든 내용을 제거하고 따옴표를 제거합니다.
 * @param title 원본 제목
 * @returns 처리된 제목
 */
const preprocessTitle = (title: string): string => {
  const cleanedTitle = title.split(/[/-]/)[0].trim();
  return cleanedTitle.replace(/[""]/g, '');
};

/**
 * 문자열에서 한글, 영문자, 숫자만 남기고 나머지를 공백으로 대체합니다.
 * @param text 원본 문자열
 * @returns 처리된 문자열
 */
const cleanText = (text: string): string => {
  return text.replace(/[^가-힣a-zA-Z0-9\s/-]/g, ' ');
};

/**
 * 텍스트를 단어로 분리하고 제외 단어를 제거합니다.
 * @param text 원본 텍스트
 * @param stopWords 제외 단어 목록
 * @returns 필터링된 단어 목록
 */
const getFilteredWords = (text: string, stopWords: Set<string>): string[] => {
  return text
    .split(/\s+/)
    .filter(word => word.length > 1 && !stopWords.has(word));
};

/**
 * 단어 목록에서 각 단어의 빈도를 계산합니다.
 * @param words 단어 목록
 * @returns 단어 빈도 객체
 */
const countWordFrequencies = (words: string[]): { [key: string]: number } => {
  return words.reduce(
    (counts, word) => {
      counts[word] = (counts[word] || 0) + 1;
      return counts;
    },
    {} as { [key: string]: number }
  );
};

/**
 * 가장 많이 언급된 키워드를 추출합니다.
 * @param wordCounts 단어 빈도 객체
 * @param numKeywords 추출할 키워드 수
 * @returns 키워드 결과 배열
 */
const getTopKeywords = (
  wordCounts: { [key: string]: number },
  numKeywords: number
): KeywordResult[] => {
  return Object.entries(wordCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, numKeywords)
    .map(([keyword, count]) => ({ keyword, count }));
};
