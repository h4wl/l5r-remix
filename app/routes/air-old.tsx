import { Outlet } from "@remix-run/react";
import { useState } from "react";
import BookLayout from "~/components/BookLayout";

export default function AirPage() {
    const [test, setTest] = useState(0);
    
    
  
    return (
        <BookLayout>
            <div className="[&_p]:mt-4">
            <Outlet />
      </div>
           
        </BookLayout>
      
    );
  }
