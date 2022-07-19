import React, { useState, useEffect } from "react";
import {
  Box, Card, CardContent, Typography, TextField, Grid, Button, List, ListItem, ListItemText
  , IconButton
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/fetchData";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
function Todo() {
  const [todos, setTodos] = useState('')
  const [open, setOpen] = React.useState(false);
  const { item } = useSelector(state => state.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    // Update the document title using the browser API
    dispatch(fetchProducts());
  }, [item]);
  const handleSubmit = () => {
    let data = {
      todos: todos
    }
    var config = {
      method: 'post',
      url: 'http://localhost:4000/create',
      headers: {},
      data: data
    };
    axios(config).then((r) => {

      if (r.data == 'todos created successuly') {
        setOpen(true);        
      }
    }).catch((e) => {
      console.log('error', e)
    })

  };
  const handeDelete = (id) => {
    let data = {
      id: id
    }
    var config = {
      method: 'post',
      url: 'http://localhost:4000/delete',
      headers: {},
      data: data
    };
    axios(config).then((r) => {

    }).catch((e) => {
      console.log('error', e)
    })
  }
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>     
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center', backgroundColor: '#add8e694' }}>
      <div>        
        <Snackbar
          open={open}          
          autoHideDuration={6000}
          onClose={handleClose}
          message="Todo added"
          action={action}
          anchorOrigin={{horizontal: 'center',
          vertical: 'bottom'}        
        
        }
      />
      </div>
      <Card >
        <CardContent sx={{ padding: 2 }}>
          <Typography align='left' sx={{ fontWeight: 'bold', fontSize: 20 }}>
            My Todos
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <TextField
                size='small'
                placeholder='Enter Todos'
                onChange={(e) => {
                  setTodos(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={3} >
              <Button variant='contained'
                onClick={handleSubmit}
              > ADD</Button>
            </Grid>
          </Grid>

          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {item.map((task) => {

              return (
                <ListItem
                  key={task._id}
                  secondaryAction={
                    <>
                      {/* <IconButton edge="end" aria-label="comments"

                      >
                        <BorderColorOutlinedIcon />
                      </IconButton> */}
                      <IconButton edge="end" aria-label="comments"
                        onClick={(e) => {

                          handeDelete(task._id)
                        }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </>

                  }
                  disablePadding
                >
                  {/* <ListItemButton role={undefined} onClick={handleToggle(value)} dense> */}

                  <ListItemText id={task._id} className='capitalize-me' primary={task.todos} />
                  {/* </ListItemButton> */}
                </ListItem>
              );
            })}
          </List>

        </CardContent>

      </Card>
    </Box>
  )
}

export default Todo