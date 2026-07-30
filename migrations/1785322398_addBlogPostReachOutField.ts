import { Client } from "@datocms/cli/lib/cma-client-node";

/**
 * Add localized singular Reach Out field on blog_post.
 * Target sandbox: new-data-models (TAR).
 */
export default async function (client: Client) {
  const BLOG_POST_ID = "38241";
  const REACH_OUT_BLOCK_ID = "ZoimmZOiR0mkjwIEXN-9Ag";

  console.log(
    'Create Modular Content (Single block) field "Reach Out" (`reach_out`) in model "📰 Blog post" (`blog_post`)',
  );

  const existing = await client.fields.list(BLOG_POST_ID);
  if (existing.some((f) => f.api_key === "reach_out")) {
    console.log("Field reach_out already exists — skipping create");
    return;
  }

  await client.fields.create(BLOG_POST_ID, {
    id: "S74nTxeKTHWdeGd1Ey8SYg",
    label: "Reach Out",
    field_type: "single_block",
    api_key: "reach_out",
    localized: true,
    validators: {
      single_block_blocks: {
        item_types: [REACH_OUT_BLOCK_ID],
      },
    },
    appearance: {
      addons: [],
      editor: "framed_single_block",
      parameters: { start_collapsed: false },
    },
  });
}
