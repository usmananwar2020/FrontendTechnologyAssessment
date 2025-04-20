import React from "react";
import { Grid, Box, Skeleton, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import TuneIcon from '@mui/icons-material/Tune';
import { ArticlesResponse } from "../../utils/types/articlesType";
import { ArticleDetailNullable } from "../../utils/types/articleDetailTypes";
interface ArticlesProps {
  articles: ArticlesResponse;
  loading: boolean;
  filter: number;
  setFilter: React.Dispatch<React.SetStateAction<number>>
  setArticleDetail: (value: ArticleDetailNullable) => void;
}
const   Articles = ({articles,loading, filter, setFilter, setArticleDetail}: ArticlesProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (value: number) => {
      setFilter(value)
      setAnchorEl(null);
    };
  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ color: "text.secondary", display: "block", textAlign: "right"}}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {filter === 1 ? "Today" : filter === 7 ? "Week" : "Month"}
        <TuneIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(1)}
      >
          <MenuItem onClick={() => handleClose(1)}>Today</MenuItem>
          <MenuItem onClick={() => handleClose(7)}>Week</MenuItem>
          <MenuItem onClick={() => handleClose(30)}>Month</MenuItem>
        </Menu>
    </div>
      <Grid container wrap="wrap" columnGap="8px">
        {loading && <Box sx={{ width: 280, height:200, marginRight: 0.5, my: 5, backgroundColor: "#fff", borderRadius: "8px", boxShadow: 1 }}>
                      <Skeleton variant="rectangular" width={280} height={200} />
                      <Skeleton />
                      <Skeleton width="60%" />
                    </Box>}
        {articles &&
          articles?.map((item: any, index: number) => (
            <Box 
              key={index} 
              sx={{ width: 280, marginRight: 0.5, my: 5, backgroundColor: "#fff", borderRadius: "8px", boxShadow: 1, cursor: "pointer" }}
              onClick={() => setArticleDetail(item)}
            >
              {item && item.media?.[0]?.["media-metadata"]?.[0].url ? (
                <img
                  style={{ width: 280, height: 200 }}
                  alt={item.title}
                  src={item.media[0]["media-metadata"][2].url}
                />
              ) : (
                <Skeleton variant="rectangular" width={280} height={200} />
              )}
              {item ? (
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontSize: 8, display: "block", textAlign: "right", mb: 1 }}
                  >
                    {`${item.source} • ${item.published_date}`}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    {item.title}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              )}
            </Box>
          ))}
      </Grid>
    </div>
  )
}

export default Articles