import { CheckCircle } from "lucide-react";
import React from "react";

const faqs = [
  {
    question: "Do I need prior React experience?",
    answer:
      "Yes, this is an advanced course. We recommend at least 1 year of React experience before taking this course.",
  },
  {
    question: "How long will I have access to the course?",
    answer:
      "You'll have lifetime access to all course materials, including future updates.",
  },
  {
    question: "Are there any coding exercises?",
    answer:
      "Yes, each module includes practical exercises and real-world projects to reinforce your learning.",
  },
  {
    question: "Can I get a certificate after completion?",
    answer:
      "Yes, you'll receive a verifiable certificate that you can add to your LinkedIn profile.",
  },
];

const FAQ = () => {
  return (
    <section className="bg-background rounded-2xl border border-border p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-border pb-6 last:border-0 last:pb-0"
          >
            <div className="flex items-start gap-4">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
