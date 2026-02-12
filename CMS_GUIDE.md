# OYANGE Backend & Content Management Guide

The OYANGE website is designed to be a Headless visual experience. While the current version reads data from a local JSON file (`src/data/galleries.json`), the industry-standard way to manage images and content for a premium portfolio is using a **Headless CMS**.

## Recommended Stack: Sanity.io

To allow you (the photographer) to easily upload images, create new albums, and update text without touching code, we recommend integrating **Sanity.io**.

### Why Sanity?

- **Real-time image CDN:** Automatically resizes and optimizes your high-res photos for the web.
- **Visual Editing:** You can see your changes live on the site before publishing.
- **Generous Free Tier:** Perfect for individual portfolios.

### Implementation Steps

1. **Initialize Sanity Project:**
   Run the following command in your terminal (outside the `src` folder):

   ```bash
   npm create sanity@latest
   ```

   - Select "Clean project with no predefined schemas".
   - Project name: `oyange-cms`

2. **Define Schemas:**
   Create a schema for `gallery` in your Sanity studio:

   ```js
   export default {
     name: 'gallery',
     title: 'Gallery',
     type: 'document',
     fields: [
       { name: 'title', title: 'Title', type: 'string' },
       { name: 'category', title: 'Category', type: 'string', options: { list: ['Wedding', 'Editorial', 'Documentary', 'Portrait'] } },
       { name: 'cover', title: 'Cover Image', type: 'image' },
       { name: 'images', title: 'Gallery Images', type: 'array', of: [{ type: 'image' }] }
     ]
   }
   ```

3. **Connect Frontend:**
   Install the localized client:

   ```bash
   npm install next-sanity
   ```

   Create a `src/sanity/client.ts` to fetch data instead of importing `galleries.json`.

### Short-Term Solution (Current)

For now, to update the website:

1. Upload your new images to `public/images/` or host them on a cloud service (like Cloudinary or Unsplash).
2. Open `src/data/galleries.json`.
3. Add a new entry following the existing format:

   ```json
   {
       "id": "new-project",
       "title": "New Project Title",
       "category": "EDITORIAL",
       "cover": "/images/new-cover.jpg",
       ...
   }
   ```

4. Commit and push your changes to deploy.

---

## Booking System (Backend)

The booking page is set up to integrate with **Cal.com** or **Calendly**.

1. Create a free account on [Cal.com](https://cal.com).
2. Create an event type (e.g., "Discovery Call" or "Photo Session").
3. Copy the **Embed Code**.
4. Replace the placeholder in `src/app/inquire/page.tsx` with your embed iframe:

   ```tsx
   <iframe src="https://cal.com/your-link/30min" width="100%" height="100%" frameBorder="0"></iframe>
   ```
