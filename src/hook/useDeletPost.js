import { deletePostApi } from "@/service/postServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletpost(){
    const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deletePost} = useMutation({
    mutationFn: deletePostApi,
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["deletePost"],
      });
    },

    onError: (err) => toast.error(err?.response?.data?.message),
  });

  return { isDeleting, deletePost};
}