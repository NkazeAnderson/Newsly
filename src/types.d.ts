interface Article {
    title: string;
    description: string;
    source: {
      name: string;
      logo: string;
      author: string;
    };
    url: string;
    imageUrl: string;
  }

  interface Period {
    text:string,
    value: "day" | "week" | "month" | "year" | "plusOneYear"
  }

  interface QueryComponentsProps {
    selected: string | null;
    setQueryValue: (value: string) => void;
    removeQuery: VoidFunction;
  }