[<img alt="Deployed with FTP Deploy Action" src="https://img.shields.io/badge/Deployed With-FTP DEPLOY ACTION-%3CCOLOR%3E?style=for-the-badge&color=0077b6">](https://github.com/SamKirkland/FTP-Deploy-Action)
[![Deployed on merge](https://github.com/RotaractMora/RUR-Official-Website-2/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/RotaractMora/RUR-Official-Website-2/actions/workflows/firebase-hosting-merge.yml)
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Multi-Environment Setup

This project supports 3 Firebase environments:

| Environment | Description | Firebase Project |
|-------------|-------------|------------------|
| `prod-26` | Production (RUR 26) | `rur-26-web-prod` |
| `prod-27` | Production (RUR 27) | `rur-27-web-prod` |
| `dev` | Development/Staging | `rur-web-dev` |

### Local Development

To run the project locally with different environments, first copy `.env.example` to create your environment files:

```bash
# For prod-26 environment
cp .env.example .env.prod-26
# Edit .env.prod-26 with prod-26 Firebase credentials

# For prod-27 environment  
cp .env.example .env.prod-27
# Edit .env.prod-27 with prod-27 Firebase credentials

# For dev environment
cp .env.example .env.dev
# Edit .env.dev with dev Firebase credentials

# For default local development
cp .env.example .env.local
# Edit .env.local with your preferred Firebase credentials
```

Then run the development server with your chosen environment:

```bash
# Default local development (uses .env.local)
npm run dev

# Run with prod-26 environment
npm run dev:prod-26

# Run with prod-27 environment (recommended for dev branch)
npm run dev:prod-27

# Run with dev environment
npm run dev:dev
```

### Build Commands

```bash
# Standard build (uses .env.local or environment variables)
npm run build

# Build for specific environments
npm run build:prod-26
npm run build:prod-27
npm run build:dev
```

### CI/CD Deployment

#### Main Branch
- Deploys via FTP (primary)
- Deploys to Firebase Hosting `prod-26` environment (backup)

#### Dev Branch
- Deploys to all 3 Firebase Hosting environments (prod-26, prod-27, dev)
- Can be manually triggered with environment selection via GitHub Actions

#### Pull Requests
- Creates preview deployments on all 3 environments

### Required GitHub Secrets

For each environment, the following secrets need to be configured:

**Prod-26 (rur-26-web-prod):**
- `NEXT_PUBLIC_API_KEY_PROD_26`
- `NEXT_PUBLIC_AUTH_DOMAIN_PROD_26`
- `NEXT_PUBLIC_PROJECT_ID_PROD_26`
- `NEXT_PUBLIC_STORAGE_BUCKET_PROD_26`
- `NEXT_PUBLIC_MESSAGING_SENDER_ID_PROD_26`
- `NEXT_PUBLIC_APP_ID_PROD_26`
- `FIREBASE_SERVICE_ACCOUNT_PROD_26`

**Prod-27 (rur-27-web-prod):**
- `NEXT_PUBLIC_API_KEY_PROD_27`
- `NEXT_PUBLIC_AUTH_DOMAIN_PROD_27`
- `NEXT_PUBLIC_PROJECT_ID_PROD_27`
- `NEXT_PUBLIC_STORAGE_BUCKET_PROD_27`
- `NEXT_PUBLIC_MESSAGING_SENDER_ID_PROD_27`
- `NEXT_PUBLIC_APP_ID_PROD_27`
- `FIREBASE_SERVICE_ACCOUNT_PROD_27`

**Dev (rur-web-dev):**
- `NEXT_PUBLIC_API_KEY_DEV`
- `NEXT_PUBLIC_AUTH_DOMAIN_DEV`
- `NEXT_PUBLIC_PROJECT_ID_DEV`
- `NEXT_PUBLIC_STORAGE_BUCKET_DEV`
- `NEXT_PUBLIC_MESSAGING_SENDER_ID_DEV`
- `NEXT_PUBLIC_APP_ID_DEV`
- `FIREBASE_SERVICE_ACCOUNT_DEV`

**FTP Deployment (main branch only):**
- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`

**Firebase Functions:**
- `FIREBASE_TOKEN`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Service functions usage
### Managing timeline events

```ts
// adding timeline event
addTimeLineEvent(event).then(docRef => {
          // success
       }).catch(error => {
          // error
       });
```

```ts
// limit & docAfter is optional
// default limit is 10
// if docAfter is set, return Time line events starting from docAfter document.
// order by events order property
getTimeLineEvents(limit,docAfter).then(data => {
          // success
       }).catch(error => {
          // error
       });
```

```ts
// deleting an event
deleteTimeLineEvent("TimelineEventDocumentId").then(res => {
          // success
       }).catch(error => {
          // error
       });
```

### Managing sponsors

```ts
// sponsorshipCategory valied values => "Gold","Silver","Bronze","All"
getSponsers(sponsorshipCategory).then(data => {
          // success
       }).catch(error => {
          // error
       });
```

```ts
     const sponsor = {
       level: "sponsorshipCategory",
       sponsor: "Company Name"
     } as ISponser;
     addSponser(sponsor).then(res => {
          // success
       }).catch(error => {
          // error
       });
```

```ts
deleteSponser("x2xFMFgzeOQgqKese7fG").then(res => {
          // success
       }).catch(error => {
          // error
       });
```

### Managing files

```tsx
// example for uploading a file to firebase storage on file change in file input.
// import getDownloadURL from firebase/storage
<label htmlFor="test">File</label>
<input id="test" name="test" type="file" onChange={(e)=>{
            let reference;
            if(e.target.files){
              reference = addFile(e.target.files[0]).then((ref)=>{
              return ref;
              });
              if(reference != null){
                 reference.then((ref)=>{
                  if(ref){
                     getDownloadURL(ref).then((url)=>{
                    });
                  }
                })
                .catch((error)=>{
                  console.log("Error",error);
                });
              }
            }
          }} />
```

```ts
    // delete firebase storage file from StorageReference 
    const ref1 = ref(getStorage(),'images/test.png');
    deleteFile(ref1).then((res)=>{
      // file deleted
    }).catch((error)=>{
      // error
    });
```
