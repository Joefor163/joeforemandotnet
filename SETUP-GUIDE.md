# Joe Foreman — Website Setup Guide

This guide walks you through publishing your site on the internet
using **GitHub** (version control) and **Cloudflare Pages** (free hosting).
Once it's set up, every time you push an update to GitHub the live site
updates automatically — no extra steps needed.

---

## Step 1 — Put the files on GitHub

> You already have GitHub Desktop installed. Here's what to do.

1. Open **GitHub Desktop**.
2. Click **File → Add Local Repository**.
3. Click **Choose…** and navigate to the folder containing your website files
   (the folder with `index.html` in it).
4. If GitHub Desktop says "This folder is not a Git repository", click
   **"create a repository"** instead. Use these settings:
   - **Name:** `joeforeman-site` (or any name you like — no spaces)
   - **Local path:** already filled in
   - Leave everything else as default
   - Click **Create Repository**
5. You'll now see your files listed. Type a message in the **Summary** box
   at the bottom left — something like `Initial website commit` — then click
   **Commit to main**.
6. Click **Publish repository** (top right).
   - Set **Keep this code private** to OFF (it needs to be public for free
     Cloudflare Pages hosting).
   - Click **Publish Repository**.

Your files are now on GitHub. ✅

---

## Step 2 — Create a free Cloudflare account

1. Go to [cloudflare.com](https://cloudflare.com) and click **Sign Up**.
2. Enter your email and a password, then verify your email.
3. Once logged in, you're on the Cloudflare dashboard.

---

## Step 3 — Deploy to Cloudflare Pages

> This is where your site goes live on the internet.

1. In the Cloudflare dashboard, click **Workers & Pages** in the left sidebar.
2. Click **Create application**, then click the **Pages** tab.
3. Click **Connect to Git**.
4. Click **Connect GitHub** and authorize Cloudflare to access your GitHub account.
5. Select the repository you just created (e.g. `joeforeman-site`).
6. Click **Begin setup**. Use these settings:
   - **Production branch:** `main`
   - **Build command:** *(leave blank — we don't need a build step)*
   - **Build output directory:** *(leave blank)*
7. Click **Save and Deploy**.

Cloudflare will deploy your site in about 30 seconds and give you a free URL
like `joeforeman-site.pages.dev`. 🎉

**From now on:** every time you push a commit in GitHub Desktop, the live
site automatically updates within about 60 seconds. No extra steps.

---

## Step 4 — Add a custom domain (when you're ready)

Once you have a domain name (e.g. joeforeman.com):

1. In Cloudflare dashboard, go to your Pages project.
2. Click **Custom domains → Set up a custom domain**.
3. Enter your domain name and follow the instructions.

If you register your domain through Cloudflare itself (cloudflare.com/products/registrar),
the setup is automatic.

---

## Step 5 — Add Analytics

> So you can see who's visiting and which pages they view.

1. In Cloudflare dashboard, go to **Analytics & Logs → Web Analytics**.
2. Click **Add a site** and enter your Pages URL or custom domain.
3. Cloudflare will give you a **token** — a short code that looks like
   `a1b2c3d4e5f6...`
4. Open `index.html` in this folder, find the line that says:

   ```
   <!-- <script defer src='https://static.cloudflareinsights.com/...
   ```

5. **Remove the `<!--` at the start and the `-->` at the end** of that block
   (this "uncomments" the code, turning it on).
6. Replace `PASTE_YOUR_TOKEN_HERE` with your actual token.
7. Do the same in any other page files (each topic sub-site has the same
   placeholder).
8. Commit and push in GitHub Desktop — analytics will be live in minutes.

---

## How to add a new topical site

1. Copy the `_template-topic-site` folder.
2. Rename the copy to your topic name — **no spaces, all lowercase**
   (e.g. `cooking`, `travel`, `tech`).
3. Edit the `index.html` inside it: change the title, tag, and description.
4. Open the main `index.html` (homepage) and find the `cards-grid` section.
5. Copy one of the example `<a class="card" ...>` blocks and fill in:
   - `href="/your-topic-folder/"`
   - The tag, title, and description text
6. Commit and push in GitHub Desktop.

Or just tell Claude what you want and it will do all of this for you.

---

## How to add a YouTube video to the homepage

Tell Claude: *"Add this YouTube video to my homepage: [paste the YouTube URL]"*

Claude will extract the video ID, add the embed to `index.html`,
and explain how to commit it.

---

## Quick reference — daily workflow

| What you want to do | How |
|---|---|
| Make a change to the site | Edit the file, then in GitHub Desktop: write a summary, click Commit, click Push |
| Add a new topic site | Copy `_template-topic-site`, rename it, edit it, add a card to the homepage |
| Add a video | Give Claude the YouTube link |
| See your analytics | Log in to Cloudflare → Analytics & Logs → Web Analytics |
| Check what changed | GitHub Desktop shows a full history of every change ever made |

---

*Questions? Just ask Claude.*
