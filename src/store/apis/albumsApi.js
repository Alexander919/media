import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const albumsApi = createApi({ //slice is created automatically
    reducerPath: "albums",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005"
    }),
    endpoints(builder) {
        return {
            fetchAlbums: builder.query({
                query: (user) => {
                    return {
                        url: "/albums",
                        params: {
                            userId: user.id
                        },
                        method: "GET"
                    }
                }
            })
        };
    }
});

export const { useFetchAlbumsQuery } = albumsApi; //created from the name(fetchAlbums)
export { albumsApi };