interface Chapter {
  title: string;
  paragraphs: {
    [key: string]: string;
  };
}

interface LBC1689Data {
  title: string;
  chapters: {
    [key: string]: Chapter;
  };
}

declare module "*.json" {
  const value: LBC1689Data;
  export default value;
}
