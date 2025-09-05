#!/usr/bin/env node

// Y2Mate - YouTube Video Downloader (Demo)
// Requires: ytdl-core (install via `npm install ytdl-core`)

const fs = require('fs');
const ytdl = require('ytdl-core');
const readline = require('readline');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("=== Y2Mate YouTube Downloader (Demo) ===\n");

rl.question("Enter YouTube Video URL: ", function (url) {
  if (!ytdl.validateURL(url)) {
    console.error("❌ Invalid YouTube URL.");
    rl.close();
    return;
  }

  rl.question("Enter file name (without extension): ", function (filename) {
    const output = `${filename}.mp4`;
    console.log(`\n📥 Downloading video to: ${output}\n`);

    ytdl(url, { quality: 'highestvideo' })
      .pipe(fs.createWriteStream(output))
      .on('finish', () => {
        console.log("✅ Download complete!");
        rl.close();
      })
      .on('error', (err) => {
        console.error("❌ Error downloading video:", err.message);
        rl.close();
      });
  });
});
