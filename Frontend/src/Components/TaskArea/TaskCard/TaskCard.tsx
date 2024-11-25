import css from "./TaskCard.module.css";
import { TaskModel } from "../../../Models/TaskModel";
import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';

type TaskCardProps = {
  task: TaskModel;
}

export function TaskCard(props: TaskCardProps): JSX.Element {

  const formatedDate = format(new Date(props.task.created), 'MM/dd/yyyy');

    return (
      <div className={css.Container}>
      <Card variant="outlined" sx={{ width: 360, backgroundColor: 'transparent', m: 1, borderColor: "black", boxShadow: 5}}>
      <Box sx={{ p: 2}}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography gutterBottom variant="h6" component="div">
            {props.task.title}
          </Typography>
          <Box sx={{ mx: 2 }} />
          <Typography gutterBottom variant="h6" component="div">
            {formatedDate}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {props.task.description}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="body2">
          Select action:
        </Typography>
        <Stack direction="row" spacing={2} className={css.Button}>
        <Button variant="text" sx={{ color: "red" }}>Delete</Button>
        <Button variant="text">Edit</Button>
        </Stack>
      </Box>
    </Card>
      </div>

    )
}
