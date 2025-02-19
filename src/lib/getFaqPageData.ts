import { shopifyFetch } from "./shopify";

interface Metafield {
  namespace: string;
  key: string;
  value: string;
}

console.log("shopifyFetch is being called...");
export async function getFaqPageData() {
  try {
    const { body } = await shopifyFetch({
      query: `
                query GetFaqPage {
                    page(handle: "faq") {
                        metafields(identifiers: [
                            { namespace: "faq", key: "question_1" },
                            { namespace: "faq", key: "answer_1" },
                            { namespace: "faq", key: "question_2" },
                            { namespace: "faq", key: "answer_2" },
                            { namespace: "faq", key: "question_3" },
                            { namespace: "faq", key: "answer_3" },
                        ]) {
                            key
                            namespace
                            value    
                        }
                    }
                }
            `,
    });

    const metafields = body?.data?.page?.metafields || [];

    const findMetafield = (namespace: string, key: string) =>
      metafields?.find(
        (m: Metafield | null) => m && m.namespace === namespace && m.key === key
      );

      return [
      {
        question: findMetafield("faq", "question_1")?.value || "Question 1",
        answer: findMetafield("faq", "answer_1")?.value || "Answer 1",
      }, 
      {
        question: findMetafield("faq", "question_2")?.value || "Question 2",
        answer: findMetafield("faq", "answer_2")?.value || "Answer 2",
      }, 
      {
        question: findMetafield("faq", "question_3")?.value || "Question 3",
        answer: findMetafield("faq", "answer_3")?.value || "Answer 3",
      }, 
      
      
    ]


    
  } catch (error) {
    console.error("Failed to get FAQ page data:", error);
    return []
  }
}
