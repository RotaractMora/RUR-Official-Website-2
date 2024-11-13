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
