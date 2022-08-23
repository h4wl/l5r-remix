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

export const unstable_shouldReload = () => true;




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

    await fs.readFile(mdPath);
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
          options.rehypePlugins = [...(options.rehypePlugins ?? []), toc]
      
          return options
        },
      });


      return json({result});
  
    
}

export default function IdPage() {
    const { result } = useLoaderData<typeof loader>();
    const { code } = result;
    const Component = useMemo(() => getMDXComponent(code), [code])
    const mdxExport = getMDXExport(code)
    return (<>
       <Component /> 
    </>
        
    );
  }