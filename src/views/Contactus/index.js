// material-ui
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Banner from '../../assets/images/patient/banner.png';
import Avatar from '@mui/material/Avatar';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
// import Stack from '@mui/material/Stack';
import LinkIcon from '@mui/icons-material/Link';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CallIcon from '@mui/icons-material/Call';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import config from '../../config';

// project imports
import MainCard from 'ui-component/cards/MainCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: "1px",
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// ==============================|| SAMPLE PAGE ||============================== //

const Contactus = () => {

  return (
    <MainCard title="Contact Us">
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ width: 30, height: 30, cursor: 'auto', backgroundColor: '#90caf903' }}><PlaceIcon sx={{ width: 28, height: 28, color: config.color.prime }} /></Avatar>
          }
          title="PB. No. 6327, Nethaji Road, Pappanaickenpalayam"
          subheader="Coimbatore 641037, Tamilnadu"
        />
        <CardMedia
          component="img"
          image={Banner}
          alt="GKNM"
          sx={{ width: "100%" }}
        />
        <CardContent>
          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sm={4} md={4}>
              <Item>
                <Stack alignItems="center" direction="row" gap={2}>
                  <Avatar sx={{ width: 30, height: 30, cursor: 'auto', backgroundColor: '#90caf903' }}><EmailIcon sx={{ width: 25, height: 25, color: config.color.prime }} /></Avatar>
                  <Typography variant="h4" color="text.primary">
                    gknmh@gkmhospital.org
                  </Typography>
                </Stack>
              </Item>
              <Item>
                <Stack alignItems="center" direction="row" gap={2}>
                  <Avatar sx={{ width: 30, height: 30, cursor: 'auto', backgroundColor: '#90caf903' }}><LinkIcon sx={{ width: 25, height: 25, color: config.color.prime }} /></Avatar>
                  <Link href="https://www.gknmhospital.org">
                    https://www.gknmhospital.org
                  </Link>
                </Stack>
              </Item>
            </Grid>
          </Grid>
          <Divider sx={{ p: 1 }} />
          <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 5, sm: 8, md: 12 }} sx={{ pt: 2 }}>
            <Grid item xs={6} sm={12} md={8}>
              <Item>
                <Stack alignItems="center" direction="row" gap={2}>
                  <Avatar sx={{ width: 30, height: 30, cursor: 'auto', backgroundColor: '#90caf903' }}><CallIcon sx={{ width: 25, height: 25, color: config.color.prime }} /></Avatar>
                  <Typography variant="h3" color="text.primary">Main Hospital: <Link href="tel:04224305212" underline="none">0422 4305212</Link> / <Link href="tel:04222243501" underline="none">0422 2243501-7</Link></Typography>
                </Stack>
              </Item>
              <Item>
                <Stack alignItems="center" direction="row" gap={2}>
                  <Avatar sx={{ width: 30, height: 30, cursor: 'auto', backgroundColor: '#90caf903' }}><CallIcon sx={{ width: 25, height: 25, color: config.color.prime }} /></Avatar>
                  <Typography variant="h3" color="text.primary">GKNM OPC: <Link href="tel:04224309430" underline="none">0422 4309430</Link></Typography>
                </Stack>
              </Item>
              <Item>
                <Stack alignItems="center" direction="row" gap={2}>
                  <Avatar sx={{ width: 30, height: 30, cursor: 'auto', backgroundColor: '#90caf903' }}><CallIcon sx={{ width: 25, height: 25, color: config.color.prime }} /></Avatar>
                  <Typography variant="h3" color="text.primary">OP Appointments: <Link href="tel:04224305300" underline="none">0422 4305300</Link> / <Link href="tel:04224309300" underline="none">0422 4309300</Link> / <Link href="tel:04222245000" underline="none">0422 2245000</Link></Typography>
                </Stack>
              </Item>

              <Item>
                <Stack alignItems="center" direction="row" gap={2}>
                  <Avatar sx={{ width: 30, height: 30, cursor: 'auto', backgroundColor: '#90caf903' }}><CallIcon sx={{ width: 25, height: 25, color: config.color.prime }} /></Avatar>
                  <Typography variant="h3" color="text.primary">Pharmacy Home Delivery: <Link href="tel:8870119555" underline="none">8870119555</Link></Typography>
                </Stack>
              </Item>

              <Item>
                <Stack alignItems="center" direction="row" gap={2}>
                  <Avatar sx={{ width: 30, height: 30, cursor: 'auto', backgroundColor: '#90caf903' }}><CallIcon sx={{ width: 25, height: 25, color: config.color.prime }} /></Avatar>
                  <Typography variant="h3" color="text.primary">Emergency: <Link href="tel:8754706677" underline="none">8754706677</Link></Typography>
                </Stack>
              </Item>

              <Item>
                <Stack alignItems="center" direction="row" gap={2}>
                  <Avatar sx={{ width: 30, height: 30, cursor: 'auto', backgroundColor: '#90caf903' }}><CallIcon sx={{ width: 25, height: 25, color: config.color.prime }} /></Avatar>
                  <Typography variant="h3" color="text.primary">Home Care Service: <Link href="tel:04224305364" underline="none">0422 4305364</Link> / <Link href="tel:9789600253" underline="none">9789600253</Link></Typography>
                </Stack>
              </Item>

              <Item>
                <Stack alignItems="center" direction="row" gap={2}>
                  <Avatar sx={{ width: 30, height: 30, cursor: 'auto', backgroundColor: '#90caf903' }}><CallIcon sx={{ width: 25, height: 25, color: config.color.prime }} /></Avatar>
                  <Typography variant="h3" color="text.primary">Raksha: <Link href="tel:04224351297" underline="none">0422 4351297</Link> / <Link href="tel:9791697416" underline="none">9791697416</Link></Typography>
                </Stack>
              </Item>

              <Item>
                <Stack alignItems="center" direction="row" gap={2}>
                  <Avatar sx={{ width: 30, height: 30, cursor: 'auto', backgroundColor: '#90caf903' }}><CallIcon sx={{ width: 25, height: 25, color: config.color.prime }} /></Avatar>
                  <Typography variant="h3" color="text.primary">Master Health Unit: <Link href="tel:0422-4309400" underline="none">0422-4309400</Link></Typography>
                </Stack>
              </Item>

              <Item>
                <Stack alignItems="center" direction="row" gap={3} sx={{pt:2}}>
                  {/* <Typography variant="h3" color={config.color.prime}>Social Linkes:</Typography> */}
                  <IconButton aria-label="facebook.com" onClick={() => window.open(config.social.facebook)}>
                    <FacebookIcon sx={{ width: 35, height: 35 }} />
                  </IconButton>
                  <IconButton aria-label="Instagram" onClick={() => window.open(config.social.instagram)}>
                    <InstagramIcon sx={{ width: 35, height: 35 }} />
                  </IconButton>
                  <IconButton aria-label="Youtube" onClick={() => window.open(config.social.linkedin)}>
                    <LinkedInIcon sx={{ width: 35, height: 35 }} />
                  </IconButton>
                  <IconButton aria-label="Youtube" onClick={() => window.open(config.social.youtube)}>
                    <YouTubeIcon sx={{ width: 35, height: 35 }} />
                  </IconButton>
                </Stack>
              </Item>

            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </MainCard>
  );

}

export default Contactus;
