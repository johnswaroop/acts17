export interface Chapter {
  title: string;
  paragraphs: {
    [key: string]: string;
  };
}

export interface LBC1689Data {
  title: string;
  chapters: {
    [key: string]: Chapter;
  };
}
