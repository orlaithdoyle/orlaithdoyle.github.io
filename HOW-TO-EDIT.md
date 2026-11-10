# How to edit your website

Everything is done on the GitHub website. No code needed.

## Change the words on a page

1. Open your repo and click the page you want, for example `projects.md`.
2. Click the pencil icon (top right of the file).
3. Type your changes. The site is written in Markdown, which is just text with a few symbols:
   - `# Big title` and `### Smaller heading`
   - `*Text in stars*` shows in italics, used for dates
   - `**Text in double stars**` shows in bold
   - `- ` at the start of a line makes a bullet point
   - `[link text](https://address.com)` makes a link
4. Click **Commit changes**. The site updates within a minute or two.

## Add a new project

Copy an existing project block in `projects.md` and change the words:

    ### Project name
    *Where, year*

    A few sentences about it.

## Add a photo

1. Open the `photos` folder, click **Add file > Upload files** and upload it. Keep the name simple, like `sqrt.jpg`, with no spaces.
2. In the page, add these two lines where you want it:

       ![Short description](photos/sqrt.jpg)
       *Caption under the photo.*

Some pages already have photo lines waiting inside `<!--` and `-->`. Delete those two markers and the photo shows up.

**Your profile photo:** upload it as `photo.jpg` (not inside the photos folder), then in `index.md` delete the `#` before `photo: photo.jpg`.

Photos from a phone are big. Before uploading, shrink them to about 1500 pixels wide at https://squoosh.app so the site stays fast.

## Change your email, links or the menu

Edit `_config.yml`. Your email, LinkedIn, GitHub and the menu are all at the top.

## Change the colours or font

Edit the top section of `style.css`. Each colour has a note saying what it does.

## Update your CV

Upload the new file as `cv.pdf`. It replaces the old one.

## If something looks broken

Go to the **Actions** tab in your repo. A red X means the last change has a mistake, usually a missing `---` at the top of a page or a stray symbol in `_config.yml`. Undo your last edit, or send it to me.
