import { $, component$, useSignal } from "@builder.io/qwik";
import axios from "axios";
import { Image } from "qwik-image";
import { useAuthLoader } from "~/routes/layout";
import { BASE_URL } from "~/utils/base-url";

export const NestedComment = component$(
  ({
    comments,
    trigerSignal,
    epsId,
  }: {
    comments: any[];
    trigerSignal: any;
    epsId: string;
  }) => {
    const balasCommentTrigerSignal = useSignal<string | null>(null);
    const balasCommentSignal = useSignal<string | undefined>("");
    const auth = useAuthLoader();

    const handleBalasComment = $(async (parent_id: string) => {
      if (!auth.value) {
        alert("You must login to add a comment");
        return;
      }
      const res = await axios.post(
        `${BASE_URL}/comment/replies`,
        {
          parent_id: parent_id,
          content: balasCommentSignal.value,
          episode_id: epsId,
        },
        { withCredentials: true }
      );
      if (res.status === 201) {
        trigerSignal.value++
      }
    });

    return (
      <div class="flex flex-col gap-5">
        {comments.map((comment) => (
          <div 
          key={comment.id}
          class="flex flex-col gap-2">
            <div class="flex flex-row gap-2">
              <Image
                src={
                  comment.user.profile.avatar_image ||
                  "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                }
                layout="constrained"
                width={50}
                height={50}
                class="rounded-full border-amber-700 border-2 object-cover"
              />
              <div>
                <span class="text-white text-xl font-semibold">
                  {comment.user.profile.name}
                </span>
                <br />
                <span class="text-white/80 text-sm ">
                  {new Date(comment.created_at).toLocaleString()}
                </span>
              </div>
            </div>
            <div class="flex flex-col bg-zinc-900 p-4 m-2 rounded gap-2">
              <p>{comment.content}</p>
            </div>
            <button
              onClick$={() => {
                if (balasCommentTrigerSignal.value === comment.id) {
                  balasCommentTrigerSignal.value = null;
                } else {
                  balasCommentTrigerSignal.value = comment.id;
                }
              }}
              class="self-start italic text-orange-500 opacity-80"
            >
              {balasCommentTrigerSignal.value === comment.id
                ? "Close"
                : "Balas"}
            </button>
            {balasCommentTrigerSignal.value === comment.id && (
              <div class="flex flex-col gap-2">
                <textarea
                  class="bg-zinc-950 p-3 text-sm border-2 focus:outline-none w-full h-15 rounded border-gray-950"
                  placeholder="Balas komentar"
                  bind:value={balasCommentSignal}
                ></textarea>
                {balasCommentSignal.value && (
                  <button
                    onClick$={(e) => handleBalasComment(comment.id)}
                    class="bg-orange-600 mt-2 border border-gray-900/45 self-end px-4 py-2 rounded"
                  >
                    Kirim
                  </button>
                )}
              </div>
            )}

            {comment.replies && comment.replies.length > 0 && (
              <div class="ml-12 mt-4 border-l-2 border-zinc-700 pl-4">
                <NestedComment
                  comments={comment.replies}
                  trigerSignal={trigerSignal}
                  epsId={epsId}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
);
