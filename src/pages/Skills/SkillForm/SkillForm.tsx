import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import categories from "../../../__mocks__/data/category";

import { ICategory, ISkill } from "../../../models/Skill.interface";

export type SkillFormProps = {
  skillToEdit?: ISkill | undefined; // Input
  submitSkill: (skill: ISkill) => void; // Output
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

const SkillForm: React.FC<SkillFormProps> = ({ skillToEdit, submitSkill }) => {
  // Store the skill being worked on
  const [skill, setSkill] = useState<ISkill>({
    name: "",
    category: { id: 0, name: "" },
  } as ISkill);

  // When a new skill to edit is passed in, let's set the form accordingly
  useEffect(() => {
    console.log(skillToEdit);
    setSkill(skillToEdit ?? ({ id: 0, name: "" } as ISkill));
  }, [skillToEdit]);

  // Store changes as the user edits the name
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkill({ ...skill, name: event.target.value } as ISkill); // preserve ID if it's there
  };

  // Store changes as the user edits the category
  const handleCatChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSkill({ ...skill, category: event.target.value } as ISkill);
  };

  const classes = useStyles();

  // Render the form
  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Add/Edit Skill
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                className={classes.root}
                id="skill-name"
                type="text"
                label="Skill Name"
                value={skill?.name}
                onChange={handleNameChange}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel id="skill-cat-label">Category</InputLabel>
              <Select
                className={classes.root}
                labelId="skill-cat-label"
                id="category"
                value={skill?.category?.id ?? 0}
                onChange={handleCatChange}
              >
                <MenuItem key={0} value={0}></MenuItem>
                {categories.map((c: ICategory) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => submitSkill(skill)}
          >
            {skill?.id ? "Update" : "Add"} Skill
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default SkillForm;
