import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { ICategory } from "../../../models/Skill.interface";

export type CategoryFormProps = {
  categoryToEdit?: ICategory | undefined;
  submitCategory: (category: ICategory) => void;
};

const CategoryForm: React.FC<CategoryFormProps> = ({
  categoryToEdit,
  submitCategory,
}) => {
  // Store the category being worked on
  const [category, setCategory] = useState<ICategory>({
    name: "",
  } as ICategory);

  // When a new category to edit is passed in, let's set the form accordingly
  useEffect(() => {
    setCategory(categoryToEdit ?? ({ id: 0, name: "" } as ICategory));
  }, [categoryToEdit]);

  // Store changes as the user edits the name
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, name: event.target.value } as ICategory); // preserve ID if it's there
  };

  // Render the form
  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Add/Edit Category
          </Typography>
          <TextField
            id="category-name"
            type="text"
            label="Category"
            value={category?.name}
            onChange={handleChange}
          ></TextField>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => submitCategory(category)}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CategoryForm;
