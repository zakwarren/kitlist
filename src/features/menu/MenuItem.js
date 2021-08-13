import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Card, CardHeader } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: `${theme.spacing(2)}px auto`,
    width: "clamp(300px, 30%, 100%)",
    cursor: "pointer",
  },
  title: { textAlign: "center" },
}));

export const MenuItem = (props) => {
  const { title, action } = props;
  const css = useStyles();

  return (
    <Card variant="outlined" className={css.card} onClick={action}>
      <CardHeader
        title={title}
        titleTypographyProps={{ className: css.title }}
      />
    </Card>
  );
};

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
