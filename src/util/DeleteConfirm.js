import React, { Component, Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import MyButton from "./MyButton";
import DeleteIcon from "@material-ui/icons/Delete";

 class DeleteConfim extends Component {

state ={
    open: false,
    action:null
}
handleClose = () => {
  this.setState({
    open: false
  });
};
handleOpen = () => {
  this.setState({
    open: true
  });
};

  render() {
      const {contentName,handleSubmit} = this.props;
    const onSubmit =()=>{
       handleSubmit();
       this.handleClose();
     }
    return (
      <Fragment>
        <MyButton tip="delete comment" onClick={this.handleOpen}>
      <DeleteIcon color="primary" />
    </MyButton>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Are you sure you want to delete this {contentName}
        </DialogTitle>

        <DialogActions>
            <Button color="primary" onClick={this.handleClose}>Cancel</Button>
            <Button color="primary" onClick={onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog></Fragment>
      
    );
  }
}

export default DeleteConfim