"use client";

import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const usePost = (postId: string) => {
  const baseURL = process.env.URL;

  const url = postId ? `/api/posts/${postId}` : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
