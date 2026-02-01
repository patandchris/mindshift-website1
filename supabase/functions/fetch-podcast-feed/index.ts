import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS - restrict to production and development domains
const allowedOrigins = [
  'https://mindshift-website1.lovable.app',
  'https://id-preview--ac3b99e9-64d6-484e-b0ab-263e802b2e64.lovable.app',
  'http://localhost:5173',
  'http://localhost:8080',
];

// Allowed podcast feed URLs to prevent SSRF attacks
const allowedFeedUrls = [
  'https://feeds.buzzsprout.com/2418156.rss',
];

const getCorsHeaders = (origin: string) => ({
  'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
});

serve(async (req) => {
  const origin = req.headers.get('origin') || '';
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { feedUrl } = await req.json();
    
    if (!feedUrl) {
      return new Response(
        JSON.stringify({ error: 'feedUrl is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate feedUrl against allowlist to prevent SSRF
    if (!allowedFeedUrls.includes(feedUrl)) {
      console.error('Unauthorized feed URL attempted:', feedUrl);
      return new Response(
        JSON.stringify({ error: 'Unauthorized feed URL' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching podcast feed from:', feedUrl);

    const response = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PodcastFetcher/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch feed: ${response.status} ${response.statusText}`);
    }

    const xmlText = await response.text();
    console.log('Successfully fetched feed, length:', xmlText.length);

    return new Response(
      JSON.stringify({ xml: xmlText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error fetching podcast feed:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
