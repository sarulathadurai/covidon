import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme)=>({
  root: {
  width: 500,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Chela One,cursive',
    color:'blue'
  },
  pos: {
    marginBottom: 12,
  },
  blue:{
      backgroundColor:'Blue'
  }
}));

const ResourceDetails = ({res,district}) => {
  const classes = useStyles();
  const showResource = (el) => {
    return(
      <Card className={classes.root} variant="outlined" key={el.id}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        <Avatar className={classes.blue}>CO</Avatar>
          Charity Organisation 
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
            {el.resType}
        </Typography>
        <Typography variant="body2" component="p">
            {el.description}
        </Typography>
        <Typography>
            stock:123
        </Typography>
        <Typography>
            Contact No:9790434323
        </Typography>
        <Typography>
            Email:abx@gmail.com
        </Typography>
      </CardContent>
    </Card> 
  
    )
  }
    return(
      district ? 
      res.filter((el)=>
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