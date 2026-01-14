import { useState } from "react";

const MindshiftApp = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">MindShift App</h1>
        <p className="text-muted-foreground">
          This page will be used for the Progressive Web App.
        </p>
      </div>
    </div>
  );
};

export default MindshiftApp;
