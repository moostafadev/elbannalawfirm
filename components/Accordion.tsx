import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ, faqsData } from "@/data/faqs";
import { useLocale } from "next-intl";

export function AccordionFAQ() {
  const locale = useLocale();
  const faqs: FAQ[] = faqsData[locale] || [];

  return (
    <Accordion type="single" collapsible className="w-full" dir="rtl">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index + 1}`}
          className="content-data"
        >
          <AccordionTrigger className="text-sm md:text-lg font-semibold text-right">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm md:text-base">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
