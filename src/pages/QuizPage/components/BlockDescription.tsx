import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const BlockDescription = () => {
  return (
    <Box sx={{ maxWidth: 500 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pellentesque porta
            facilisis. Quisque ut arcu eros. Maecenas quam urna, sagittis eget facilisis ac,
            vehicula nec ante. Cras interdum fermentum sem ac porttitor. Nulla gravida purus id
            risus tempor gravida. Vivamus malesuada id quam sit amet convallis. Nam et eros maximus,
            ultricies ex vehicula, ullamcorper sem. Donec non suscipit dolor.
            <br />
            <br />
            Duis lorem dolor, fermentum eu augue a, dictum dapibus ante. Sed eget fringilla lectus.
            Ut vel nisi at erat tincidunt viverra. Vestibulum eleifend ac turpis quis malesuada.
            Aenean semper convallis purus ac porttitor. Nullam metus nunc, condimentum vitae
            elementum ultricies, maximus sit amet sem. Suspendisse sollicitudin tincidunt velit, eu
            cursus nibh pretium non. Duis id nisi iaculis, vehicula diam nec, elementum orci. Cras
            maximus dolor ut placerat interdum.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
