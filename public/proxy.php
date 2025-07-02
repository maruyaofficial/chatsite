<?php
// Target URL
$targetUrl = 'https://home.nathcreqtives.com/';

// Use cURL to fetch the external site
$ch = curl_init($targetUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
curl_setopt($ch, CURLOPT_HEADER, false);

$response = curl_exec($ch);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
curl_close($ch);

// Send correct headers
header("Content-Type: $contentType");
header("X-Frame-Options: ALLOWALL"); // Optional override
header("Access-Control-Allow-Origin: *"); // Optional if needed

// Output the response
echo $response;
?>
