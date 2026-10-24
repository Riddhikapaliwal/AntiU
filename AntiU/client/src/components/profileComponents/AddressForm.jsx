import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm({profileData, setProfileData}) {

  // const [name, setName]= useState("");
  // const [age, setAge]= useState("");
  // const [college, setCollege]= useState("");
  // const [branch, setBranch]= useState("");
  // const [heroline, setHeroline]= useState("");
  // const [year, setYear]= useState("");
  // const [course, setCourse]= useState("");

  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="name" required>
          Full name
        </FormLabel>
        <OutlinedInput
          id="name"
          name="name"
          type="text"
          placeholder="Riddhika P"
          autoComplete="given-name"
          required
          size="small"
          value={profileData.name}
          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value}))}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="age" required>
          Age
        </FormLabel>
        <OutlinedInput
          id="age"
          name="age"
          type="text"
          placeholder="19"
          autoComplete="age"
          required
          size="small"
          value={profileData.age}
          onChange={(e) => setProfileData(prev => ({ ...prev, age: e.target.value}))}

        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="heroline" required>
          Hero line for you
        </FormLabel>
        <OutlinedInput
          id="heroline"
          name="heroline"
          type="text"
          placeholder="My ability to learn holistically is my biggest unfair advantage!"
          required
          size="small"
          value={profileData.heroline}
          onChange={(e) => setProfileData(prev => ({ ...prev, heroline: e.target.value}))}

        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address" required>Current address</FormLabel>
        <OutlinedInput
          id="address"
          name="address"
          type="text"
          placeholder="BH-2, JU hostel, sitapura, jaipur"
          autoComplete="address-line1"
          required
          size="small"          
          value={profileData.address}
          onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value}))}


        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="college" required>
          College/ University
        </FormLabel>
        <OutlinedInput
          id="college"
          name="college"
          type="text"
          placeholder="JECRC University"
          autoComplete="college"
          required
          size="small"
          value={profileData.college}
          onChange={(e) => setProfileData(prev => ({ ...prev, college: e.target.value}))}

        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="course" required>
          Course
        </FormLabel>
        <OutlinedInput
          id="course"
          name="course"
          type="text"
          placeholder="B.tech."
          autoComplete="course"
          required
          size="small"
          value={profileData.course}
          onChange={(e) => setProfileData(prev => ({ ...prev, course: e.target.value}))}
/>
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="branch" required>
          Branch
        </FormLabel>
        <OutlinedInput
          id="branch"
          name="branch"
          type="text"
          placeholder="CSE"
          autoComplete="branch"
          required
          size="small"
          value={profileData.branch}
          onChange={(e) => setProfileData(prev => ({ ...prev, branch: e.target.value}))}

        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="year" required>
          Curent graduation year
        </FormLabel>
        <OutlinedInput
          id="year"
          name="year"
          type="text"
          placeholder="2"
          autoComplete="studying_year"
          required
          size="small"
          value={profileData.year}
          onChange={(e) => setProfileData(prev => ({ ...prev, year: e.target.value}))}

        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use the college name and address for networking"
        />
      </FormGrid>
    </Grid>
  );
}