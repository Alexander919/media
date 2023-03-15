import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

const albumsApi = createApi({ //slice is created automatically
    reducerPath: "albums",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005",
        //for dev only
        fetchFn: async (...args) => { //overwriting fetch function(redux-toolkit-query uses fetch under the hood)
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints(builder) {
        return {
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    // return [{ type: "Album", id: album.userId }]; // works, easy solution if we have userId available
                    return [{ type: "Album", id: album.id }];
                },
                query: (album) => {
                    return {
                        method: "DELETE",
                        url: `/albums/${album.id}`
                    }
                }
            }),
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{ type: "UsersAlbums", id: user.id }];
                },
                query: (user) => {
                    return {
                        url: "/albums",
                        method: "POST",
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        }
                    }
                }
            }),
            fetchAlbums: builder.query({
                providesTags: (result, error, user) => { //user is shown in docs as 'arg'
                    // return [{ type: "Album", id: user.id }];
                    const tags = result.map(album => {
                        return { type: "Album", id: album.id };
                    });
                    tags.push({ type: "UsersAlbums", id: user.id });

                    return tags;
                },
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

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi; //automatically created from the name(fetchAlbums, addAlbum)
export { albumsApi };