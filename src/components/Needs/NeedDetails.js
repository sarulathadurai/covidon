import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box"
const useStyles = makeStyles((theme)=>({
  root: {
  [theme.breakpoints.up('md')]:{
    width: 500,
  },
  margin:'2vh'  
  },
  title: {
    fontSize: 28,
    fontFamily: 'Chela One,cursive',
    color:'#1e235a'
  },
  pos: {
    marginBottom: 12,
    color:'#1e235a'
  },
  blue:{
      backgroundColor:'#1e235a',
      marginRight: '1vw'
  },
  info:{
    color:'grey'
  }
}));

const NeedDetails = ({needs,district,children}) => {
  const classes = useStyles();

  const showNeed = (el) => {
    return(
      <Card className={classes.root} variant="outlined" key={el.id}>
      <CardContent>
        <Box display="flex" flexDirection="row">
        <Avatar className={classes.blue}>{el.initials}</Avatar>
        <Box flexGrow={1}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {el.patientName}
        </Typography>  
        </Box>
        <Box>
        {React.Children.map(children, (child) =>
            React.cloneElement(child, {el})
        )}
        </Box> 
        </Box>
        {el.otherName ? 
        <Typography className={classes.pos} color="textSecondary">
            {el.otherName}
        </Typography>:
        <Typography className={classes.pos} color="textSecondary">
            {el.needType}
        </Typography>}
        <Typography variant="body2" component="p">
            {el.description}
        </Typography>
        <Typography>
            Contact No:{el.phNo}
        </Typography>
        <Typography>
            Email:{el.email}
        </Typography>
      </CardContent>
    </Card> 
  
    )
  }

  if(needs.length === 0 && district){
    return <p className={classes.info}>No results found {`for ${district}`}</p>
  }else if(needs.length === 0){
    return <p className={classes.info}>No results found</p>
  }

  const filteredNeeds = needs.filter((el) =>
  el.district === district
)
    return(
      district ? 
      (filteredNeeds.length === 0 ? <p className={classes.info}>No results found for {district}</p>:
      filteredNeeds.map((el) =>
          showNeed(el)
      )) :
      needs.map((el) =>
        showNeed(el)
      )

    )
  }
export default NeedDetails;