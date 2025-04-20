import { Box, Skeleton, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { ArticleDetailNullable } from "../../utils/types/articleDetailTypes";
interface ArticleDetailProps {
  articleDetail: ArticleDetailNullable;
  setArticleDetail: (value: ArticleDetailNullable) => void;
}
 const ArticleDetail = ({articleDetail, setArticleDetail}:ArticleDetailProps) => {
  return (
    <div style={{ padding: "1rem" }}>
      <Button variant="contained"  sx={{ display: "block", textAlign: "right"}} onClick={()=> setArticleDetail(null)}>Back</Button>
          <Box>
            <Typography
              variant="caption"
              sx={{width: '80%', color: "text.secondary", display: "block", textAlign: "right", mt: 1 }}
            >
              {`${articleDetail?.source} • ${articleDetail?.published_date}`}
            </Typography>
              {articleDetail && articleDetail.media?.[0]?.["media-metadata"]?.[0].url ? (
                <img
                  style={{ width: '60%', height: 400, margin: "0 auto" }}
                  alt={articleDetail?.title}
                  src={articleDetail?.media[0]["media-metadata"][2].url}
                />
              ) : (
                <Skeleton variant="rectangular"  style={{ width: '60%', height: 400, margin: "0 auto" }} />
              )}
              {articleDetail ? (
                <Box sx={{ p: 2}}>
                    <Typography gutterBottom variant="body2" sx={{ fontWeight: 'bold' }}    >
                      {articleDetail.title}
                    </Typography>
                  <Typography
                    variant="caption"
                    sx={{ display: "block", color: "text.secondary" }}
                  >
                    {articleDetail.abstract}
                  </Typography>
                  {articleDetail && articleDetail.media?.[0]?.caption?
                  <Typography
                    variant="caption"
                    sx={{ display: "block", color: "text.secondary" }}
                  >
                    {articleDetail.media?.[0]?.caption}
                  </Typography> : null}
                </Box>
              ) : (
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              )}
            </Box>
    </div>  
  )
}

export default ArticleDetail