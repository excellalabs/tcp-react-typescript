import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import React, { ChangeEvent, ReactNode, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: 0,
      minWidth: "100%",
      maxWidth: "100%",
    },
    container: {
      margin: 0,
      width: "100%",
    }
  })
);

export interface FilterOption {
  name: string;
  value: any;
}

export type SearchAndFilterProps = {
  searchBy: string;
  filterBy: string;
  filterOptions: FilterOption[];
  handleSearch: (searchText: string) => void;
  handleFilter: (filterOpts: FilterOption[]) => void;
};

export const SearchAndFilter = (
  props: SearchAndFilterProps & { children?: ReactNode }
): React.ReactElement => {
  const classes = useStyles();

  const {
    searchBy,
    filterBy,
    filterOptions,
    handleSearch,
    handleFilter,
  } = props;

  const [filters, setFilters] = useState<string[]>([]);

  const doSearch = (
    changeEvent: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // DEBOUNCE THIS ??
    handleSearch(changeEvent.target.value);
  };

  const doFilter = (changeEvent: React.ChangeEvent<{ value: unknown }>) => {
    // Extract filters from UI
    const newFilters = changeEvent.target.value as string[];
    // Update state to this renders correctly
    setFilters(newFilters);
    // Broadcast FilterOptions objects to parent
    handleFilter(filterOptions.filter((opt) => newFilters.includes(opt.value)));
  };

  return (
    <form noValidate autoComplete="off">
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <TextField
              label={`Search by ${searchBy}`}
              id="table-search"
              onChange={doSearch}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="table-filter-label">{`Filter by ${filterBy}`}</InputLabel>
            <Select
              labelId="table-filter-label"
              multiple
              id="table-filter"
              onChange={doFilter}
              input={<Input />}
              value={filters}
            >
              {filterOptions.map((option) => (
                <MenuItem key={option.name} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};
