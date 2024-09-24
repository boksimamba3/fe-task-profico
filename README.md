# MyNews App (React + TypeScript + Vite)

### Design Decisions

- Routing: Since it wasn't specified to use some framework like Next.js or Remix I decided to try using the React Router v6.4. I saw there were some updates and this was a perfect chance to explore it.

- Infinite Scroll: I made custom hook that uses intersection observer under the hood. This implementation is fine for basic use cases but it would run to problems if we had to render large list's of dom elements. We would need some kind of virtualization so I would probably use **react-window-infinite-loader** package.

- Bookmarking: Since I didn't saw anything unique in response that we get from NewsApi I decided to hash article title and use that as **id** when saving to local storage. Hashing function isn't perfect and there is probability of collisions. There is custom hook to simplify saving and retrieval of bookmarks.

- Api call: I created a simple provider that is wrapper around api calls to NewsApi.It may happen that during the testing that we run out of the request cause limit is 100 request per day per api key. I hardcoded the api key because this is the client application and anyhow (even if I used env variables) it would end up in bundle. In real scenario the api key would live on server. For example if we were using the Next.js.
