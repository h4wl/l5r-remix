import { ReactNode, useState } from "react";
import BookMenu from "./BookMenu";
import Drawer from "./Drawer";
import Header from "./Header";
import TableOfContents from "./TableOfContents";

type BookLayoutProps = {
    children: ReactNode;
}

export default function BookLayout({
    children
}: BookLayoutProps) {
    const [isOpen, setIsOpen] = useState(false);
    return <>
    
        <Header setIsOpen={setIsOpen} />
        <main className="flex-1 overflow-y-auto">
            <div className="flex flex-row">
                {/* <BookMenu /> */}
                <article className={`[&_h1]:text-6xl [&_h2]:text-5xl [&_h3]:text-4xl [&_h4]:text-3xl [&_h1,h2,h3,h4]:mb-2`}>
                    {children}
                </article>
                <TableOfContents />
            </div>
        </main>
        
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <TableOfContents />
        </Drawer>
    </>
}
