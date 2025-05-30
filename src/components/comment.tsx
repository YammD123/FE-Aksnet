import { $, component$, Resource, useResource$, useSignal } from "@builder.io/qwik";
import axios from "axios";
import { BASE_URL } from "~/utils/base-url";
import { Button } from "./Button/Button";
import { LuSend } from "@qwikest/icons/lucide";
import { NestedComment } from "./nested-comment";
import { useAuthLoader } from "~/routes/layout";

export const Comment = component$(({epsId}:{epsId:string}) => {
    const commentDefaultSignal = useSignal<string | undefined>("");
    const commentTrigerSignal = useSignal(0);
    const auth = useAuthLoader();


    const commentResource = useResource$(async ({ track }) => {
        track(() => commentTrigerSignal.value);
        track(() => epsId);
        const res = await axios.get(`${BASE_URL}/comment?episode_id=${epsId}`);
        return res.data.data
    })

    const handleAddComment = $(async () => {
        if (!auth.value) {
            alert("You must login to add a comment")
            return
        }
        const res = await axios.post(`${BASE_URL}/comment`, {
            episode_id: epsId,
            content: commentDefaultSignal.value,
        },{
            withCredentials: true
        });
        if (res.status === 201) {
            commentDefaultSignal.value = "";
            commentTrigerSignal.value++;
        }
    })
    return (
        <div class="flex flex-col p-4 rounded gap-2 border border-gray-900 my-4">
            <div class="flex flex-col gap-2">
                <span class="text-white text-2xl font-semibold">Comments</span>
                {commentDefaultSignal.value && (               
                <Button
                onClick$={handleAddComment} 
                class="right-0 flex items-center justify-end-safe my-2 bg-zinc-950 border border-gray-900/45 px-4 py-2 rounded w-fit">
                    <LuSend font-size={20}  color="white" />
                </Button>
                )}
                <textarea 
                bind:value={commentDefaultSignal}
                placeholder="Add a comment" 
                class="bg-zinc-950 p-3 text-sm border-2 focus:outline-none w-full  h-15 rounded border-gray-950"></textarea>
                <hr class="border-gray-900 mt-4 "/>
            </div>
            <Resource
            value={commentResource}
            onPending={() => <div>Loading...</div>}
            onRejected={(error) => <div>Error: {error.message}</div>}
            onResolved={(comments:any[])=>(
                <div>
                    {comments.length === 0 ?(
                        <div class="text-white">No comments available</div>
                    ):(
                        <NestedComment
                        comments={comments} 
                        epsId={epsId}
                        trigerSignal={commentTrigerSignal} 
                        />
                    )}
                </div>
            )}
            />
        </div>
    );
});