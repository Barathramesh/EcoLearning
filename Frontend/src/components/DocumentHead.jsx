import React from "react";
import { Helmet } from "react-helmet";

const DocumentHead: React.FC = () => (
  <Helmet>
    <title>EcoLearn - Gamified Environmental Education</title>
    <meta name="description" content="Learn about environmental conservation through engaging games, interactive modules, and rewarding progress tracking. Join the eco-education revolution!" />
    <meta name="author" content="EcoLearn" />
    <meta name="keywords" content="environmental education, gamification, sustainability, learning platform, eco-friendly, green technology" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet" />
    <meta property="og:title" content="EcoLearn - Gamified Environmental Education" />
    <meta property="og:description" content="Learn about environmental conservation through engaging games, interactive modules, and rewarding progress tracking. Join the eco-education revolution!" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>
);

export default DocumentHead;
