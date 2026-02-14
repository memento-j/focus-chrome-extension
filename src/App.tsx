import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { X } from "lucide-react";

function App() {
    const [inputtedUrl, setInputtedUrl] = useState<string>("");
    const [storedUrls, setStoredUrls] = useState<string[]>([]);

    //get urls to display when extension is opened
    useEffect(() => {
        getUrls();
        async function getUrls() {
            const result = await chrome.storage.sync.get<{ urls: string[] }>("urls");
            const existingUrls = result.urls || [];
            setStoredUrls(existingUrls);
        }
    }, [])

    async function addUrl() {
        try {
            //get currently stored urls
            const result = await chrome.storage.sync.get<{ urls: string[] }>("urls");
            const existingUrls = result.urls || [];
            //ensures no duplicates are added
            if (existingUrls.includes(inputtedUrl)) {
                return;
            }
            // append inputted url to it
            const updatedUrls = [...existingUrls, inputtedUrl];
            setStoredUrls(updatedUrls);
            await chrome.storage.sync.set({ urls: updatedUrls });
        } catch(error) {
            console.log(error);
        }
    }

    async function removeUrl(urlToRemove: string) {
        try {
            const updatedUrls = storedUrls.filter((url) => url != urlToRemove);
            setStoredUrls(updatedUrls);
            await chrome.storage.sync.set({ urls: updatedUrls });
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="h-150 w-100 justify-center p-5">
            <p className='text-gray-800 text-lg text-center mb-1'>Focus :)</p>
            <div className="flex gap-2 max-w-lg">
                <Input placeholder={"Enter URL to Block"} onChange={(e) => setInputtedUrl(e.target.value)}/>
                <Button className="hover:cursor-pointer" onClick={addUrl}>Add URL</Button>
            </div>
            {storedUrls.map((url, index) => (
                <div key={index} className="flex justify-center gap-2 mt-5">
                    <p className="text-lg">{url}</p>
                    <Button variant={"destructive"} className="hover:cursor-pointer size-8" onClick={() => removeUrl(url)}>
                        <X/>
                    </Button>
                </div>
            ))}
        </div>
    )
}

export default App
