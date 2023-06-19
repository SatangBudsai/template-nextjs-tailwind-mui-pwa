import Layout from "@/components/Layout";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()


  const handleInstall = () => {
    if (typeof window !== "undefined" && "beforeinstallprompt" in window) {
      const installPromptEvent = new Event("beforeinstallprompt");
      window.dispatchEvent(installPromptEvent);
    }
  };

  useEffect(() => {
    let deferredPrompt: Event | any;

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      deferredPrompt = event;
    };

    const handleInstallPrompt = () => {
      if (deferredPrompt) {
        (deferredPrompt).prompt();
        (deferredPrompt).userChoice.then((choiceResult: any) => {
          // Handle the user's choice (optional)
        });
        deferredPrompt = null;
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("click", handleInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("click", handleInstallPrompt);
    };
  }, []);

  return (
    <Layout className="p-5">
      <div className="uppercase">Template AroundTheCode</div>
      <Button variant="contained" onClick={() => router.push('/pageDemo')}>Home</Button>
      <Button id="installApp" variant="contained" className="ml-2" onClick={handleInstall}>
        Install App
      </Button>
    </Layout>
  )
}
