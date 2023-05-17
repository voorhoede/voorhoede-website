import { Client } from "@datocms/cli/lib/cma-client-node";

export default async function (client: Client) {
  console.log("Update existing fields/fieldsets");

  console.log(
    'Update Single asset field "Image" (`image`) in block model "Section Image Card Grid Item" (`section_image_card_grid_item`)'
  );
  await client.fields.update("9103272", {
    hint: "Use a square illustration. Once displayed it will be 170x170px.",
  });

  console.log("Finalize models/block models");

  console.log('Update block model "Section Jobs List" (`section_jobs_list`)');
  await client.itemTypes.update("1466128", {
    hint: "https://www.datocms-assets.com/6524/1684331847-section-jobs-list-preview.png",
  });

  console.log('Update block model "Section Timeline" (`section_timeline`)');
  await client.itemTypes.update("1471996", {
    hint: "https://www.datocms-assets.com/6524/1684335037-section-timeline-preview.png",
  });

  console.log(
    'Update block model "Section Blogs Section" (`section_blogs_section`)'
  );
  await client.itemTypes.update("1514671", {
    hint: "https://www.datocms-assets.com/6524/1684331782-section-blogs-section-preview.png",
  });

  console.log(
    'Update block model "Section Events Section" (`section_events_section`)'
  );
  await client.itemTypes.update("1517179", {
    hint: "https://www.datocms-assets.com/6524/1684331794-section-events-section-preview.png",
  });

  console.log(
    'Update block model "Section Image Card Grid" (`section_image_card_grid`)'
  );
  await client.itemTypes.update("1757574", {
    hint: "https://www.datocms-assets.com/6524/1684331806-section-image-card-grid-preview.png",
  });

  console.log(
    'Update block model "Structured text - Tag list" (`structured_text_tag_list`)'
  );
  await client.itemTypes.update("1775016", {
    hint: "https://www.datocms-assets.com/6524/1684335825-structured-text-tag-list-preview.png",
  });

  console.log('Update block model "Section Header" (`section_header`)');
  await client.itemTypes.update("2037668", {
    hint: "https://www.datocms-assets.com/6524/1684331752-section-header-preview.png",
  });

  console.log(
    'Update block model "Section Image & Text" (`section_image_text`)'
  );
  await client.itemTypes.update("2037669", {
    hint: "https://www.datocms-assets.com/6524/1684333154-section-image-text-preview.png",
  });

  console.log(
    'Update block model "Section Interstitial CTA" (`section_interstitial_cta`)'
  );
  await client.itemTypes.update("2037920", {
    hint: "https://www.datocms-assets.com/6524/1684331835-section-interstitial-cta-preview.png",
  });

  console.log('Update block model "Section Newsletter" (`section_newsletter`)');
  await client.itemTypes.update("2037933", {
    hint: "https://www.datocms-assets.com/6524/1684331866-section-newsletter-preview.png",
  });

  console.log('Update block model "Section Image Grid" (`section_image_grid`)');
  await client.itemTypes.update("2037940", {
    hint: "https://www.datocms-assets.com/6524/1684331819-section-image-grid-preview.png",
  });

  console.log('Update block model "Section Logo Grid" (`section_logo_grid`)');
  await client.itemTypes.update("2040174", {
    hint: "https://www.datocms-assets.com/6524/1684331857-section-logo-grid-preview.png",
  });

  console.log(
    'Update block model "Section Structured Text" (`section_structured_text`)'
  );
  await client.itemTypes.update("2040351", {
    hint: "https://www.datocms-assets.com/6524/1684335806-section-structured-text-preview.png",
  });

  console.log(
    'Update block model "Section Dialogue CTA" (`section_dialogue_cta`)'
  );
  await client.itemTypes.update("2040362", {
    hint: "https://www.datocms-assets.com/6524/1684332478-section-dialogue-cta-preview.png",
  });

  console.log(
    'Update block model "Structured Text - Blue Text" (`structured_text_blue_text`)'
  );
  await client.itemTypes.update("2040400", {
    hint: "https://www.datocms-assets.com/6524/1684335829-structured-text-blue-text-preview.png",
  });

  console.log(
    'Update block model "Structured Text - Highlighted List" (`structured_text_highlighted_list`)'
  );
  await client.itemTypes.update("2040401", {
    hint: "https://www.datocms-assets.com/6524/1684335818-structured-text-highlighted-list-preview.png",
  });

  console.log(
    'Update block model "Structured Text - Buttons List" (`structured_text_buttons_list`)'
  );
  await client.itemTypes.update("2040408", {
    hint: "https://www.datocms-assets.com/6524/1684335812-structured-text-buttons-list-preview.png",
  });
}
