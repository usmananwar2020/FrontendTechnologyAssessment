import { useEffect, useState } from "react";
import { callApi } from "../utils/callAPI";
import Articles from "../components/articles";
import ArticleDetail from "../components/articleDetail";
import { ArticlesResponse } from "../utils/types/articlesType";
import { ArticleDetailNullable } from "../utils/types/articleDetailTypes";

const Articals = () => {
  const [articles, setarticles] = useState<ArticlesResponse>([]);
  const [filter, setFilter] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [articleDetail, setArticleDetail] = useState<ArticleDetailNullable>(null);
  useEffect(() => {
    const getArtical = async () => {
      setLoading(true);
      const _response = await callApi({
        endpoint: `viewed/${filter}.json`,
        method: "GET",
      });
      setarticles(_response.results);
      setLoading(false);
    };

    getArtical();
  }, [filter]);

  return (
    <>
      {articleDetail?.asset_id ?
      <ArticleDetail
        articleDetail={articleDetail}
        setArticleDetail={setArticleDetail}
      />:
      <Articles
        articles={articles}
        loading={loading}
        filter={filter}
        setFilter={setFilter}
        setArticleDetail={setArticleDetail}
      />
      }
    </>
  );
};

export default Articals;
