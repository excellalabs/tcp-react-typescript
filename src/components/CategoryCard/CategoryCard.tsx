import { CardActionArea, CardMedia } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import React from "react";
import { useStyles } from "./CategoryCard.styles";

type CategoryCardProps = {
  backgroundImagePath?: string;
  category: string;
  handleClick?: () => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  backgroundImagePath,
  category,
  handleClick,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea className={classes.cardContent}>
        <CardMedia
          className={classes.media}
          image={backgroundImagePath}
          title={`${category} Image`}
        >
          <div className={classes.text}>{category}</div>
        </CardMedia>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
