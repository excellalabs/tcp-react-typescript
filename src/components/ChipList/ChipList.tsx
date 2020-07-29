import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import { IEmployeeSkill } from '../../models/Skill.interface';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'left',
      flexWrap: 'wrap',
      listStyle: 'none',
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    primarySkill: {
        border: 'solid',
        borderColor: 'black',
        borderWidth: '2px',
    }
  }),
);

export const ChipList: React.FC<{skills: IEmployeeSkill[]}> = ({skills}) => {
  const classes = useStyles();

  return (
    <ul className={classes.root}>
      {skills.map((s) => {
        return (
          <li key={s.skill.name}>
            <Chip
              label={s.skill.name}
              className={s.primary ? classes.primarySkill : ''}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ChipList;
