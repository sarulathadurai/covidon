import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import { deleteNeedPost,updateNeedPost } from '../../../store/actions/myPostAction';
import UpdateNeedForm from './UpdateNeedForm';

const PostNeedOperation = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [updateOpen, setUpdateOpen] = React.useState(false);

    const toggleDelDialog = () => {
        setOpen(prev => !prev);
    };

    const toggleUpdateDialog = () => {
        setUpdateOpen(prev => !prev)
    }

    const deletePost = () => {
        props.delete_post(props.el.id);
    }

    const updatePost = (id,res) => {
        props.update_post(id,res)
        toggleUpdateDialog();
    }

    return (
        <>
            <MoreHorizIcon aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => { setAnchorEl(e.currentTarget) }} />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => { setAnchorEl(null) }}
            >
                <MenuItem onClick={toggleUpdateDialog}> 
                  <EditIcon className={props.icon}/> Update
                </MenuItem>
                <MenuItem onClick={toggleDelDialog}>
                     <DeleteIcon className={props.icon}/> Delete
                </MenuItem>
                <UpdateNeedForm updateOpen={updateOpen} updatePost={updatePost} toggleUpdateDialog={toggleUpdateDialog} need={props.el} />
                <Dialog
                        open={open}
                        onClose={toggleDelDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Delete Post"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete the post ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={toggleDelDialog} color="primary" >
                                Disagree
                            </Button>
                            <Button onClick={deletePost} color="primary" autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
               
            </Menu>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        delete_post:(id) => dispatch(deleteNeedPost(id)),
        update_post:(id,value) => dispatch(updateNeedPost(id,value))
    }
}

export default connect(null,mapDispatchToProps)(PostNeedOperation);