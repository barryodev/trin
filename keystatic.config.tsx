import { config, fields, collection, component } from "@keystatic/core";

// Must be NEXT_PUBLIC_-prefixed: this file is imported by both server and
// client code, and server-only env vars (e.g. VERCEL_ENV) resolve to
// undefined in the browser bundle, causing client/server storage mismatches.
const useGitHubStorage = process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";

export default config({
  storage: useGitHubStorage
    ? {
        kind: "github",
        repo: {
          owner: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER as string,
          name: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as string,
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
          componentBlocks: {
            video: component({
              preview: (props) => {
                const src = props.fields.src.value;
                const autoPlay = props.fields.autoPlay.value;
                let url: string | undefined = undefined;
                if (typeof src === 'string') {
                  url = src;
                } else if (src && typeof src === 'object' && 'data' in src) {
                  // @ts-ignore - TS thinks data might be SharedArrayBuffer
                  url = URL.createObjectURL(new Blob([src.data]));
                }
                const width = props.fields.width?.value || "100%";
                
                return url ? (
                  <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <video 
                      src={url} 
                      controls={!autoPlay}
                      autoPlay={autoPlay}
                      loop={autoPlay}
                      muted={autoPlay}
                      playsInline={autoPlay}
                      style={{ width, maxWidth: "100%", borderRadius: "0.5rem" }}
                    />
                  </div>
                ) : (
                  <div style={{ padding: '1rem', border: '1px dashed #ccc', textAlign: 'center' }}>
                    No video selected
                  </div>
                );
              },
              label: "Video",
              schema: {
                src: fields.file({
                  label: "Video File (mp4)",
                  description: "Upload an mp4 video file",
                  directory: "public/videos/posts",
                  publicPath: "/videos/posts/",
                }),
                autoPlay: fields.checkbox({
                  label: "Autoplay (looping, muted clip)",
                  defaultValue: true,
                }),
                width: fields.text({
                  label: "Width",
                  description: "CSS width (e.g., '100%', '400px', 'max-content'). Defaults to 100%.",
                  defaultValue: "100%",
                }),
              },
            }),
          },
        }),
      },
    }),
  },
});
