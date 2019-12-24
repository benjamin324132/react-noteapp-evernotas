import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import { Divider, Button } from "@material-ui/core";
import SidebarItemComponent from "../sidebaritem/sidebarItem";

class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      addingNote: false,
      title: null
    };
  }

  render() {
    const { notes, classes, selectedNoteIndex } = this.props;

    if (notes) {
      const filteredData = notes.filter(item => {
        return (
          item.title
            .toLocaleLowerCase()
            .includes(this.state.searchTerm.toLocaleLowerCase()) ||
          item.body
            .toLocaleLowerCase()
            .includes(this.state.searchTerm.toLocaleLowerCase())
        );
      });
      return (
        <div className={classes.sidebarContainer}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={this.state.searchTerm}
              onChange={e => this.setState({ searchTerm: e.target.value })}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
            {this.state.addingNote ? "Cancel" : "New Note"}
          </Button>
          {this.state.addingNote ? (
            <div>
              <input
                type="text"
                className={classes.newNoteInput}
                placeholder="Enter note title"
                onKeyUp={e => this.updateTitle(e.target.value)}
              />
              <Button
                className={classes.newNoteSubmitBtn}
                onClick={this.newNote}
              >
                Submit Note
              </Button>
            </div>
          ) : null}
          <List>
            {filteredData.map((_note, _index) => {
              return (
                <Paper key={_index} className={classes.card}>
                  <SidebarItemComponent
                    _note={_note}
                    _index={_index}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={this.selectNote}
                    deleteNote={this.deleteNote}
                  />
                  <Divider />
                </Paper>
              );
            })}
          </List>
        </div>
      );
    } else {
      return <div />;
    }
  }
  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  };
  updateTitle = txt => {
    this.setState({ title: txt });
  };
  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({ title: null, addingNote: false });
  };
  selectNote = (n, i) => this.props.selectNote(n, i);
  deleteNote = note => this.props.deleteNote(note);
}
export default withStyles(styles)(SidebarComponent);
