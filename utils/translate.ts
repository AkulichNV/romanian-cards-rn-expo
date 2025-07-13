export async function translate(word: string, lang: string): Promise<string> {
  try {
    const response = await fetch('https://lt.vern.cc/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: word,
        source: 'ru',
        target: lang,
        format: 'text',
      }),
    });

    // const text = await response.text(); // читаем как текст
    // // console.log(text);

    // try {
    //   const data = JSON.parse(text); // пробуем распарсить
    //   return data.translatedText || word;
    // } catch (parseError) {
    //   console.error('Ответ не в JSON формате:\n', text);
    //   return word;
    // }

    const data = await response.json();
    return data.translatedText || word;
  } catch (error) {
    console.error(`Ошибка перевода на ${lang}:`, error);
    return word;
  }
}
