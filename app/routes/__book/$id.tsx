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
      options.rehypePlugins = [...(options.rehypePlugins ?? []), [wrap, { 
        wrapper: `article.prose prose-sm md:prose-base lg:prose-lg xl:prose-xl
          prose-headings:before:block prose-headings:before:content-['_'] prose-headings:before:-mt-20 prose-headings:before:h-20 prose-headings:before:invisible prose-headings:before:pointer-events-none
          mx-auto lg:ml-[calc((100vw_-_1024px)_*_1/3)] lg:mr-[15.5rem] xl:mx-0
          2xl:max-w-[50rem] lg:max-w-[min(65ch,calc(100vw-20rem))] xl:max-w-[min(65ch,calc(100vw-40rem))] 
          pt-6 lg:px-10`.trim().replace(/\s\s+/g,' ')
     }]]
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
              className: `scrollbar-hide cursor-ns-resize 
              h-[calc(100vh_-_4rem)] w-[19.5rem] 
              overflow-y-auto fixed 
              top-16 right-[max(0px,calc(50%-45rem))]  
              [&_a]:py-1 [&_li]:py-1 
              hidden lg:block 
              border-l pl-3`.trim().replace(/\s\s+/g,' '),
            },
            children: []
          };

          const tocHeader: HtmlElementNode = {
            type: "element",
            tagName: "div",
            properties: {
              className: "text-2xl font-medium pt-6",
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
          
          if (heading.tagName === "h2") {
            toc.properties.className = "ml-3";
          }else if (heading.tagName === "h3") {
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