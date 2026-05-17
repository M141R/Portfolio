import { config, collection, singleton, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "m141r/Portfolio",
  },
  collections: {
    projects: collection({
      label: "Featured Projects",
      slugField: "title",
      path: "src/content/projects/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({
          name: { label: "Title" },
        }),
        order: fields.integer({ label: "Display Order", defaultValue: 1 }),
        image: fields.image({
          label: "Project Image",
          directory: "src/assets/project",
          publicPath: "../../assets/project",
        }),
        description: fields.text({ label: "Description" }),
        category: fields.text({
          label: "Category",
        }),
        link: fields.url({ label: "Project Link" }),
        color: fields.text({ label: "Background Color" }),
      },
    }),
    skills: collection({
      label: "Skills",
      slugField: "title",
      path: "src/content/skills/*",
      schema: {
        title: fields.slug({
          name: { label: "Category Title (eg Frontend)" },
        }),
        order: fields.integer({ label: "Display Order", defaultValue: 1 }),
        preview: fields.text({
          label: "Preview Text (e.g. Astro · Tailwind)",
        }),
        tags: fields.array(
          fields.object({
            name: fields.text({ label: "Tag Name" }),
            highlight: fields.checkbox({ label: "Highlight Tag" }),
          }),
          {
            label: "Skill Tags",
            itemLabel: (props) => props.fields.name.value,
          },
        ),
      },
    }),
  },
  singletons: {
    about: singleton({
      label: "About",
      path: "src/content/about/data",
      format: { data: "json" },
      schema: {
        text: fields.text({ label: "About Text", multiline: true }),
      },
    }),
  },
});
