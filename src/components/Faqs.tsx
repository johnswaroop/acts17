import React from "react";

const Item = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="collapse text-black h-fit bg-gray-200">
      <input type="radio" name={"my-accordion-" + question} />
      <div className="collapse-title text-xl font-medium">{question}</div>
      <div className="collapse-content">
        <p>{answer}</p>
      </div>
    </div>
  );
};

const faqslist = [
  {
    question: "What are the core beliefs of a Reformed Baptist Church?",
    answers:
      "Our church adheres to the doctrines of grace as articulated in Reformed theology, which emphasizes the sovereignty of God in all things, including salvation. We hold to the Five Solas, believe in the authority of Scripture, justification by faith alone, and practice believer's baptism.",
  },
  {
    question: "What is the worship service like?",
    answers:
      "Our services focus on glorifying God through preaching, prayer, singing hymns and contemporary worship songs that align with scriptural truths, and fellowship. We place a strong emphasis on expositional preaching to understand and apply the teachings of the Bible.",
  },
  {
    question: "How can I become a member?",
    answers:
      "Membership involves attending a membership class, sharing a testimony of faith in Christ, agreeing to our church's statement of faith and covenant, and being baptized if you have not already received believer's baptism.",
  },
  {
    question: "What programs do you have for children and youth?",
    answers:
      "We offer Sunday School classes for children and a youth group for teenagers. These programs teach the Bible in an age-appropriate way and provide a place for young people to grow in their faith and fellowship with peers.",
  },
  {
    question: "How does your church view baptism?",
    answers:
      "We practice believer's baptism by immersion, which is a public declaration of one's faith in Jesus Christ and obedience to Him, following the example of Jesus Himself as recorded in the New Testament.",
  },
  {
    question: "Do you have small group meetings?",
    answers:
      "Yes, we have small groups that meet throughout the week in homes or at the church. These groups are a key part of our church life for prayer, Bible study, fellowship, and mutual support.",
  },
  {
    question: "How can I get involved in serving?",
    answers:
      "There are many opportunities to serve within our church community, including worship teams, children's ministry, outreach events, and more. We encourage you to speak with a ministry leader or pastor to find where your gifts can best be used.",
  },
  {
    question: "What mission and outreach activities do you support?",
    answers:
      "Our church is actively involved in local and global missions, supporting missionaries, engaging in community service, and partnering with organizations to spread the Gospel and serve the needy.",
  },
];

function Faqs() {
  return (
    <div className="flex w-full bg-white justify-center">
      <div className="flex flex-col w-full max-w-[1700px] bg-white p-[4vw] h-fit">
        <h1 className="mx-auto text-4xl font-bold text-primary">
          More about us
        </h1>
        <div className="flex w-full h-full mt-[4vw]">
          <div className="flex gap-8 w-full">
            <div className="flex flex-col w-[50%] gap-6">
              {faqslist.slice(0, 4).map((faq, idx) => {
                return (
                  <Item
                    question={faq.question}
                    answer={faq.answers}
                    key={"col1" + idx}
                  />
                );
              })}
            </div>
            <div className="flex flex-col w-[50%] gap-6">
              {faqslist.slice(4).map((faq, idx) => {
                return (
                  <Item
                    question={faq.question}
                    answer={faq.answers}
                    key={"col2" + idx}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Faqs };
