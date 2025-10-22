import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { apiRequest } from "@/helpers/apiRequest";
import ContainerLayout from "@/layout/ContainerLayout";
import React from "react";

const page = async () => {
  const { data } = await apiRequest("/faqs", {
    method: "GET",
  });
  console.log(data);
  return (
    <section className="bg-bg min-h-[calc(100vh-64px)] py-10">
      <ContainerLayout>
        <h4 className="text-xl text-dark-primary font-medium mb-10">
          Frequently Asked Questions
        </h4>
        <div>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {data?.map((item: any, idx: number) => (
              <AccordionItem value={`item-${idx + 1}`} key={idx}>
                <AccordionTrigger className="leading-[104.4%] hover:no-underline bg-[#E6F5EE] px-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-8">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ContainerLayout>
    </section>
  );
};

export default page;
