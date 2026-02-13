import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { X } from "lucide-react";

function App() {
    const [inputtedUrl, setInputtedUrl] = useState<String>("");
    const [storedUrls, setStoredUrls] = useState<String[]>([]);

    async function addUrl() {
        try {
            //get currently stored urls
            const result = await chrome.storage.sync.get<{ urls: string[] }>("urls");
            const existingUrls = result.urls || [];
            // append inputted url to it
            const updatedUrls = [...existingUrls, inputtedUrl];
            setStoredUrls(updatedUrls);
            await chrome.storage.sync.set({ urls: updatedUrls });

        } catch(error) {
            console.log(error);
        }
    }

    async function removeUrl() {
        try {

        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="size-150">
            <p className='text-gray-800'>focus</p>
            <div className="flex gap-2 max-w-lg">
                <Input placeholder={"Enter URL to Block"} onChange={(e) => setInputtedUrl(e.target.value)}/>
                <Button className="hover:cursor-pointer" onClick={addUrl}>Add URL</Button>
            </div>
            {storedUrls.map((url, index) => (
                <div>
                    <p key={index}>{url}</p>
                    <Button variant={"destructive"}>
                        <X/>
                    </Button>
                </div>
            ))}
        </div>
    )
}

export default App
