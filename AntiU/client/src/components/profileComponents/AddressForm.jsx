import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          Full name
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first-name"
          type="text"
          placeholder="Riddhika P"
          autoComplete="given-name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="last-name" required>
          Age
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name="last-name"
          type="text"
          placeholder="19"
          autoComplete="family-name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address1" required>
          Hero line for you
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="text"
          placeholder="My ability to learn holistically is my biggest unfair advantage!"
          autoComplete="shipping address-line1"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address2" required>Current address</FormLabel>
        <OutlinedInput
          id="address2"
          name="address2"
          type="text"
          placeholder="BH-2, JU hostel, sitapura, jaipur"
          autoComplete="shipping address-line2"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="city" required>
          College/ University
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="text"
          placeholder="JECRC University"
          autoComplete="address-level2"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="state" required>
          Course
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="text"
          placeholder="B.tech."
          autoComplete="address-level1"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="zip" required>
          Branch
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="text"
          placeholder="CSE"
          autoComplete="shipping postal-code"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="country" required>
          Curent graduation yer
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="text"
          placeholder="2"
          autoComplete="shipping country-name"
          required
          size="small"
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