import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  Chip,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  OutlinedInput,
} from '@mui/material';
import { useState } from 'react';
import ExperienceSection from './experienceSection.jsx';



const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const availableSkills = [
  'React.js',
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'Node.js',
  'UI/UX Design',
  'Figma',
  'SQL'
];

export default function AddressForm({profileData, setProfileData}) {

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [rating, setRating] = useState('');
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const handleAddSkill = () => {

    if (!selectedSkill || !rating) {
      return;
    }

    // Prevent adding the same skill twice
    const alreadyAdded = skills.some(
      skill => skill.skill_name === selectedSkill
    );

    if (alreadyAdded) {
      alert('You have already added this skill');
      return;
    }
     const newSkill = {
      skill_name: selectedSkill,
      self_rating: Number(rating)
    };

    setSkills(prev => [...prev, newSkill]);

    // Reset dropdowns
    setSelectedSkill(null);
    setRating('');
  };

    const handleDeleteSkill = (skillName) => {
    setSkills(prev =>
      prev.filter(skill => skill.skill_name !== skillName)
    );
  };

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
  <FormLabel>Add your skills</FormLabel>

  <FormControl fullWidth size="small">
    <Select
      displayEmpty
      value={selectedSkill || ''}
      onChange={(e) => setSelectedSkill(e.target.value)}
      renderValue={(value) =>
        value || <span style={{ opacity: 0.6 }}>Choose a skill</span>
      }
    >
      {availableSkills.map((skill) => (
        <MenuItem key={skill} value={skill}>
          {skill}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</FormGrid>

<FormGrid size={{ xs: 12 }}>
  <FormLabel>Proficiency Rating</FormLabel>

  <FormControl fullWidth size="small">
    <Select
      displayEmpty
      value={rating}
      onChange={(e) => setRating(e.target.value)}
      renderValue={(value) =>
        value
          ? `${value} - ${['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'][value - 1]}`
          : <span style={{ opacity: 0.6 }}>Choose your rating</span>
      }
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: 'background.paper',
            color: 'text.primary',
          },
        },
      }}
    >
      <MenuItem value={1}>1 - Beginner</MenuItem>
      <MenuItem value={2}>2 - Basic</MenuItem>
      <MenuItem value={3}>3 - Intermediate</MenuItem>
      <MenuItem value={4}>4 - Advanced</MenuItem>
      <MenuItem value={5}>5 - Expert</MenuItem>
    </Select>
  </FormControl>
</FormGrid>

<FormGrid size={{ xs: 12 }}>
  <Button
    variant="contained"
    size="large"
    fullWidth
    onClick={handleAddSkill}
    disabled={!selectedSkill || !rating}
    sx={{
      '&.Mui-disabled': (theme) => ({
        backgroundColor:
          theme.palette.mode === 'dark' ? '#343943' : '#e5e7eb',
        color:
          theme.palette.mode === 'dark' ? '#c5cad3' : '#555555',
      }),
    }}
  >
    + Add Skill
  </Button>
</FormGrid>

<FormGrid size={{ xs: 12 }}>
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
    {skills.map((skill) => (
      <Chip
        key={skill.skill_name}
        label={`${skill.skill_name} - ${skill.self_rating}/5`}
        onDelete={() => handleDeleteSkill(skill.skill_name)}
        variant="outlined"
      />
    ))}
  </Box>
</FormGrid>

<ExperienceSection
  experiences={experiences}
  setExperiences={setExperiences}
/>

     <FormGrid size={{ xs: 12 }}>
  <FormControlLabel
    control={<Checkbox name="saveAddress" value="yes" />}
    label="Use the college name and address for networking"
    sx={{ color: 'text.primary' }}
  />
</FormGrid>
    </Grid>
  );
}