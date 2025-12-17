# MARVAPP BACKEND

MARCC-APP BACKEND was updated... ¡Now is MARVAPP-BCK!

Its alive! but now, Clean Architecture with Typescript was used 💪🤓😎

This is my backend to manage my own projects that I will show in my personal web site.

## Requirements

- Node v22.19.0

## Installation

- Run `pnpm install` in the terminal

## Configuration

You must create a `.env` file in the root of the project and add the parameters specified in the `.example.env` file to it.

```
POSTGRES_URL=
PORT=
SECRETORPRIVATEKEY=
CLOUDINARY_URL=
```

- POSTGRES_URL, is the connection string to the Postgres relational database
- Port, is the slot number available on your computer to raise the backend(3000, 5000, 4200, 8000, etc)
- SecretOrPrivateKey, it is my application's own key, necessary to use the JWT auth.
- Cloudinary_url, is the "API Environment variable" from Cloudinary used to upload photos.

## Run app locally

There are two ways, run in the terminal:

- `pnpm run dev`
- `npm start`

If you are in development mode, I recommend using the first option, so that when you make any changes, the local server automatically restarts.
