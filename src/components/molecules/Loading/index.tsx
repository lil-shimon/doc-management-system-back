import React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <React.Fragment>
      <CircularProgress />
    </React.Fragment>
  );
}

export default function Loading() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}
