import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import axios from "axios";
import { Post } from "@/src/types";

const PostPage = () => {
  const router = useRouter();
  const { identifier, sub, slug } = router.query;

  const { data: post, error } = useSWR<Post>(
    identifier && slug ? `/posts/${identifier}/${slug}` : null
  );

  return <div>PostPage</div>;
};

export default PostPage;
