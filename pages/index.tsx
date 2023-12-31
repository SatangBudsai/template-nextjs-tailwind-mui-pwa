import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { pwaInstallHandler } from 'pwa-install-handler'
import { AddToHomeScreen } from 'react-pwa-add-to-homescreen';
export default function Home() {
  const router = useRouter();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
      console.log("beforeinstallprompt event fired");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the installation prompt");
        } else {
          console.log("User dismissed the installation prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <Layout className="p-5">
      <div className="uppercase">Template AroundTheCode</div>
      <Button variant="contained" onClick={() => router.push('/pageDemo')}>Home</Button>
      <Button variant="contained" className="ml-2" onClick={handleInstall}>
        Install App
      </Button>
      <AddToHomeScreen />
    </Layout>
  );
}
