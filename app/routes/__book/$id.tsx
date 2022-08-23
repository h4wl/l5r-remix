import { useMemo } from "react";
import { json, LoaderArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { bundleMDX } from "~/mdx-bundler.server";
import { getMDXComponent } from 'mdx-bundler/client'
import fs from "~/fs.server";
import { HtmlElementNode, TextNode, toc } from "@jsdevtools/rehype-toc";
import rehypeSlug from "rehype-slug";
import wrap from "rehype-wrap";

// export const unstable_shouldReload = () => true;

type LoaderType = {
  result: {
    frontmatter: {
      [key: string]: any;
    }
  }
}

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderType
}) => {
  const defaultMeta = {
    title: "Title Not Set",
  }
  if (!data) {
    return defaultMeta;
  }
  const { result } = data
  const { frontmatter } = result;
  const meta = frontmatter["meta"];
  const title = meta && meta["title"];

  return title ? { title } : defaultMeta

};


export async function loader({ request, params }: LoaderArgs) {
  console.log(__dirname);
  console.log(process.env.NODE_ENV);
  var test = params.id
  let mdPath = "";
  let mdxPath = "";

  if (process.env.NODE_ENV === "development") {
    mdPath = `${__dirname}/../app/markdown/${test}.md`
    mdxPath = mdPath + "x";
  } else {
    mdPath = `${__dirname}/markdown/${test}.md`
    mdxPath = mdPath + "x";
  }

  let markdown = "";

  if (fs.existsSync(mdPath)) {
    const md = await fs.readFile(mdPath);
    markdown = md.toString();
  } else if (fs.existsSync(mdxPath)) {
    const mdx = await fs.readFile(mdxPath);
    markdown = mdx.toString();
  }
  else {
    markdown = "# 404"
  }

  const result = await bundleMDX({
    source: markdown,
    mdxOptions(options, frontmatter) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeSlug]
      options.rehypePlugins = [...(options.rehypePlugins ?? []), [wrap, { wrapper: "article.basis-1/2 px-6 pt-6 [&_h1]:mb-7 [&_h1]:text-6xl [&_h2]:mb-6 [&_h2]:text-5xl [&_h3]:text-4xl [&_h3]:mb-5  [&_h4]:text-3xl [&_h4]:mb-4 [&_p]:mb-6" }]]
      options.rehypePlugins = [...(options.rehypePlugins ?? []), [toc, {
        position: "beforeend",
        headings: ["h2", "h3", "h4"],
        cssClasses: {
          list: "",
          listItem: "",
          link: ""
        },
        customizeTOC(toc: HtmlElementNode) {
          const newToc: HtmlElementNode = {
            type: "element",
            tagName: "aside",
            properties: {
              className: "h-[calc(100vh_-_4rem)] overflow-y-auto sticky top-0 basis-1/4 [&_a]:py-1 [&_li]:py-1",
            },
            children: []
          };

          const tocHeader: HtmlElementNode = {
            type: "element",
            tagName: "div",
            properties: {
              className: "text-2xl pt-6 pb-3",
            },
            children: []
          };
          var text: TextNode = {
            type: "text",
            value: "Table of Contents"
          };
          tocHeader.children?.push(text);
          newToc.children?.push(tocHeader);
          newToc.children?.push(toc);

          return newToc;

        },
        customizeTOCItem(toc: HtmlElementNode, heading: HtmlElementNode) {
          
          if (heading.tagName === "h3") {
            toc.properties.className = "ml-3";
          } else if (heading.tagName === "h4") {
            toc.properties.className = "ml-3";
          }

          return toc;
        }
      }]]

      return options
    },
  });

  return json({ result });
}

export default function IdPage() {

  const { result } = useLoaderData<typeof loader>();
  const { code } = result;
  const Component = useMemo(() => getMDXComponent(code), [code])
  return (<>
    <Component />
  </>

  );
}