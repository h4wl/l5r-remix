import { Link, Outlet } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import BookLayout from "~/components/BookLayout";
import Drawer from "~/components/Drawer";
import Header from "~/components/Header";
import TableOfContents from "~/components/TableOfContents";

import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { bundleMDX } from "~/mdx-bundler.server";
import {getMDXComponent, getMDXExport} from 'mdx-bundler/client'

import fs from "~/fs.server";
import invariant from "tiny-invariant";

import { toc } from "@jsdevtools/rehype-toc";
import  rehypeSlug  from "rehype-slug";
import  wrap  from "rehype-wrap";

export const unstable_shouldReload = () => true;




export async function loader({ request, params }: LoaderArgs) {
    var test = params.id
    const mdPath = `${__dirname}/markdown/${test}.md`
    const mdxPath = mdPath + "x";
    let markdown = "";
    
    if(fs.existsSync(mdPath)) {
      const md = await fs.readFile(mdPath);
      markdown = md.toString();
    } else if (fs.existsSync(mdxPath)) {
      const mdx = await fs.readFile(mdPath);
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
          options.rehypePlugins = [...(options.rehypePlugins ?? []), [wrap, {wrapper : "article.basis-1/2 [&_h1]:text-6xl [&_h2]:mb-6 [&_h2]:text-5xl [&_h3]:text-4xl [&_h3]:mb-5  [&_h4]:text-3xl [&_h4]:mb-4 [&_p]:mb-3"}]]
          options.rehypePlugins = [...(options.rehypePlugins ?? []), [toc, {position: "beforeend"}]]
      
          return options
        },
      });


      return json({result});
  
    
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