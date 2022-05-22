import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export function Tile({
  object,
  links,
}: {
  object: {
    name: string;
    image: string;
    description: string;
    progress?: number;
  };
  links?: { name: string; link: string }[];
}) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 500, minWidth: 300, marginLeft: "30px" }}>
      <CardMedia
        component="img"
        alt={object.name}
        height="140"
        image={object.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {object.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {object.description}
        </Typography>
        {Boolean(object.progress || object.progress === 0) && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress variant="determinate" value={object.progress} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography
                variant="body2"
                color="text.secondary"
              >{`${object.progress}%`}</Typography>
            </Box>
          </Box>
        )}
      </CardContent>
      {links && links.length > 0 && (
        <CardActions>
          {links.map((link, index) => (
            <Button
              key={index}
              size="small"
              onClick={() => navigate(link.link)}
            >
              {link.name}
            </Button>
          ))}
        </CardActions>
      )}
    </Card>
  );
}
