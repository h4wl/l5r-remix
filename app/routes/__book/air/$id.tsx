import { Link, Outlet } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import BookLayout from "~/components/BookLayout";
import Drawer from "~/components/Drawer";
import Header from "~/components/Header";
import TableOfContents from "~/components/TableOfContents";

import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { bundleMDX } from "~/mdx-bundler.server";
import {getMDXComponent} from 'mdx-bundler/client'

import fs from "~/fs.server";

export async function loader({ request, params }: LoaderArgs) {
    var test = params.id
    const mdxSource = `
---
title: Example Post
published: 2021-02-13
description: This is some description
---

# Wahoo

`.trim()
console.log("test")
    console.log(__dirname)
    const md = await fs.readFile("/favicon.ico");
    
    const result = await bundleMDX({
        source: md.toString(),
      });

      return json({result});
  
    
}

export default function IdPage() {
    const data = useLoaderData<typeof loader>();
    const Component = useMemo(() => getMDXComponent(data.result.code), [data.result.code])
  data.result.code
    return (<>
       <Component /> 
    </>
        
    );
  }