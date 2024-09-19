export type SuggestAddresses = {
  suggest_reqid: string;
  results?: SuggestAddress[];
};

export type AddressTags = "";

export type TextWithHighlight = {
  text: string;
  hl?: Highlight[];
};

export type Highlight = {
  begin: number;
  end: number;
};

export type SuggestAddress = {
  title: TextWithHighlight;
  subtitle: TextWithHighlight;
  tags: AddressTags[];
  distance: {
    value: number;
    text: string;
  };
  uri: string;
};

const suggestAddress = async (
  searchString: string,
  bbox?: string,
  ull?: string,
  lang: string = "ru",
): Promise<SuggestAddresses> => {
  const response = await fetch(
    `https://suggest-maps.yandex.ru/v1/suggest?apikey=${import.meta.env.VITE_REACT_APP_API_YANDEX_SUGGEST_TOKEN}&text=${searchString}${bbox ? `&bbox=${bbox}` : ""}&strict_bounds=1&lang=${lang}&attrs=uri${ull ? `&ull=${ull}` : ""}`,
  );

  if (!response.ok) {
    return {
      suggest_reqid: "",
    };
  }

  return await response.json().then((data) => {
    console.log(
      `https://suggest-maps.yandex.ru/v1/suggest?apikey=${import.meta.env.VITE_REACT_APP_API_YANDEX_SUGGEST_TOKEN}&text=${searchString}${bbox ? `&bbox=${bbox}` : ""}&lang=${lang}&attrs=uri${ull ? `&ull=${ull}` : ""}:  ${JSON.stringify(data)}`,
    );
    return data;
  });
};

export default suggestAddress;
