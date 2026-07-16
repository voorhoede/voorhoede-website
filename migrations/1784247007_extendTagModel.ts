import type { Client } from "datocms/lib/cma-client-node";

/**
 * Migration 07: Extend tag model.
 *
 * Current tag fields:
 *   - title (LqzKj-lyQ3aFHQBe4696Ow) - keep
 *   - slug  (LUB9rEDZQdyciEdTAhIgWQ)  - keep
 *   - blog_tag_social (c1exEEzwSTaXgK5Uq1aTKQ) → rename to seo
 *   - blog_topic_description (dAMYrpMfRliQyC1Z61ycng) → rename to description
 *
 * Add:
 *   - category (enum: topic|expertise|technology|deliverable|job|service|event|other)
 *
 * The tag model now serves ALL taxonomy: blog topics, expertise, technology,
 * deliverable, job category, service category, event label, and other.
 */
export default async function (client: Client) {
  const TAG_MODEL_ID = "ZCFTBhXpQAG6_zAdrRb7Sw";

  // Rename blog_tag_social → seo
  console.log("Rename blog_tag_social → seo");
  await client.fields.update("c1exEEzwSTaXgK5Uq1aTKQ", {
    api_key: "seo",
    label: "SEO",
  });

  // Rename blog_topic_description → description
  console.log("Rename blog_topic_description → description");
  await client.fields.update("dAMYrpMfRliQyC1Z61ycng", {
    api_key: "description",
    label: "Description",
  });

  // Add category field
  console.log("Add category field");
  await client.fields.create(TAG_MODEL_ID, {
    label: "Category",
    field_type: "string",
    api_key: "category",
    hint: "Topic = blog/content tag; others = former taxonomy models.",
    validators: {
      required: {},
      enum: {
        values: ["topic", "expertise", "technology", "deliverable", "job", "service", "event", "other"],
      },
    },
    appearance: {
      addons: [],
      editor: "string_select",
      parameters: {
        options: [
          { label: "Topic", value: "topic", hint: "" },
          { label: "Expertise", value: "expertise", hint: "" },
          { label: "Technology", value: "technology", hint: "" },
          { label: "Deliverable", value: "deliverable", hint: "" },
          { label: "Job", value: "job", hint: "" },
          { label: "Service", value: "service", hint: "" },
          { label: "Event", value: "event", hint: "" },
          { label: "Other", value: "other", hint: "" },
        ],
      },
    },
    default_value: "topic",
  });

  console.log("✅ tag model extended");
}
