import Layout from "@/components/Layout";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const handleInstall = () => {
    if (typeof window !== "undefined" && "share" in navigator) {
      navigator.share({
        title: "App Title",
        text: "Check out this app!",
        url: window.location.href,
      })
        .then(() => console.log("App shared successfully"))
        .catch((error) => console.error("Error sharing app:", error));
    }
  };

  useEffect(() => {
    const handleInstallPrompt = () => {
      // Hide the install button for unsupported devices
      const installButton = document.getElementById("installApp");
      if (installButton) {
        installButton.style.display = "none";
      }
    };

    window.addEventListener("click", handleInstallPrompt);

    return () => {
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
  );
}
