import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box"
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: 500,
    },
    margin: '2vh'
  },
  title: {
    fontSize: 28,
    fontFamily:'Mate SC, serif',
    color: '#1e235a'
  },
  pos: {
    marginLeft: 12,
  },
  avatar: {
    backgroundColor: '#1e235a',
    marginRight: '1vw'
  }
}));

const ResourceDetails = ({ res, district, children }) => {
  const classes = useStyles();
  const showResource = (el) => {
    return (
      <Card className={classes.root} variant="outlined" key={el.id}>
        <CardContent>
          <Box display="flex" flexDirection="row">
            <Avatar className={classes.avatar}>{el.initials}</Avatar>
            <Box flexGrow={1}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {el.firstName} {el.lastName}
            </Typography>
            </Box>
            <Box >
            {React.Children.map(children, (child) =>
            React.cloneElement(child, {el})
          )}
            </Box>
          </Box>
          <Box className={classes.pos}>
          <Typography  color="textSecondary">
            {el.resType}
          </Typography>
          <Typography variant="body2" component="p">
            {el.description}
          </Typography>
          {el.stock ?
            <Typography>
              stock:{el.stock}
            </Typography> :
            <Typography>
              Blood Type:{el.bloodType}
            </Typography>
          }
          <Typography>
            Contact No:{el.phNo}
          </Typography>
          <Typography>
            Email:{el.email}
          </Typography>
          </Box>
        </CardContent>
      </Card>

    )
  }
  return (
    district ?
      res.filter((el) =>
        el.district === district
      )
        .map((el) =>
          showResource(el)
        ) :
      res.map((el) =>
        showResource(el)
      )

  )
}
export default ResourceDetails;