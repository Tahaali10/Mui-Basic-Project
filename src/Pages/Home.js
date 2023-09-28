import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { red } from '@mui/material/colors';
import { Button, RadioGroup, Radio, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const Home = () => {
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('male');
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError(false);
    setDetailsError(false);

    if (email === '') {
      setEmailError(true);
    }
    if (details === '') {
      setDetailsError(true);
    }
    if (email && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, details, category }),
      })
        .then(() => navigate('/'))
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <Container>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            margin: 1,
            padding: 1,
          }}
          label="Email"
          variant="filled"
          color="secondary"
          required
          fullWidth
          error={emailError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          sx={{
            margin: 1,
            padding: 1,
          }}
          label="NOTE"
          variant="filled"
          color="secondary"
          required
          rows={4}
          fullWidth
          error={detailsError}
        />

        <FormControl sx={{
          margin: 1,
          padding: 1,
        }}>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <Container>
          <Button
            sx={{
              fontSize: 12,
              backgroundColor: red[500],
              '&:hover': {
                backgroundColor: 'gray',
              },
            }}
            variant="contained"
            color="secondary"
            type="submit"
            disableElevation
            startIcon={<SendIcon />}
          >
            Submit it!
          </Button>
        </Container>
      </form>
    </Container>
  );
};

export default Home;
