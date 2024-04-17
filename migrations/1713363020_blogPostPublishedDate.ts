import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client): Promise<void> {
  const blogPosts = [];

  for await (const record of client.items.listPagedIterator({
    filter: {
      type: "blog_post",
      fields: { publish_date: { exists: true } },
    },
  })) {
    blogPosts.push(record);
  }

  console.log("Found blog posts:", blogPosts.length);
  console.log("Attempting to update blog posts");

  // move the 'published' field to the 'meta -> published_at/first_published_at' field
  const updatedPosts = await Promise.all(
    blogPosts.map(async (blogPost) => {
      // update the 'published' field of each blog post
      return await client.items.update(blogPost.id, {
        meta: {
          published_at: new Date(blogPost.publish_date).toISOString(),
          first_published_at: new Date(blogPost.publish_date).toISOString(),
        },
      });
    })
  );

  console.log("Updated blog posts:", updatedPosts.length);

  // delete the 'published_date' field
  await client.fields.destroy("145704");
}
