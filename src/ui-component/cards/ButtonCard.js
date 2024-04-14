import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography, Grid } from '@mui/material';
import { PrimeBlueButton, PrimeGreenButton } from '../../ui-component/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

// ==============================|| CUSTOM SUB CARD ||============================== //

const ButtonCard = forwardRef(({ children, content, contentClass, darkTitle, secondary, sx = {}, contentSX = {}, title, ...others }, ref) => {
  const theme = useTheme();

  return (
    <Card
      ref={ref}
      sx={{
        border: '1px solid',
        borderColor: theme.palette.primary.light,
        ':hover': {
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
        },
        ...sx
      }}
    >
      {/* card header and action */}
      {!darkTitle && title && <CardHeader sx={{ p: 2.5 }} title={
           <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={8}>
                <Typography variant="h1">{title}</Typography>
            </Grid>
            <Grid item xs={4} sx={{ '& button': { m: 1 } }} >
                <PrimeBlueButton size="large" 
                  variant="outlined" 
                  startIcon={<RefreshIcon />} 
                  sx={{ float: 'right'}}
                  onClick={() => others.btntwoaction()}
                >
                  {others.btn2title}
                </PrimeBlueButton>
                <PrimeGreenButton size="large" 
                  variant="outlined" 
                  startIcon={<GroupAddIcon />} 
                  sx={{ float: 'right'}}
                  onClick={() => others.btnoneaction()}
                >
                  {others.btn1title}
                </PrimeGreenButton>
            </Grid>
            </Grid>
        } action={secondary} />}
      {darkTitle && title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h4">{title}</Typography>} action={secondary} />}

      {/* content & header divider */}
      {title && (
        <Divider
          sx={{
            opacity: 1,
            borderColor: theme.palette.primary.light
          }}
        />
      )}

      {/* card content */}
      {content && (
        <CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass || ''}>
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  );
});

ButtonCard.propTypes = {
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  sx: PropTypes.object,
  contentSX: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

ButtonCard.defaultProps = {
  content: true
};

export default ButtonCard;
