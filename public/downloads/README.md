# Gated downloads

Put the catalogue here as **`trident-catalogue.pdf`**.

Files in this directory are **not** reachable over HTTP — `.htaccess` denies
direct access. They are served only by `/api/catalogue.php`, after a visitor
submits the lead-capture form.

To add or replace the catalogue:

1. Drop the PDF in this folder named `trident-catalogue.pdf`
2. Commit and push — the deploy picks it up automatically

To serve it under a different filename, change `CATALOGUE_FILE` and
`CATALOGUE_NAME` at the top of `public/api/catalogue.php`.

Before launch, also set `DOWNLOAD_SECRET` in that file to a long random string.
