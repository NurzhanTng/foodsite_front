import { Highlight } from "../fetch/suggestAddress.ts";

const renderHighlightedText = (text: string, highlights?: Highlight[]) => {
  if (!highlights || highlights.length === 0) {
    return text; // Если подсветки нет, возвращаем текст как есть
  }

  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;

  highlights.forEach((hl, index) => {
    // Добавляем обычную часть текста до подсветки
    if (hl.begin > lastIndex) {
      parts.push(text.slice(lastIndex, hl.begin));
    }

    // Добавляем подсвеченную часть текста
    parts.push(
      <span key={index} className="text-white">
        {text.slice(hl.begin, hl.end)}
      </span>,
    );

    lastIndex = hl.end; // Обновляем индекс
  });

  // Добавляем оставшийся текст после последней подсветки
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

export default renderHighlightedText;
