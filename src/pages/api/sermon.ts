import axios from "axios";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

const getSermonsPage = async () => {
  let res = await axios.get("https://actsseventeen.com/sermons");
  return res.data;
};

type PreacherOption = {
  text: string;
  value: string;
};

type Data = {
  content?: string;
  preachers?: PreacherOption[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let page = await getSermonsPage();
  const dom = new JSDOM(page);
  let element = dom.window.document.querySelector(".entry-content")?.innerHTML;
  let preacherOptions = dom.window.document.querySelector(
    "#preacher"
  ) as HTMLSelectElement;

  let preachers: PreacherOption[] = [];
  if (preacherOptions && preacherOptions.options) {
    preachers = Array.from(preacherOptions.options).map((option) => ({
      text: option.text,
      value: option.value,
    }));
  }

  res.status(200).json({
    content: element,
    preachers,
  });
}
