import axios from "axios";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

const getSermonsPage = async () => {
  let res = await axios.get("https://actsseventeen.com/sermons");
  return res.data;
};

type Data = {
  name: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let page = await getSermonsPage();
  const dom = new JSDOM(page);
  let element = dom.window.document.querySelector(".entry-content")?.innerHTML;
  let preacherOptions = dom.window.document.querySelector("#preacher");
  if (preacherOptions && preacherOptions.options) {
    const preacherOptionslist = [...preacherOptions.options].map((option) => ({
      text: option.text,
      value: option.value,
    }));
  }

  console.log(element);
  res.status(200).json({ name: "John Doe" });
}
