import { ReactNode, useState } from "react";
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
        <TableOfContents />
        {children}
        </main>
        
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <TableOfContents />
        </Drawer>
    </>
}
