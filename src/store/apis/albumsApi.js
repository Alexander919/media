import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const albumsApi = createApi({ //slice is created automatically
    reducerPath: "albums",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005"
    }),
    endpoints(builder) {
        return {
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{ type: "Album", id: user.id }];
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
                    return [{ type: "Album", id: user.id }];
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

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi; //created from the name(fetchAlbums, addAlbum)
export { albumsApi };