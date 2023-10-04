import React from "react";
import { Button } from "react-bootstrap";

const AddToHomeScreenButton = () => {
  const handleAddToHomeScreen = () => {
    if (window.deferredPrompt) {
      // Show the installation prompt
      window.deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      window.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
      });

      // Reset the deferredPrompt variable
      window.deferredPrompt = null;
    }
  };

  return (
    <Button variant="success" onClick={handleAddToHomeScreen}>
      Click here to Download App
    </Button>
  );
};

export default AddToHomeScreenButton;
