import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NoteCard from '../Components/NoteCard';

export default function About() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(error => {
        console.error('Error fetching notes:', error);
      });
  }, []);

  return (
    <Container>
      <Grid container spacing={3}
        sx={
          {
            margin: 1,
            color: '#fefefe'
          }
        }>
        {notes.map(note => (
          <Grid item xs={12} md={6} lg={4} key={note.id}>
            <NoteCard note={note}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
