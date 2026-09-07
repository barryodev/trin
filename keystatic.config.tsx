import { config, fields, collection } from "@keystatic/core";

const isProd = process.env.NODE_ENV === "production";

export default config({
  storage: isProd
    ? {
        kind: "github",
        repo: {
          owner: process.env.KEYSTATIC_GITHUB_OWNER as string,
          name: process.env.KEYSTATIC_GITHUB_REPO as string,
        },
      }
    : { kind: "local" },

  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "content/posts/*/",
      format: { contentField: "content" },
      previewUrl: "/posts/{slug}",
      columns: ["title", "publishedDate"],
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { length: { min: 4 } },
          },
        }),
        publishedDate: fields.date({
          label: "Published date",
          defaultValue: { kind: "today" },
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "A one or two sentence summary shown on the posts list.",
          multiline: true,
          validation: { length: { min: 1, max: 240 } },
        }),
        coverImage: fields.image({
          label: "Cover image",
          description: "Optional. Shown at the top of the post.",
          directory: "public/images/posts",
          publicPath: "/images/posts/",
        }),
        // The rich-text field: post content, stored as Markdoc alongside
        // the entry's front matter (see `format.contentField` above).
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/images/posts",
            publicPath: "/images/posts/",
          },
        }),
      },
    }),
  },
});
