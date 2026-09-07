import type { Client} from "datocms/lib/cma-client-node";

export default async function (client: Client) {
  // Idempotency guard: skip if plugin already installed
  const plugins = await client.plugins.list();
  if (plugins.find((p) => p.package_name === "datocms-plugin-custom-text-styles")) {
    console.log("Plugin already installed — skipping migration");
    return;
  }

  console.log("Manage upload filters");

  console.log('Install plugin "Custom Text Styles"');
  await client.plugins.create({
    id: "G_baOmXrQzahJBvJO_qwcw",
    package_name: "datocms-plugin-custom-text-styles",
  });
  await client.plugins.update("G_baOmXrQzahJBvJO_qwcw", {
    parameters: {
      customMarks: [
        {
          css: "color: blue;",
          icon: { label: "Paintbrush", value: "paintbrush" },
          slug: "blue",
          title: "Blue",
          isOpen: true,
          keyboardShortcut: "ctrl+shift+p",
        },
      ],
      customStyles: [
        {
          css: "text-align: center;",
          slug: "centered",
          nodes: [
            { label: "Paragraph", value: "paragraph" },
            { label: "Heading", value: "heading" },
          ],
          title: "Centered",
          isOpen: false,
        },
        {
          css: "font-size: 30px;\nline-height: 1.5;",
          slug: "testimonial",
          nodes: [
            { label: "Paragraph", value: "paragraph" },
            { label: "Heading", value: "heading" },
          ],
          title: "Testimonial",
          isOpen: true,
        },
      ],
    },
  });

}
