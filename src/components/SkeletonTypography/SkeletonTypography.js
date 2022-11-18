
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const variants = ['h1'];

function TypographyDemo(props) {
    const { loading = false } = props;

    return (
        <div>
            {variants.map((variant) => (
                <Typography component="div" key={variant} variant={variant}>
                    {loading ? <Skeleton /> : variant}
                </Typography>
            ))}
        </div>
    );
}

TypographyDemo.propTypes = {
    loading: PropTypes.bool,
};

export default function SkeletonTypography() {
    return (
        <Grid sx={{ display: 'flax', justifyContent: 'center', alignItems: 'center', maxWidth: 640 }} container >
            <Grid item sx={{ width: '95%', height: '80px', maxWidth: 640 }}>
                <TypographyDemo loading />
            </Grid>
        </Grid>
    );
}