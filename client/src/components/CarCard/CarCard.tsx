import { Typography, Stack, Card, CardActions, CardContent, CardMedia, Button } from "@mui/material"

interface CarCardProps {
    carName: string;
    carPrice: string;
    carType: string;
    carImg: string;
}

export const CarCard: React.FC<CarCardProps> = ({ carName, carPrice, carType, carImg }) => {
    return (
        <div>
             <Card sx={{ maxWidth: 345 , marginTop:"80px"}}>
              <CardMedia
                sx={{ height: 140 }}
                image={carImg}
                title={carName}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {carName}
                </Typography>
                <Stack>
                <Typography variant="body2" color="text.secondary">
                  {carPrice}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {carType}
                </Typography>

                </Stack>
                
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
        </div>
    )
}